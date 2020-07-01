import React, { useState } from "react";
import { Tooltip, TooltipContent } from "../styles/Tooltip";
import Icon from "./Icon";

export const Hint = (props: { content: string }): JSX.Element => {
    const [opened, setOpened] = useState(false);
    const onClick = (event: React.SyntheticEvent) => {
        event.stopPropagation();
        setOpened((prev) => !prev);
    };

    return (
        <Tooltip>
            <Icon type="info" onClick={opened ? undefined : onClick} />
            <TooltipContent show={opened} onClick={opened ? onClick : undefined}>
                <Icon type="close" color="iconHover" />
                {props.content}
            </TooltipContent>
        </Tooltip>
    );
};
