import React from "react";
import { Hint } from "./Hint";

type HintablePropsType = {
    label: string;
    hints?: string[];
};

const HintableLabel = (props: HintablePropsType): JSX.Element => {
    const { label, hints } = props;
    const parts = label.split("{hint}");

    if (hints && hints.length) {
        if (parts.length <= 1) {
            console.warn(`The label "${label}" has hints defined, but doesn't have "{hint}" placeholders.`);
        } else if (hints.length !== parts.length - 1) {
            console.warn(`The label "${label}" doesn't contain the same amount of hints as "{hint}" placeholders.`);
        } else {
            return (
                <span>
                    {parts.reduce((output, part, index) => {
                        const hint = hints[index];
                        return (
                            <>
                                {output}
                                {part}
                                {hint && <Hint content={hint} />}
                            </>
                        );
                    }, <></>)}
                </span>
            );
        }
    }

    if (parts.length > 1) {
        console.warn(`The label "${label}" contains "{hint}" placeholders, but doesn't have hints defined.`);
    }

    return <span>{label}</span>;
};

export default HintableLabel;
