import React from "react";
import { ListItem } from "../styles/List";

type PropsType = {
    title: string;
};

// Only used for demo purposes
const BasicQuestion = (props: PropsType): JSX.Element => {
    const { title } = props;

    return <ListItem>
        {title}
    </ListItem>;
};

export default BasicQuestion;
