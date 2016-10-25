import {expect} from "chai";
import {ExpressionModel} from "../d2sb/ExpressionModel";

describe("ExpressionModel d2sb", () => {
    describe("constructor", () => {

        it("Should instantiate create a model with the given properties", () => {
            const expressionModel1 = new ExpressionModel("123");

            expect(expressionModel1.serialize()).to.equal("123");
            expect(expressionModel1.getExpressionScript()).to.equal("123");

            const expressionModel2 = new ExpressionModel({
                    class: "Expression",
                    engine: "cwl-js-engine",
                    script: "1 + 2"
            });

            const expectedExpression = JSON.stringify({
                class: "Expression",
                engine: "cwl-js-engine",
                script: "1 + 2"
            });

            expect(JSON.stringify(expressionModel2.serialize())).to.equal(expectedExpression);
            expect(expressionModel2.getExpressionScript()).to.equal("1 + 2");
        });
    });

    describe("getExpressionScript", () => {

        it("Should return the script value", () => {

            const expressionModel1 = new ExpressionModel({
                    class: "Expression",
                    engine: "cwl-js-engine",
                    script: ""
            });
            expect(expressionModel1.getExpressionScript()).to.equal("");

            const expressionModel2 = new ExpressionModel("");
            expect(expressionModel2.getExpressionScript()).to.equal("");

        });
    });

    describe("setValueToString", () => {

        it("Should set the value to a string", () => {
            const expressionModel = new ExpressionModel("123");

            expressionModel.setValueToString("1111");
            expect(expressionModel.serialize()).to.equal("1111");
        });
    });

    describe("setValueToExpression", () => {

        it("Should set the value to a an expression with the given value", () => {
            const expressionModel = new ExpressionModel("123");

            const expectedExpression = JSON.stringify({
                class: "Expression",
                engine: "cwl-js-engine",
                script: "1111"
            });

            expressionModel.setValueToExpression("1111");
            expect(JSON.stringify(expressionModel.serialize())).to.equal(expectedExpression);
        });
    });
});
