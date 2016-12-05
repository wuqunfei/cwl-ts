import {CommandLineBinding} from "../../mappings/d2sb/CommandLineBinding";
import {CommandLinePart} from "../helpers/CommandLinePart";
import {CommandLineInjectable} from "../interfaces/CommandLineInjectable";
import {ValidationBase} from "../helpers/validation/ValidationBase";
import {Serializable} from "../interfaces/Serializable";
import {CommandLineBindingModel} from "./CommandLineBindingModel";
import {Validation} from "../helpers/validation/Validation";

export class CommandArgumentModel extends ValidationBase implements Serializable<string | CommandLineBinding>, CommandLineInjectable {
    get arg(): string|CommandLineBinding {
        return this.stringVal || this.binding.serialize();
    }

    set arg(value: string|CommandLineBinding) {
        this.deserialize(value);
    }

    private stringVal: string;
    private binding: CommandLineBindingModel;

    constructor(loc: string, arg?: string | CommandLineBinding) {
        super(loc);
        this.deserialize(arg);
    }

    public getCommandPart(job?: any, value?: any): CommandLinePart {
        if (typeof this.binding === "object") {
            return this.evaluate(job);
        } else if (typeof this.stringVal === 'string') {
            return new CommandLinePart(<string> this.stringVal, 0, "argument");
        }
    }

    private evaluate(job: any): CommandLinePart {
        const itemSeparator = this.binding.itemSeparator;
        const separate = this.binding.separate === false ? '' : ' ';
        const prefix = this.binding.prefix || '';
        const position = this.binding.position || 0;

        const valueFrom = this.binding.valueFrom.evaluate({$job: job}) || '';
        if (this.binding.valueFrom.validation.errors.length) {
            return new CommandLinePart(`<Error at ${this.binding.valueFrom.loc}>`, position, "error");
        }
        if (this.binding.valueFrom.validation.warnings.length) {
            return new CommandLinePart(`<Warning at ${this.binding.valueFrom.loc}>`, position, "warning");
        }

        let calculatedValue;

        if (Array.isArray(valueFrom)) {
            calculatedValue = typeof itemSeparator !== 'undefined'
                ? prefix + separate + valueFrom.join(itemSeparator)
                : prefix + valueFrom.join(' ');
        } else {
            calculatedValue = prefix + separate + valueFrom;
        }

        return new CommandLinePart(calculatedValue, position, "argument");
    }

    public customProps: any = {};

    serialize(): string|CommandLineBinding {
        if (this.stringVal) {
            return this.stringVal;
        } else {
            return this.binding.serialize();
        }
    }

    deserialize(attr: string|CommandLineBinding): void {
        if (typeof attr === "string") {
            this.stringVal = attr;
        } else {
            this.binding = new CommandLineBindingModel(this.loc, attr);
            this.binding.setValidationCallback((err:Validation) => {this.updateValidity(err);})
        }
    }
}