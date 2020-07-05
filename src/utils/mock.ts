import { answerTypes, ConfigType } from "../types/ConfigTypes";

export const mockConfig: Partial<ConfigType> = {
    id: "mock",
    questions: [
        {
            id: "EDJUJDO",
            type: answerTypes.single,
            title: "Are you interested{hint} in eating an ice cream?{hint}",
            hints: ["It's a word", "Say yes!"],
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
                    title: "Ben & Jerry's{hint} Imagine Whirled Peace{hint}",
                    hints: ["(TM)", "Yes this is a real flavour."],
                },
                { id: "3", title: "Chocolat" },
            ],
        },
        {
            id: "PXCHUDAK",
            type: answerTypes.text,
            format: "number",
            title: "How many other people would you estimate that share your favourite flavour?",
        },
        {
            id: "QXCHUKIH",
            type: answerTypes.slider,
            title: "How many do you want?",
            min: 0,
            max: 10,
            default: 1,
        },
        {
            id: "CUIHUDAK",
            type: answerTypes.text,
            format: "email",
            placeholder: "ben@jerry.com",
            title: "On which address do you want to receive your digital{hint} ice cream?",
            hints: ["Do not worry it won't melt."],
        },
        {
            id: "LPAKDUCZUD",
            type: answerTypes.multiple,
            title: "Where do you live?",
            inputType: "select",
            answers: [
                { id: "0", title: "US{hint}", hints: ["United States"] },
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
            customValidation: {
                regex: "^.{0,10}$",
                error: "Names longer than 10 characters are not allowed",
            },
        },
        {
            id: "EPOCOCVOD",
            type: answerTypes.single,
            title: "Did you like this order flow?",
            checkedByDefault: true,
        },
    ],
};
