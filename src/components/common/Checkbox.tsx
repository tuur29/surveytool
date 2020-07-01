import React from "react";
import * as Styles from "../styles/Input";
import Icon from "./Icon";

type PropsType = {
    checked?: boolean;
};

const Checkbox = (props: PropsType): JSX.Element => {
    const { checked } = props;

    return (
        <Styles.Checkbox checked={checked}>
            <Icon type="check" />
        </Styles.Checkbox>
    );
};

export default Checkbox;
