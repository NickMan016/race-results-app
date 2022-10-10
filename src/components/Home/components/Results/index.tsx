import { useState } from "react";
import SectionQualifying from "./components/SectionQualifying";
import SectionResults from "./components/SectionResults";


export default function Results() {
    const [showSection, setShowSection] = useState(true);

    return (
        <>
            {
                showSection ? (
                    <SectionQualifying showSectionQualifying={setShowSection} />
                ) : (
                    <SectionResults />
                )
            }
        </>
    )
}