import {Serializable} from "../interfaces/Serializable";
import {ValidationBase} from "../helpers/validation/ValidationBase";
import {UnimplementedMethodException} from "../helpers/UnimplementedMethodException";
import {ExpressionModel} from "./ExpressionModel";
import {Expression as SBDraft2Expression} from "../../mappings/d2sb/Expression";
import {Expression as V1Expression} from "../../mappings/v1.0/Expression";

export abstract class CommandLineBindingModel extends ValidationBase implements Serializable<any>{
    public customProps = {};

    public loadContents: boolean;
    public position: number;
    public prefix: string;
    public itemSeparator: string;
    public separate: boolean;
    public valueFrom: ExpressionModel;

    public hasSecondaryFiles: boolean;

    public secondaryFiles?: ExpressionModel[];

    setValueFrom(val: string | SBDraft2Expression | V1Expression) {
        new UnimplementedMethodException("setValueFrom", "CommandLineBindingModel");
    }

    serialize(): any {
        new UnimplementedMethodException("serialize", "CommandLineBindingModel");
        return null;
    }

    deserialize(attr: any): void {
        new UnimplementedMethodException("deserialize", "CommandLineBindingModel");
    }

}