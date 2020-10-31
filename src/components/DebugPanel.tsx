import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { toggleBaseTheme } from "../redux/configReducer";
import { addMessages } from "../redux/messagesReducer";
import { useStoreDispatch, useStoreSelector } from "../redux/store";
import { messageTypes } from "../types/Messages";
import { isDev } from "../utils/utils";
import Checkbox from "./common/Checkbox";
import { Button } from "./styles/Button";
import { Label } from "./styles/Input";

// ----------------------------------------------------------------------
// Constants
// ----------------------------------------------------------------------

const mockMessages = [
    {
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat enim Polemonis.",
        type: messageTypes.info,
        timestamp: 0,
    },
    {
        title: "Something went wrong",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat enim Polemonis. Iam contemni non poteris. Equidem etiam Epicurum, in physicis quidem, Democriteum puto. An quod ita callida est, ut optime possit architectari voluptates? Iam quae corporis sunt, ea nec auctoritatem cum animi partibus, comparandam et cognitionem habent faciliorem.",
        type: messageTypes.error,
        timestamp: 0,
    },
];

// ----------------------------------------------------------------------
// Styles
// ----------------------------------------------------------------------

export const GlobalDebugStyle = createGlobalStyle`
  body {
    color: ${({ theme }) => theme.colors.onBack};
    background-color: ${({ theme }) => theme.colors.back};
  }
`;

const Wrapper = styled.div`
    position: fixed;
    top: 0;
    right: ${({ theme }) => theme.space[3]}px;
    z-index: ${({ theme }) => theme.zIndex.debug};
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    & > * {
        margin-top: ${({ theme }) => theme.space[3]}px;
    }
`;

// ----------------------------------------------------------------------
// Component
// ----------------------------------------------------------------------

const DebugPanel = (): JSX.Element | null => {
    const dispatch = useStoreDispatch();
    const config = useStoreSelector((state) => state.config);

    if (!isDev(true)) return null;
    return (
        <>
            <GlobalDebugStyle />
            <Wrapper>
                <Label onClick={() => dispatch(toggleBaseTheme(!config.theme?.darkMode))}>
                    <Checkbox checked={config.theme?.darkMode} />
                    Dark mode
                </Label>
                <Button onClick={() => dispatch(addMessages(mockMessages))}>Add messages</Button>
                <Button
                    onClick={() =>
                        window.setSurveyConfig({
                            ...config,
                            result: { ...config.result, enableControls: !config.result.enableControls },
                        })
                    }
                >
                    Toggle editable
                </Button>
            </Wrapper>
        </>
    );
};

export default DebugPanel;
