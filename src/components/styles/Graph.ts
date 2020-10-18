import styled from "styled-components";
import { WidthProps, width, FlexboxProps, flexbox } from "styled-system";

const LEGEND_RATIO = 0.25;

export const Card = styled.div<WidthProps>`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 75%;
    padding: ${({ theme }) => theme.space[3]}px;
    background-color: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.onSurface};
    border-radius: ${({ theme }) => theme.sizes.radius};
    ${width};
`;
Card.defaultProps = {
    width: { xs: 1, md: 0.75 },
};

export const Wrapper = styled.div<FlexboxProps & WidthProps>`
    display: flex;
    flex-grow: 1;
    justify-content: space-between;
    width: 100%;
    ${flexbox};

    svg {
        ${width};
    }
`;
Wrapper.defaultProps = {
    width: { xs: 1, md: 1 - LEGEND_RATIO },
    flexDirection: { xs: "column", md: "row" },
};

export const Legend = styled.div<FlexboxProps & WidthProps>`
    display: flex;
    flex-wrap: wrap;
    margin-top: ${({ theme }) => theme.space[3]}px;
    ${width};
    ${flexbox};
`;
Legend.defaultProps = {
    width: { xs: 1, md: LEGEND_RATIO },
    flexDirection: { xs: "row", md: "column" },
    justifyContent: { xs: "center", md: "flex-start" },
};

export const LegendItem = styled.div`
    display: flex;
    align-items: center;
    margin-right: ${({ theme }) => theme.space[2]}px;
    margin-bottom: ${({ theme }) => theme.space[1]}px;
`;

// TODO: make colours themeable
export const LegendSwatch = styled.div`
    flex-shrink: 0;
    width: 0.85em;
    height: 0.85em;
    margin-right: ${({ theme }) => theme.space[2]}px;
    background-color: ${({ color }) => color};
    border: 1px solid white;
    outline: 1px solid black;
`;
