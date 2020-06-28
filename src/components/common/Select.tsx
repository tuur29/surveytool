import React, { useState } from "react";
import { SelectDropdown, SelectOption, SelectWrapper, SelectValue } from "../styles/Input";
import Icon, { orientations } from "../../svg/Icon";
import HintableLabel from "./HintableLabel";

type PropsType = {
    options: { id: string; title: string; hints?: string[] }[];
    selectedOptionId: string;
    onSelectOption: (id: string) => void;
};

const Select = (props: PropsType): JSX.Element => {
    const { options, selectedOptionId, onSelectOption } = props;
    const [opened, setOpened] = useState(false);

    const toggleOpen = () => setOpened((prev) => !prev);
    const selectedOption = options.find((option) => option.id === selectedOptionId);

    return (
        <SelectWrapper>
            <SelectValue onClick={toggleOpen}>
                <HintableLabel label={selectedOption?.title || "---"} hints={selectedOption?.hints || []} />
                <Icon type="upCaret" orientation={opened ? orientations.up : orientations.down} color="foreSoft" />
            </SelectValue>
            {/* TODO: remove forced true */}
            <SelectDropdown show={opened}>
                {options.map((option) => (
                    <SelectOption
                        key={option.id}
                        onClick={() => {
                            onSelectOption(option.id);
                            toggleOpen();
                        }}
                    >
                        <HintableLabel label={option.title} hints={option.hints} />
                    </SelectOption>
                ))}
            </SelectDropdown>
        </SelectWrapper>
    );
};

export default Select;
