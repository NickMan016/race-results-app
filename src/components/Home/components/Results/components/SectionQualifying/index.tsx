import { View, Text, Image } from "react-native"
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { F1Context } from "../../../../../../context/F1DB/F1Context";
import { Country } from "../../../../../../interfaces/CountriesInterfaces";
import Section from "../../../../../Section";
import TableData from "../../../../../TableData";
import SectionLoading from "../../../../../Section/components/SectionLoading";

interface PropsSectionQualifying {
    showSectionQualifying: Dispatch<SetStateAction<boolean>>
}

export default function SectionQualifying({ showSectionQualifying }: PropsSectionQualifying) {

    const INITIAL_STATE: Country = {
        name: "",
        alpha3Code: "",
        timezones: [],
        flags: {
            png: "",
            svg: ""
        },
        independent: "",
        altSpellings: [],
        region: "",
        capital: ""
    }

    const [isLoad, setIsLoad] = useState(false);
    const { stateQualifying, getQualifying } = useContext(F1Context);
    const [stateCountry, setStateCountry] = useState(INITIAL_STATE);
    const { RaceTable } = stateQualifying;
    const { flags } = stateCountry;

    useEffect(() => {
        const response = getQualifying('current/next/qualifying', setStateCountry);

        setTimeout(() => {
            response.then(value => {
                showSectionQualifying(value)
                setIsLoad(value)
            })
        }, 2000);
    }, [])

    return (
        <>
            {
                isLoad ? (
                    <Section title={`${RaceTable?.Races[0].raceName} Qualifying`} content={
                        <>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                <Text style={{ fontSize: 18, lineHeight: 26 }}>
                                    {`${RaceTable?.Races[0].Circuit.circuitName}\n${RaceTable?.Races[0].Circuit.Location.locality}, ${RaceTable?.Races[0].Circuit.Location.country}`}
                                </Text>
                                {
                                    flags.png !== '' ? (
                                        <Image
                                            style={{ height: 30, width: 50, borderColor: '#000', borderWidth: .8 }}
                                            source={{ uri: `${flags.png}` }}
                                        />
                                    ) : undefined
                                }
                            </View>
                            <TableData
                                tBody={
                                    <>
                                        {RaceTable?.Races[0].QualifyingResults?.map((value, index) => {
                                            return (
                                                <View key={index} style={{ flexDirection: "row", alignItems: "center", borderBottomWidth: .75, borderBottomColor: '#000', paddingVertical: 4 }}>
                                                    <View style={{ flex: 1, alignItems: "center" }}><Text style={{ fontSize: 16 }}>
                                                        {value.position}
                                                    </Text></View>
                                                    <View style={{ flex: 4 }}>
                                                        <Text style={{ fontSize: 16 }}>{`${value.Driver.givenName.slice(0, 1)}. ${value.Driver.familyName}`}</Text>
                                                        <Text style={{ fontSize: 12 }}>{value.Constructor.name}</Text>
                                                    </View>
                                                    <View style={{ flex: 2.5 }}><Text style={{ fontSize: 16 }}>{value.Q1}</Text></View>
                                                    <View style={{ flex: 2.5 }}><Text style={{ fontSize: 16 }}>{value.Q2 === undefined ? 'No Time' : value.Q2}</Text></View>
                                                    <View style={{ flex: 2.5 }}><Text style={{ fontSize: 16 }}>{value.Q3 === undefined ? 'No Time' : value.Q2}</Text></View>
                                                </View>
                                            )
                                        })}
                                    </>
                                }
                            />
                        </>
                    } />
                ) : (
                    <SectionLoading />
                )
            }
        </>
    )
}