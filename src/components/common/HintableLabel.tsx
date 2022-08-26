import React, { useState } from "react";
import { WhitespaceText } from "../styles/Text";
import { Tooltip, TooltipContent } from "../styles/Tooltip";
import Icon from "./Icon";

type HintablePropsType = {
    /** This string can contain multiple `{hint}` placeholders. */
    label: string;
    /** Each usage of the `{hint}` placeholder needs to have a string in this array. Optional if no hints are used. */
    hints?: string[];
};

const Hint = (props: { content: string }): JSX.Element => {
    const [opened, setOpened] = useState(false);
    const onClick = (event: React.SyntheticEvent) => {
        event.stopPropagation();
        setOpened((prev) => !prev);
    };

    return (
        <Tooltip>
            <Icon type="info" onClick={opened ? undefined : onClick} />
            <TooltipContent show={opened} onClick={opened ? onClick : undefined}>
                <Icon type="closeCircle" color="iconHover" />
                {props.content}
            </TooltipContent>
        </Tooltip>
    );
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
                            <WhitespaceText>
                                {output}
                                {part}
                                {hint && <Hint content={hint} />}
                            </WhitespaceText>
                        );
                    }, <></>)}
                </span>
            );
        }
    }

    if (parts.length > 1) {
        console.warn(`The label "${label}" contains "{hint}" placeholders, but doesn't have hints defined.`);
    }

    return <WhitespaceText>{label}</WhitespaceText>;
};

export default HintableLabel;
