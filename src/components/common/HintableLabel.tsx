import React, { useState } from "react";
import { Tooltip, TooltipContent } from "../styles/Tooltip";
import Icon from "../../svg/Icon";

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
                <Icon type="close" />
                {props.content}
            </TooltipContent>
        </Tooltip>
    );
};

type PropsType = {
    label: string;
    hints?: string[];
};

const HintableLabel = (props: PropsType): JSX.Element => {
    const { label, hints } = props;
    const parts = label.split("%h");

    if (hints && parts.length > 1 && hints.length === parts.length - 1) {
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

    return <span>{label}</span>;
};

export default HintableLabel;
