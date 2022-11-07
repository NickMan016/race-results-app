import { useState } from "react";
import SectionQualifying from "./components/SectionQualifying";
import SectionResults from "./components/SectionResults";
import SectionSprint from "./components/SectionSprint";


export default function Results() {
    const [showSection, setShowSection] = useState(true);
    const [showSectionSprint, setShowSectionSprint] = useState(true);

    return (
        <>
            {
                showSectionSprint ? (
                    <SectionSprint showSectionSprint={setShowSectionSprint} />
                ) : (
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
        </>
    )
}