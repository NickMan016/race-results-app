import { View, Text } from "react-native";
import { useContext, useEffect, useState } from "react";
import { F1Context } from "../../../../../../context/F1DB/F1Context";
import Section from "../../../../../Section";
import TableData from "../../../../../TableData";
import SectionLoading from "../../../../../Section/components/SectionLoading";

export default function SectionDriverStanding() {
    const [isLoad, setIsLoad] = useState(false);
    const { stateDriverStanding, getDriverStanding } = useContext(F1Context);
    const { StandingsTable } = stateDriverStanding

    useEffect(() => {
        const response = getDriverStanding('current/driverStandings');

        setTimeout(() => {
            response.then(value => setIsLoad(value))
        }, 2000);
    }, [])

    return (
        <>
            {
                isLoad ? (
                    <Section
                        title="Driver Championship"
                        content={
                            <TableData
                                tBody={
                                    <>
                                        {
                                            StandingsTable?.StandingsLists[0].DriverStandings?.map((value, index) => (
                                                <View key={index} style={{ flexDirection: "row", alignItems: "center", borderBottomWidth: .5, borderBottomColor: '#000', paddingVertical: 4 }}>
                                                    <View style={{ flex: 1, alignItems: "center" }}><Text style={{ fontSize: 16 }}>
                                                        {value.position}
                                                    </Text></View>
                                                    <View style={{ flex: 4.5 }}>
                                                        <Text style={{ fontSize: 16 }}>{`${value.Driver.givenName} ${value.Driver.familyName}`}</Text>
                                                        <Text style={{ fontSize: 12 }}>{value.Constructors[0].name}</Text>
                                                    </View>
                                                    <View style={{ flex: 1, alignItems: "center" }}><Text style={{ fontSize: 16 }}>
                                                        {value.points}
                                                    </Text></View>
                                                </View>
                                            ))
                                        }
                                    </>
                                }
                            />
                        }
                    />
                ) : (
                    <SectionLoading />
                )
            }
        </>
    )
}