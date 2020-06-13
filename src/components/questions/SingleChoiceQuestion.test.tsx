import React from "react";
import { shallow } from "enzyme";
import SingleChoiceQuestion from "./SingleChoiceQuestion";
import { answerTypes } from "../../types/ConfigTypes";
import { Title } from "../styles/Questions";
import { Checkbox, Label } from "../styles/Checkbox";

const props: React.ComponentProps<typeof SingleChoiceQuestion> = {
    question: {
        type: answerTypes.single,
        title: "Title",
        id: "id",
    },
};

describe("SingleChoiceQuestion", () => {
    it("Renders title", () => {
        const component = shallow(<SingleChoiceQuestion {...props} />);
        expect(component.find(Title).text()).toBe("Title");
    });

    it("Toggles checkbox state when clicking label", () => {
        const component = shallow(<SingleChoiceQuestion {...props} />);
        expect(component.find(Checkbox).props().checked).toBe(false);

        component.find(Label).simulate("click");
        expect(component.find(Checkbox).props().checked).toBe(true);
    });

    it("Renders a check by default when configured", () => {
        const newQuestion = { ...props.question, checkedByDefault: true };
        const component = shallow(<SingleChoiceQuestion {...props} question={newQuestion} />);

        expect(component.find(Checkbox).props().checked).toBe(true);

        // can uncheck again if checked by default
        component.find(Label).simulate("click");
        expect(component.find(Checkbox).props().checked).toBe(false);
    });
});
