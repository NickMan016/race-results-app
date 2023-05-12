import { View, Text, Image } from "react-native";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { Country } from "../../../../../../interfaces/CountriesInterfaces";
import { F1Context } from "../../../../../../context/F1DB/F1Context";
import TableData from "../../../../../TableData";
import Section from "../../../../../Section";
import SectionLoading from "../../../../../Section/components/SectionLoading";
import { ThemeContext } from "../../../../../../context/Theme/ThemeContext";

interface PropsSectionSprint {
    showSectionSprint: Dispatch<SetStateAction<boolean>>
}

export default function SectionSprint({ showSectionSprint }: PropsSectionSprint) {
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
    const { stateTheme } = useContext(ThemeContext);
    const { stateSprint, getSprint } = useContext(F1Context);
    const [stateCountry, setStateCountry] = useState(INITIAL_STATE);
    const { RaceTable } = stateSprint;
    const { flags } = stateCountry;

    useEffect(() => {
        const response = getSprint('current/next/sprint', setStateCountry);

        setTimeout(() => {
            response.then(value => {
                showSectionSprint(value)
                setIsLoad(value)
            })
        }, 2000);
    }, [])

    return (
        <>
            {
                isLoad ? (
                    <Section
                        title={`${RaceTable?.Races[0].raceName} Sprint`}
                        content={
                            <>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                    <Text style={{ fontSize: 18, lineHeight: 26, color: `${stateTheme === 'dark' ? '#fff' : '#000'}` }}>
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
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
                                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                        <FontAwesomeIcon icon={faCircle} size={20} style={{ color: '#16A34A', marginRight: 6 }} />
                                        <Text style={{ fontSize: 18, color: `${stateTheme === 'dark' ? '#fff' : '#000'}` }}>
                                            Finished
                                        </Text>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                        <FontAwesomeIcon icon={faCircle} size={20} style={{ color: '#DC2626', marginRight: 6 }} />
                                        <Text style={{ fontSize: 18, color: `${stateTheme === 'dark' ? '#fff' : '#000'}` }}>
                                            DNF
                                        </Text>
                                    </View>
                                </View>
                                    <TableData
                                        height='70%'
                                        tBody={
                                            <>
                                                {RaceTable?.Races[0].SprintResults?.map((value, index) => {
                                                    let status, time;

                                                    if (value.status === 'Finished' || value.status === '+1 Lap' || value.status === '+2 Laps' || value.status === '+3 Laps' || value.status === '+4 Laps' || value.status === '+5 Laps' || value.status === '+6 Laps' || value.status === '+7 Laps' || value.status === '+8 Laps' || value.status === '+9 Laps') {
                                                        status = <View style={{ flex: 1, alignItems: "center" }}>
                                                            <FontAwesomeIcon icon={faCircle} size={20} style={{ color: '#16A34A', marginRight: 6 }} />
                                                        </View>;
                                                        time = value.Time?.time || value.status;
                                                    } else {
                                                        status = <View style={{ flex: 1, alignItems: "center" }}>
                                                            <FontAwesomeIcon icon={faCircle} size={20} style={{ color: '#DC2626', marginRight: 6 }} />
                                                        </View>;
                                                        time = 'No Time'
                                                    }
                                                    return (
                                                        <View key={index} style={{ flexDirection: "row", alignItems: "center", borderBottomWidth: .75, borderBottomColor: '#000', paddingVertical: 4 }}>
                                                            <View style={{ flex: 1.2, alignItems: "center" }}><Text style={{ fontSize: 16, color: `${stateTheme === 'dark' ? '#fff' : '#000'}` }}>
                                                                {value.position}
                                                            </Text></View>
                                                            <View style={{ flex: 4 }}>
                                                                <Text style={{ fontSize: 16, color: `${stateTheme === 'dark' ? '#fff' : '#000'}` }}>{`${value.Driver.givenName.slice(0, 1)}. ${value.Driver.familyName}`}</Text>
                                                                <Text style={{ fontSize: 12, color: `${stateTheme === 'dark' ? '#fff' : '#000'}` }}>{value.Constructor.name}</Text>
                                                            </View>
                                                            <View style={{ flex: 3 }}><Text style={{ fontSize: 16, color: `${stateTheme === 'dark' ? '#fff' : '#000'}` }}>{time}</Text></View>
                                                            <View style={{ flex: 2, flexDirection: "row" }}>
                                                                {status}
                                                            </View>
                                                            <View style={{ flex: 1.25, alignItems: "center" }}><Text style={{ fontSize: 16, color: `${stateTheme === 'dark' ? '#fff' : '#000'}` }}>{value.points}</Text></View>
                                                        </View>
                                                    )
                                                })}
                                            </>
                                        }
                                    />
                            </>
                        }
                    />
                ) : (
                    <SectionLoading />
                )
            }
        </>
    )
}