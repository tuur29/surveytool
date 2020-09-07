import { ConfigType } from "../types/ConfigTypes";
import { questionTypes } from "../types/QuestionTypes";
import { resultContentTypes } from "../types/ResultTypes";

export const mockConfig: Partial<ConfigType> = {
    id: "mock1",
    questions: [
        {
            id: "EDJUJDO",
            type: questionTypes.single,
            title: "Are you interested{hint} in eating an ice cream?{hint}",
            hints: ["It's a word", "Say yes!"],
        },
        {
            id: "JIWMEFJA",
            type: questionTypes.multiple,
            title: "What flavour do you want?",
            inputType: "radio",
            options: [
                { id: "0", title: "Vanilla" },
                { id: "1", title: "Banana" },
                {
                    id: "2",
                    title: "Ben & Jerry's{hint} Imagine Whirled Peace{hint}",
                    hints: ["(TM)", "Yes this is a real flavour."],
                },
                { id: "3", title: "Chocolat" },
            ],
            required: true,
        },
        {
            id: "PXCHUDAK",
            type: questionTypes.text,
            inputType: "number",
            title: "How many other people would you estimate that share your favourite flavour?",
            required: true,
        },
        {
            id: "QXCHUKIH",
            type: questionTypes.range,
            title: "How many do you want?",
            inputType: "slider",
            min: 0,
            max: 10,
            required: true,
        },
        {
            id: "CUIHUDAK",
            type: questionTypes.text,
            inputType: "email",
            placeholder: "ben@jerry.com",
            title: "On which address do you want to receive your digital{hint} ice cream?",
            hints: ["Do not worry it won't melt."],
        },
        {
            id: "LPAKDUCZUD",
            type: questionTypes.multiple,
            title: "Where do you live?",
            inputType: "select",
            options: [
                { id: "0", title: "US{hint}", hints: ["United States"] },
                { id: "1", title: "Somewhere else" },
            ],
            calcFunction: (question: any, answer: any) => {
                return answer.values.includes("0") ? -99 : 0;
            },
        },
        {
            id: "ENARECZUD",
            type: questionTypes.multiple,
            title: "Which toppings do you want?",
            inputType: "check",
            options: [
                { id: "0", title: "Sprinkels" },
                { id: "1", title: "Crumbs" },
                { id: "2", title: "Chocolat sauce" },
            ],
            defaultIds: ["1", "2"],
        },
        {
            id: "PZQUDAF",
            type: questionTypes.text,
            inputType: "text",
            title: "How do you want to name your creation?",
            customValidation: {
                regex: "^.{0,10}$",
                error: "Names longer than 10 characters are not allowed",
            },
            calcFunction: (question: any, answer: any) => {
                return answer.value.length;
            },
        },
        {
            id: "EPOCOCVOD",
            type: questionTypes.single,
            title: "Did you like this order flow?",
            checkedByDefault: true,
            required: true,
        },
        {
            id: "PDJRLCWT",
            type: questionTypes.range,
            title: "How much did you like it?",
            inputType: "radio",
            min: 2,
            step: 2,
            max: 8,
            default: 4,
            calcFunction: (question: any, answer: any): number => (answer.value / (question.max - question.min)) * 100,
        },
    ],
    result: {
        scoreDomain: [0, 100],
        postDataUrl: "POST;https://kajira.ugent.be/introquiz2020?api=answer",
        content: [
            { type: resultContentTypes.label, style: "title", label: "Thanks for your {score10}/10 submission" },
            {
                type: resultContentTypes.label,
                style: "description",
                label:
                    "Lorem {score5}/5 ipsum dolor sit amet ({score}) consectetur adipiscing elit. {score20} out of 20 Erat enim Polemonis. Iam contemni non poteris. Equidem etiam Epicurum, in physicis quidem, Democriteum puto. An quod ita callida est, ut optime possit architectari voluptates? Iam quae corporis sunt, ea nec auctoritatem cum animi partibus, comparandam et cognitionem habent faciliorem. Duo Reges: constructio interrete. Sine ea igitur iucunde negat posse se vivere? Cur tantas regiones barbarorum pedibus obiit, tot maria transmisit? Bonum incolumis acies: misera caecitas. Cur tantas regiones barbarorum pedibus obiit, tot maria transmisit?",
            },
            { type: resultContentTypes.label, style: "scoreCounter", label: "{score100} %", animate: true },
            {
                type: resultContentTypes.graph,
                dataUrl: "GET;https://kajira.ugent.be/introquiz2020?api=graph&score={score}",
                format: "line",
                titleLabel: "Line graph",
            },
            {
                type: resultContentTypes.graph,
                dataUrl: "/surveytool/mockBarGraph.json",
                format: "bar",
                titleLabel: "Bar graph",
            },
            { type: resultContentTypes.button, label: "Restart", function: "restart" },
        ],
    },
    // theme: {
    //     darkMode: true,
    //     values: {
    //         colors: { controlHighlight: "#ff00ff" },
    //         sizes: { radius: "0px" },
    //         fonts: { title: "Serif" },
    //         breakpoints: { md: "600px" }
    //     }
    // },
    // labels: { questionsFooter: "Copyright", },
};
