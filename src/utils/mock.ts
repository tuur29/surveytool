import { answerTypes, ConfigType } from "../types/ConfigTypes";

export const mockConfig: Partial<ConfigType> = {
    id: "mock",
    questions: [
        {
            id: "EDJUJDO",
            type: answerTypes.single,
            title: "Are you interested%h in eating an ice cream?%h",
            hints: ["It's a word", "Say yes!"],
        },
        {
            id: "PXCHUDAK",
            type: answerTypes.text,
            format: "number",
            title: "How many?",
        },
        {
            id: "JIWMEFJA",
            type: answerTypes.multiple,
            title: "What flavour do you want?",
            inputType: "radio",
            answers: [
                { id: "0", title: "Vanilla" },
                { id: "1", title: "Banana" },
                {
                    id: "2",
                    title: "Ben & Jerry's%h Imagine Whirled Peace%h",
                    hints: ["(TM)", "Yes this is a real flavour."],
                },
                { id: "3", title: "Chocolat" },
            ],
        },
        {
            id: "CUIHUDAK",
            type: answerTypes.text,
            format: "email",
            placeholder: "ben@jerry.com",
            title: "On which address do you want to receive your digital%h ice cream?",
            hints: ["Do not worry it won't melt."],
        },
        {
            id: "LPAKDUCZUD",
            type: answerTypes.multiple,
            title: "Where do you live?",
            inputType: "select",
            answers: [
                { id: "0", title: "US%h", hints: ["United States"] },
                { id: "1", title: "Somewhere else" },
            ],
        },
        {
            id: "ENARECZUD",
            type: answerTypes.multiple,
            title: "Which toppings do you want?",
            inputType: "check",
            answers: [
                { id: "0", title: "Sprinkels" },
                { id: "1", title: "Crumbs" },
                { id: "2", title: "Chocolat sauce" },
            ],
        },
        {
            id: "PZQUDAF",
            type: answerTypes.text,
            format: "text",
            title: "How do you want to name your creation?",
        },
        {
            id: "EPOCOCVOD",
            type: answerTypes.single,
            title: "Did you like this order flow?",
            checkedByDefault: true,
        },
    ],
};
