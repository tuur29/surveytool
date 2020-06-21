import React from "react";
import { Tooltip } from "../styles/Tooltip";

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
                            {hint && (
                                <Tooltip>
                                    *<span>{hint}</span>
                                </Tooltip>
                            )}
                        </>
                    );
                }, <></>)}
            </span>
        );
    }

    return <span>{label}</span>;
};

export default HintableLabel;
