import { shallow } from "enzyme";
import React from "react";
import { spy, stub } from "sinon";
import * as store from "../../redux/store";
import { SingleChoiceAnswerType } from "../../types/AnswerTypes";
import { questionTypes } from "../../types/QuestionTypes";
import Checkbox from "../common/Checkbox";
import HintableLabel from "../common/HintableLabel";
import Icon from "../common/Icon";
import { FieldError } from "../styles/Input";
import { setAnswer, setAnswerFocus } from "../../redux/actions/answersActions";
import * as validatorUtils from "../../utils/validator";
import SingleChoiceQuestion from "./SingleChoiceQuestion";

// ----------------------------------------------------------------------
// Data
// ----------------------------------------------------------------------

const props: React.ComponentProps<typeof SingleChoiceQuestion> = {
    question: {
        id: "id",
        hash: "hash",
        type: questionTypes.single,
        title: "Title",
    },
};

const answerData: SingleChoiceAnswerType = {
    questionIdHash: "id",
    type: questionTypes.single,
    focussed: false,
    value: false,
};

const focusSpy = spy();
const validData: ReturnType<typeof validatorUtils.getValidAnswerData> = {
    error: "error",
    showError: false,
    setFocussed: focusSpy,
};

// ----------------------------------------------------------------------
// Mocking
// ----------------------------------------------------------------------

const dispatchSpy = spy();
stub(store, "useStoreDispatch").returns(dispatchSpy);
stub(store, "useTypedStore").returns({} as any);

const storeSelector = stub(store, "useStoreSelector");
const validStub = stub(validatorUtils, "getValidAnswerData");

// ----------------------------------------------------------------------
// Tests
// ----------------------------------------------------------------------

describe("SingleChoiceQuestion", () => {
    beforeEach(() => {
        dispatchSpy.resetHistory();
        focusSpy.resetHistory();
        validStub.returns(validData);

        storeSelector.resetHistory();
        storeSelector.onCall(0).returns(false); // disableControl
        storeSelector.onCall(1).returns(answerData);
    });

    it("Renders a checkbox and label", () => {
        const component = shallow(<SingleChoiceQuestion {...props} />);
        expect(component.find(Checkbox).length).toBe(1);
        expect(component.find(HintableLabel).length).toBe(1);
    });

    it("Renders a checked checkbox", () => {
        storeSelector.onCall(1).returns({ ...answerData, value: true });
        const component = shallow(<SingleChoiceQuestion {...props} />);
        expect(component.find(Checkbox).props().checked).toBe(true);
    });

    it("Updates the store when clicking the checkbox", () => {
        const component = shallow(<SingleChoiceQuestion {...props} />);
        component.find(Checkbox).simulate("click");

        // updates value
        expect(dispatchSpy.callCount).toBe(2);
        expect(dispatchSpy.args[1]).toStrictEqual([
            setAnswer({
                questionIdHash: "hash-id",
                type: questionTypes.single,
                value: true,
            }),
        ]);

        // updates focused state
        expect(dispatchSpy.args[0]).toStrictEqual([setAnswerFocus("hash-id", true)]);
    });

    it("Renders an error if the input is not valid", () => {
        validStub.returns({ ...validData, showError: true });
        const component = shallow(<SingleChoiceQuestion {...props} />);
        expect(component.find(FieldError).length).toBe(1);
        expect(component.find(FieldError).find(Icon).props().type).toBe("error");
    });
});
