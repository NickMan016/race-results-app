import { TouchableHighlight, View, Text } from "react-native";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { F1Context } from "../../../../context/F1DB/F1Context";
import Section from "../../../Section";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import SectionLoading from "../../../Section/components/SectionLoading";
import ImageDriver from "../../../../hooks/ImageDriver";
import ImageConstructor from "../../../../hooks/imageConstructor";
import { ThemeContext } from "../../../../context/Theme/ThemeContext";


interface PropsSectionFinishSeason {
    showSectionFinishSeason: Dispatch<SetStateAction<boolean>>
}

export default function SectionFinishSeason({ showSectionFinishSeason }: PropsSectionFinishSeason) {
    const [isLoad, setIsLoad] = useState(false);
    const { stateTheme } = useContext(ThemeContext);
    const { stateDriverStanding, stateConstructorStanding, stateInfoDriverChampion, getDriverStanding, getConstructorStanding, getInfoDriverChampion, getSchedule } = useContext(F1Context);

    useEffect(() => {
        getSchedule(`current`)
        getDriverStanding('current/driverStandings');
        getConstructorStanding('current/constructorStandings');
        const response = getInfoDriverChampion();

        setTimeout(() => {
            response.then(value => {
                showSectionFinishSeason(value);
                setIsLoad(value);
            })
        }, 2000);
    }, [])

    return (
        <View style={{ flex: 12 }} >
            <View style={{ backgroundColor: '#ee0000', paddingVertical: 25 }}></View>
            {
                isLoad ? (
                    <>
                        <View>
                            {stateDriverStanding.StandingsTable.StandingsLists[0].DriverStandings.map((value, index) => (
                                <View key={index}>
                                    {
                                        index === 0 ? (
                                            <Section title={`Congratulations ${value.Driver.givenName} ${value.Driver.familyName}`} content={
                                                <View style={{ flexDirection: "row", marginTop: 10 }}>
                                                    <View style={{ flex: 1 }}>
                                                        <ImageDriver driver={`${value.Driver.driverId}`} size={140} margin={8} />
                                                    </View>
                                                    <View style={{ flex: 1, justifyContent: "center" }}>
                                                        <Text style={{ fontSize: 18, color: `${stateTheme === 'dark' ? '#fff' : '#000'}` }}>Points: {stateInfoDriverChampion.points}</Text>
                                                        <Text style={{ fontSize: 18, color: `${stateTheme === 'dark' ? '#fff' : '#000'}` }}>Races Won: {stateInfoDriverChampion.wins}</Text>
                                                        <Text style={{ fontSize: 18, color: `${stateTheme === 'dark' ? '#fff' : '#000'}` }}>Poles: {stateInfoDriverChampion.poles}</Text>
                                                        <Text style={{ fontSize: 18, color: `${stateTheme === 'dark' ? '#fff' : '#000'}` }}>Fastest Laps: {stateInfoDriverChampion.fastestlaps}</Text>
                                                    </View>
                                                </View>
                                            } />
                                        ) : undefined
                                    }
                                </View>
                            ))}
                        </View>
                        <View>
                            {stateConstructorStanding.StandingsTable.StandingsLists[0].ConstructorStandings.map((value, index) => (
                                <View key={index}>
                                    {
                                        index === 0 ? (
                                            <Section title={`Congratulations ${value.Constructor.name}`} content={
                                                <View style={{ flexDirection: "row", marginTop: 10 }}>
                                                    <View style={{ flex: 1, justifyContent: "center" }}>
                                                        <ImageConstructor constructor={`${value.Constructor.constructorId}`} />
                                                    </View>
                                                    <View style={{ flex: 1, justifyContent: "center" }}>
                                                        <Text style={{ fontSize: 18, color: `${stateTheme === 'dark' ? '#fff' : '#000'}` }}>Races Won: {value.wins}</Text>
                                                        <Text style={{ fontSize: 18, color: `${stateTheme === 'dark' ? '#fff' : '#000'}` }}>Points: {value.points}</Text>
                                                    </View>
                                                </View>
                                            } />
                                        ) : undefined
                                    }
                                </View>
                            ))}
                        </View>
                    </>
                ) : (
                    <SectionLoading />
                )
            }
        </View>
        //     {
        //         isLoad ? (
        //             <div className="col-span-6 lg:col-span-3">
        //                 {
        //                     stateConstructorStanding.StandingsTable.StandingsLists[0].ConstructorStandings.map((value, index) => (
        //                         <div key={index}>
        //                             {
        //                                 index === 0 ? (
        //                                     <Section title={`Congratulations ${value.Constructor.name}`} content={
        //                                         <div className="grid grid-cols-3">
        //                                             <div className="col-span-2">
        //                                                 <img className="mt-4 h-24 sm:h-32 m-auto" src={require(`./../../../../assets/img/constructors/${value.Constructor.constructorId}.png`)} alt={`Foto de ${value.Constructor.constructorId}`} />
        //                                             </div>
        //                                             <div className="col-span-1 flex flex-col justify-center">
        //                                                 <div className="block mt-2 text-lg">Races Won: {value.wins}</div>
        //                                                 <div className="block text-lg">Points: {value.points}</div>
        //                                             </div>
        //                                         </div>
        //                                     } />
        //                                 ) : undefined
        //                             }
        //                         </div>
        //                     ))
        //                 }
        //             </div>
        //         ) : (
        //             <div className="col-span-6 lg:col-span-3">
        //                 <SectionLoading />
        //             </div>
        //         )
        //     }

    )
}