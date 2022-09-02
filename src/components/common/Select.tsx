import React, { useEffect, useState } from "react";
import useLabel from "../../hooks/useLabel";
import { SelectDropdown, SelectOption, SelectWrapper, SelectValue } from "../styles/Input";
import { HintType } from "../../types/QuestionTypes";
import Icon, { orientations } from "./Icon";
import HintableLabel from "./HintableLabel";

type PropsType = {
    /** List of items in the dropdown. These options can contain hints (see HintableLabel for more info). */
    options: { id: string; title: string; hints?: HintType[] }[];
    /** Id of the already selected option */
    selectedOptionId: string;
    /** Callback run when the user clicks an option */
    onSelectOption: (id: string) => void;
    /** Disable user interaction and display the value faded out. */
    disabled?: boolean;
};

const Select = (props: PropsType): JSX.Element => {
    const { options, selectedOptionId, onSelectOption, disabled } = props;
    const placeholder = useLabel("inputSelectPlaceholder", { count: options.length });
    const [opened, setOpened] = useState(false);

    const toggleOpen = () => !disabled && setOpened((prev) => !prev);
    const selectedOption = options.find((option) => option.id === selectedOptionId);

    useEffect(() => {
        if (disabled) setOpened(false);
    }, [disabled]);

    return (
        <SelectWrapper>
            <SelectValue onClick={toggleOpen} opened={opened} disabled={disabled}>
                <HintableLabel label={selectedOption?.title || placeholder || ""} hints={selectedOption?.hints || []} />
                <Icon
                    type="upCaret"
                    orientation={opened ? orientations.up : orientations.down}
                    color={disabled ? "controlOnBackDisabled" : undefined}
                />
            </SelectValue>

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
