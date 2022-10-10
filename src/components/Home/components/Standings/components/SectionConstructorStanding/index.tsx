import { View, Text } from "react-native";
import { useContext, useEffect, useState } from "react";
import { F1Context } from "../../../../../../context/F1DB/F1Context";
import Section from "../../../../../Section";
import TableData from "../../../../../TableData";

export default function SectionConstructorStanding() {
    const [isLoad, setIsLoad] = useState(false);
    const { stateConstructorStanding, getConstructorStanding } = useContext(F1Context);
    const { StandingsTable } = stateConstructorStanding

    useEffect(() => {
        const response = getConstructorStanding('current/constructorStandings');

        setTimeout(() => {
            response.then(value => setIsLoad(value))
        }, 2000);
    }, [])

    return (
        <>
            {
                isLoad ? (
                    <Section
                        title="Constructor Championship"
                        content={
                            <TableData
                                tBody={
                                    <>
                                        {
                                            StandingsTable?.StandingsLists[0].ConstructorStandings?.map((value, index) => (
                                                <View key={index} style={{ flexDirection: "row", alignItems: "center", borderBottomWidth: .5, borderBottomColor: '#000', paddingVertical: 4 }}>
                                                    <View style={{ flex: 1, alignItems: "center" }}><Text style={{ fontSize: 16 }}>
                                                        {value.position}
                                                    </Text></View>
                                                    <View style={{ flex: 4.5 }}>
                                                        <Text style={{ fontSize: 16 }}>{value.Constructor.name}</Text>
                                                        <Text style={{ fontSize: 12 }}>{value.Constructor.nationality}</Text>
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
                    <View>
                        <Text>Cargando...</Text>
                    </View>
                )
            }
        </>
    )
}