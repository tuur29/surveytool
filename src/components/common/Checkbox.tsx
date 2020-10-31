import React from "react";
import * as Styles from "../styles/Input";
import Icon from "./Icon";

type PropsType = {
    checked?: boolean;
    /** Disable user interaction and display the value faded out. */
    disabled?: boolean;
    /** Will be used as label. Clicking the label will also check the checkbox. */
    children: React.ReactNode;
    onClick: (newValue: boolean) => void;
};

const Checkbox = (props: PropsType): JSX.Element => {
    const { checked, disabled, children, onClick } = props;
    return (
        <Styles.Label onClick={!disabled ? () => onClick(!checked) : undefined} disabled={disabled}>
            <Styles.Checkbox checked={checked}>
                <Icon type="check" color={disabled ? "controlOnBackDisabled" : "controlHighlight"} />
            </Styles.Checkbox>
            {children}
        </Styles.Label>
    );
};

export default Checkbox;
