import React from "react";
import { CenteredButtonWrapper, Button } from "../styles/Button";
import { useLabels } from "../../hooks/useLabel";
import Icon from "../common/Icon";
import { useStoreSelector, useStoreDispatch } from "../../redux/store";
import { isAnswerValid } from "../../utils/validator";
import { ErrorPanel, ErrorList } from "../styles/Question";
import { showResult } from "../../redux/actions/resultActions";

const MAX_ERRORS = 3;

type InvalidItem = { id: string; title: string };

const ShowResultsButton = (): JSX.Element => {
    const dispatch = useStoreDispatch();
    const allQuestions = useStoreSelector((state) => state.config.questions);
    const allAnswers = useStoreSelector((state) => state.answers.list);
    const [buttonLabel, errorTitleLabel] = useLabels(["resultSeeButton", "questionsErrorTitle"]);

    const invalidDataList = allAnswers.reduce<InvalidItem[]>((invalidList, answer) => {
        const question = allQuestions.find((item) => item.id === answer.questionId)!;
        if (!isAnswerValid(question, answer)) {
            // limit the errors list to MAX_ERRORS items
            if (invalidList.length === MAX_ERRORS) {
                invalidList.push({ id: "more", title: "..." });
            }

            if (invalidList.length < MAX_ERRORS) {
                invalidList.push({
                    id: question.id,
                    title: question.title.replace("{hint}", ""),
                });
            }
        }
        return invalidList;
    }, []);
    const isValid = invalidDataList.length < 1;

    const scrollToQuestionId = (id: string) => {
        document.querySelector(`#${id}`)?.scrollIntoView({
            behavior: "smooth",
        });
    };

    const goToResults = (): void => {
        if (isValid) dispatch(showResult());
    };

    return (
        <CenteredButtonWrapper>
            <Button disabled={!isValid} onClick={goToResults} iconAlign="right">
                {buttonLabel}
                <Icon type="next" />
            </Button>

            {!isValid && (
                <ErrorPanel>
                    <p>{errorTitleLabel}</p>
                    <ErrorList>
                        {invalidDataList.map((item) => (
                            <li key={item.id} onClick={() => scrollToQuestionId(item.id)}>
                                {item.title}
                            </li>
                        ))}
                    </ErrorList>
                </ErrorPanel>
            )}
        </CenteredButtonWrapper>
    );
};

export default ShowResultsButton;
