import { shallow } from "enzyme";
import React from "react";
import { spy, stub } from "sinon";
import * as useQuestionAnswer from "../../hooks/useQuestionAnswer";
import * as useValidAnswer from "../../hooks/useValidAnswer";
import { setAnswer } from "../../redux/answersReducer";
import * as store from "../../redux/store";
import { SingleChoiceAnswerType } from "../../types/AnswerTypes";
import { questionTypes } from "../../types/QuestionTypes";
import Checkbox from "../common/Checkbox";
import HintableLabel from "../common/HintableLabel";
import Icon from "../common/Icon";
import { FieldError, Label } from "../styles/Input";
import SingleChoiceQuestion from "./SingleChoiceQuestion";

// ----------------------------------------------------------------------
// Data
// ----------------------------------------------------------------------

const props: React.ComponentProps<typeof SingleChoiceQuestion> = {
    question: {
        id: "id",
        type: questionTypes.single,
        title: "Title",
    },
};

const answerData: SingleChoiceAnswerType = {
    questionId: "id",
    type: questionTypes.single,
    focussed: false,
    value: false,
};

const focusSpy = spy();
const validData: ReturnType<typeof useValidAnswer.default> = {
    error: "error",
    showError: false,
    setFocussed: focusSpy,
};

// ----------------------------------------------------------------------
// Mocking
// ----------------------------------------------------------------------

const dispatchSpy = spy();
stub(store, "useStoreDispatch").returns(dispatchSpy);

const storeSelector = stub(store, "useStoreSelector");
const validStub = stub(useValidAnswer, "default");
const answerStub = stub(useQuestionAnswer, "default");

// ----------------------------------------------------------------------
// Tests
// ----------------------------------------------------------------------

describe("SingleChoiceQuestion", () => {
    beforeEach(() => {
        dispatchSpy.resetHistory();
        focusSpy.resetHistory();
        storeSelector.returns(false);
        validStub.returns(validData);
        answerStub.returns(answerData);
    });

    it("Renders a checkbox and label", () => {
        const component = shallow(<SingleChoiceQuestion {...props} />);
        expect(component.find(Checkbox).length).toBe(1);
        expect(component.find(HintableLabel).length).toBe(1);
    });

    it("Renders a checked checkbox", () => {
        answerStub.returns({ ...answerData, value: true });
        const component = shallow(<SingleChoiceQuestion {...props} />);
        expect(component.find(Checkbox).props().checked).toBe(true);
    });

    it("Updates the store when clicking the checkbox", () => {
        const component = shallow(<SingleChoiceQuestion {...props} />);
        component.find(Label).simulate("click");

        // updates value
        expect(dispatchSpy.callCount).toBe(1);
        expect(dispatchSpy.args[0]).toStrictEqual([
            setAnswer({
                questionId: "id",
                type: questionTypes.single,
                value: true,
            }),
        ]);

        // updates focused state
        expect(focusSpy.callCount).toBe(1);
    });

    it("Does not update the store when clicking if disabled", () => {
        storeSelector.returns(true);
        const component = shallow(<SingleChoiceQuestion {...props} />);
        component.find(Label).simulate("click");
        expect(dispatchSpy.callCount).toBe(0);
    });

    it("Renders an error if the input is not valid", () => {
        validStub.returns({ ...validData, showError: true });
        const component = shallow(<SingleChoiceQuestion {...props} />);
        expect(component.find(FieldError).length).toBe(1);
        expect(component.find(FieldError).find(Icon).props().type).toBe("error");
    });
});
