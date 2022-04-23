import React from "react";
import { CenteredButtonWrapper, Button } from "../styles/Button";
import { useLabels } from "../../hooks/useLabel";
import Icon from "../common/Icon";
import { useStoreSelector, useStoreDispatch } from "../../redux/store";
import { isAnswerValid } from "../../utils/validator";
import { ErrorPanel, ErrorList } from "../styles/Question";
import { showResult } from "../../redux/actions/resultActions";
import { getAllQuestionsSelector, getQuestionIdHash } from "../../utils/utils";
import { setAnswerFocus } from "../../redux/actions/answersActions";

const MAX_ERRORS = 3;

type InvalidItem = { idHash: string; title: string };

const ShowResultsButton = (): JSX.Element => {
    const dispatch = useStoreDispatch();
    const allQuestions = useStoreSelector(getAllQuestionsSelector);
    const allAnswers = useStoreSelector((state) => state.answers.list);
    const resultsAreShown = useStoreSelector((state) => state.result.showResult);
    const [buttonLabel, errorTitleLabel] = useLabels(["resultSeeButton", "questionsErrorTitle"]);

    const invalidDataList = allAnswers.reduce<InvalidItem[]>((invalidList, answer) => {
        const question = allQuestions.find((question) => answer.questionIdHash.includes(question.hash!));
        if (question && !isAnswerValid(question, answer)) {
            // limit the errors list to MAX_ERRORS items
            if (invalidList.length === MAX_ERRORS) {
                invalidList.push({ idHash: "more", title: "..." });
            }

            if (invalidList.length < MAX_ERRORS) {
                invalidList.push({
                    idHash: getQuestionIdHash(question),
                    title: question.title.replace("{hint}", ""),
                });
            }
        }
        return invalidList;
    }, []);
    const isValid = invalidDataList.length < 1;

    const scrollToQuestionId = (idHash: string) => {
        dispatch(setAnswerFocus(idHash, true));
        document.querySelector(`#question-${idHash}`)?.scrollIntoView({
            behavior: "smooth",
        });
    };

    const goToResults = (): void => {
        if (isValid) dispatch(showResult());
    };

    return (
        <CenteredButtonWrapper mt={4}>
            {!resultsAreShown && (
                <Button disabled={!isValid} onClick={goToResults} iconAlign="right">
                    {buttonLabel}
                    <Icon type="next" />
                </Button>
            )}

            {!isValid && (
                <ErrorPanel>
                    <p>{errorTitleLabel}</p>
                    <ErrorList>
                        {invalidDataList.map((item) => (
                            <li key={item.idHash} onClick={() => scrollToQuestionId(item.idHash)}>
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
