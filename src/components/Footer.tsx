import React from "react";
import useLabel from "../hooks/useLabel";
import { useStoreSelector } from "../redux/store";
import { formatTimestamp } from "../utils/utils";
import { Footer as FooterStyle } from "./styles/Container";

const Footer = (): JSX.Element | null => {
    const lastAnsweredTimestamp = useStoreSelector((state) => state.answers.lastUpdate);
    const showAnsweredTimetamp = useStoreSelector((state) => state.answers.loadedFromStorage);
    const dateLocaleId = useLabel("dateLocaleId");
    const footerLabel = useLabel("footerText", {
        date: formatTimestamp(lastAnsweredTimestamp, dateLocaleId),
    });

    if (!showAnsweredTimetamp || !footerLabel) return null;
    return <FooterStyle>{footerLabel}</FooterStyle>;
};

export default Footer;
