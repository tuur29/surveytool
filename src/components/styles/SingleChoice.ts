import styled from "styled-components";

export const Label = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
`;

export const Checkbox = styled.input.attrs({ type: "checkbox" })`
    margin-right: ${({theme}) => theme.space[2]}px;
`;
