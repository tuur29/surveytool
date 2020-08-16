import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 75%;
    padding: ${({ theme }) => theme.space[3]}px;
    background-color: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.onSurface};
    border-radius: ${({ theme }) => theme.sizes.radius};
`;
