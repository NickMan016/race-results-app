import { useContext, useEffect, useState } from "react";
import { View, Text, Image, TouchableHighlight, ScrollView } from "react-native"
import { useNavigate } from "react-router-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { fa1, fa2, fa3, faArrowLeft, faChevronCircleLeft, faChevronCircleRight, faClock, faP } from "@fortawesome/free-solid-svg-icons"
import { Country } from "../../interfaces/CountriesInterfaces";
import { F1Context } from "../../context/F1DB/F1Context";
import Section from "../Section";
import moment from "moment-timezone";
import ImageCircuit from "../../hooks/ImageCircuit";
import ImageDriver from "../../hooks/ImageDriver";
import SectionLoading from "../Section/components/SectionLoading";
import SectionLoadingTable from "../Section/components/SectionLoadingTable";
import { ThemeContext } from "../../context/Theme/ThemeContext";

export default function Schedule() {

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

    const navigate = useNavigate();
    const [isLoad, setIsLoad] = useState(false);
    const { stateTheme } = useContext(ThemeContext);
    const { stateSchedule, stateRace, stateResults, getSchedule, getRaceWithResults } = useContext(F1Context);
    const [stateCountry, setStateCountry] = useState(INITIAL_STATE);
    const { RaceTable } = stateRace;
    const { flags } = stateCountry

    useEffect(() => {
        const date = new Date();
        getSchedule(date.getFullYear().toString())
        const response = getRaceWithResults(`current/next`, setStateCountry)

        setTimeout(() => {
            response.then(value => setIsLoad(value))
        }, 2000);
    }, [])

    const handleChangeRoundPlus = () => {
        setIsLoad(false)
        const responseRace = getRaceWithResults(`${RaceTable?.season}/${parseInt(RaceTable?.round || '1') + 1}`, setStateCountry)

        setTimeout(() => {
            responseRace.then(value => setIsLoad(value))
        }, 2000);
    }

    const handleChangeRoundMinus = () => {
        setIsLoad(false)
        const responseRace = getRaceWithResults(`${RaceTable?.season}/${parseInt(RaceTable?.round || '1') - 1}`, setStateCountry)

        setTimeout(() => {
            responseRace.then(value => setIsLoad(value))
        }, 2000);
    }

    const backHome = () => {
        navigate('/')
    }

    return (
        <View style={{ flex: 12, backgroundColor: `${stateTheme === 'dark' ? '#111827' : '#fff'}` }} >
            <View style={{ backgroundColor: '#ee0000', paddingVertical: 24 }}></View>
            {
                RaceTable.Races.length > 0 ? (
                    <Section title="Current Season Schedule" content={
                        <>
                            {
                                isLoad ? (
                                    <>
                                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}>
                                            {RaceTable.round === '1' ? (
                                                <FontAwesomeIcon style={{ flex: 1, color: '#878787' }} icon={faChevronCircleLeft} size={22} />
                                            ) : (
                                                <TouchableHighlight onPress={handleChangeRoundMinus} activeOpacity={1} underlayColor={`${stateTheme === 'dark' ? '#585858' : '#bbbbbb'}`}>
                                                    <FontAwesomeIcon style={{ flex: 1, color: `${stateTheme === 'dark' ? '#fff' : '#000'}` }} icon={faChevronCircleLeft} size={22} />
                                                </TouchableHighlight>
                                            )}
                                            <Text style={{ flex: 1, textAlign: "center", fontSize: 20, color: `${stateTheme === 'dark' ? '#fff' : '#000'}` }}>{RaceTable.Races[0].raceName}</Text>
                                            {RaceTable?.round === stateSchedule.total ? (
                                                <FontAwesomeIcon style={{ flex: 1, color: '#878787' }} icon={faChevronCircleRight} size={22} />
                                            ) : (
                                                <TouchableHighlight onPress={handleChangeRoundPlus} activeOpacity={1} underlayColor={`${stateTheme === 'dark' ? '#585858' : '#bbbbbb'}`} disabled={RaceTable.round === stateSchedule.total ? true : false}>
                                                    <FontAwesomeIcon style={{ flex: 1, color: `${stateTheme === 'dark' ? '#fff' : '#000'}` }} icon={faChevronCircleRight} size={22} />
                                                </TouchableHighlight>
                                            )}
                                        </View>
                                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginVertical: 4 }}>
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
                                        <ScrollView style={{height: '70%'}}>
                                            {
                                                stateResults.RaceTable?.Races.length === 0 ? (
                                                    <>
                                                        <View style={{ flexDirection: "row" }}>
                                                            <Text style={{ fontSize: 18, fontWeight: "bold", color: `${stateTheme === 'dark' ? '#fff' : '#000'}` }}>FP1: </Text>
                                                            <Text style={{ fontSize: 18, color: `${stateTheme === 'dark' ? '#fff' : '#000'}` }}>{moment(`${RaceTable.Races[0].FirstPractice.date} ${RaceTable.Races[0].FirstPractice.time}`).format('ddd, MMM DD HH:mm [hrs]')}</Text>
                                                        </View>
                                                        {
                                                            (Object.keys(RaceTable?.Races[0].Sprint || {}).length) === 0 ? (
                                                                <>
                                                                    <View style={{ flexDirection: "row" }}>
                                                                        <Text style={{ fontSize: 18, fontWeight: "bold", color: `${stateTheme === 'dark' ? '#fff' : '#000'}` }}>FP2: </Text>
                                                                        <Text style={{ fontSize: 18, color: `${stateTheme === 'dark' ? '#fff' : '#000'}` }}>{moment(`${RaceTable.Races[0].SecondPractice.date} ${RaceTable.Races[0].SecondPractice.time}`).format('ddd, MMM DD HH:mm [hrs]')}</Text>
                                                                    </View>
                                                                    <View style={{ flexDirection: "row" }}>
                                                                        <Text style={{ fontSize: 18, fontWeight: "bold", color: `${stateTheme === 'dark' ? '#fff' : '#000'}` }}>FP3: </Text>
                                                                        <Text style={{ fontSize: 18, color: `${stateTheme === 'dark' ? '#fff' : '#000'}` }}>{moment(`${RaceTable.Races[0].ThirdPractice?.date} ${RaceTable.Races[0].ThirdPractice?.time}`).format('ddd, MMM DD HH:mm [hrs]')}</Text>
                                                                    </View>
                                                                    <View style={{ flexDirection: "row" }}>
                                                                        <Text style={{ fontSize: 18, fontWeight: "bold", color: `${stateTheme === 'dark' ? '#fff' : '#000'}` }}>Qualifying: </Text>
                                                                        <Text style={{ fontSize: 18, color: `${stateTheme === 'dark' ? '#fff' : '#000'}` }}>{moment(`${RaceTable.Races[0].Qualifying.date} ${RaceTable.Races[0].Qualifying.time}`).format('ddd, MMM DD HH:mm [hrs]')}</Text>
                                                                    </View>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <View style={{ flexDirection: "row" }}>
                                                                        <Text style={{ fontSize: 18, fontWeight: "bold", color: `${stateTheme === 'dark' ? '#fff' : '#000'}` }}>Qualifying: </Text>
                                                                        <Text style={{ fontSize: 18, color: `${stateTheme === 'dark' ? '#fff' : '#000'}` }}>{moment(`${RaceTable.Races[0].Qualifying.date} ${RaceTable.Races[0].Qualifying.time}`).format('ddd, MMM DD HH:mm [hrs]')}</Text>
                                                                    </View>
                                                                    <View style={{ flexDirection: "row" }}>
                                                                        <Text style={{ fontSize: 18, fontWeight: "bold", color: `${stateTheme === 'dark' ? '#fff' : '#000'}` }}>FP2: </Text>
                                                                        <Text style={{ fontSize: 18, color: `${stateTheme === 'dark' ? '#fff' : '#000'}` }}>{moment(`${RaceTable.Races[0].SecondPractice.date} ${RaceTable.Races[0].SecondPractice.time}`).format('ddd, MMM DD HH:mm [hrs]')}</Text>
                                                                    </View>
                                                                    <View style={{ flexDirection: "row" }}>
                                                                        <Text style={{ fontSize: 18, fontWeight: "bold", color: `${stateTheme === 'dark' ? '#fff' : '#000'}` }}>Sprint: </Text>
                                                                        <Text style={{ fontSize: 18, color: `${stateTheme === 'dark' ? '#fff' : '#000'}` }}>{moment(`${RaceTable.Races[0].Sprint?.date} ${RaceTable.Races[0].Sprint?.time}`).format('ddd, MMM DD HH:mm [hrs]')}</Text>
                                                                    </View>
                                                                </>
                                                            )
                                                        }
                                                        <View style={{ flexDirection: "row" }}>
                                                            <Text style={{ fontSize: 18, fontWeight: "bold", color: `${stateTheme === 'dark' ? '#fff' : '#000'}` }}>Race: </Text>
                                                            <Text style={{ fontSize: 18, color: `${stateTheme === 'dark' ? '#fff' : '#000'}` }}>{moment(`${RaceTable.Races[0].date} ${RaceTable.Races[0].time}`).format('ddd, MMM DD HH:mm [hrs]')}</Text>
                                                        </View>
                                                    </>

                                                ) : (
                                                    <>
                                                        {
                                                            stateResults.RaceTable?.Races[0].Results?.map((value, index) => {
                                                                if (index <= 2) {
                                                                    let icon;
                                                                    if (index === 0) {
                                                                        icon = <FontAwesomeIcon icon={fa1} size={50} style={{ color: `${stateTheme === 'dark' ? '#fff' : '#000'}` }} />;
                                                                    } else if (index === 1) {
                                                                        icon = <FontAwesomeIcon icon={fa2} size={50} style={{ color: `${stateTheme === 'dark' ? '#fff' : '#000'}` }} />;
                                                                    } else if (index === 2) {
                                                                        icon = <FontAwesomeIcon icon={fa3} size={50} style={{ color: `${stateTheme === 'dark' ? '#fff' : '#000'}` }} />;
                                                                    }
                                                                    return (
                                                                        <View key={index} style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}>
                                                                            {icon}
                                                                            <ImageDriver driver={`${value.Driver.driverId}`} size={50} margin={8} />
                                                                            <View style={{ marginHorizontal: 8 }}>
                                                                                <Text style={{ fontSize: 20, color: `${stateTheme === 'dark' ? '#fff' : '#000'}` }}>{value.Driver.givenName} {value.Driver.familyName}</Text>
                                                                                <Text style={{ fontSize: 14, color: `${stateTheme === 'dark' ? '#fff' : '#000'}` }}>{value.Driver.nationality}</Text>
                                                                            </View>
                                                                        </View>
                                                                    )
                                                                }
                                                            })
                                                        }
                                                        {
                                                            stateResults.RaceTable?.Races[0].Results?.map((value, index) => {
                                                                if (value.grid === '1') {
                                                                    return (
                                                                        <View key={index} style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}>
                                                                            <View style={{ backgroundColor: '#ee0000', borderRadius: 4, marginHorizontal: 8, padding: 5 }}>
                                                                                <FontAwesomeIcon icon={faP} size={22} style={{ color: `${stateTheme === 'dark' ? '#fff' : '#000'}` }} />
                                                                            </View>
                                                                            <ImageDriver driver={`${value.Driver.driverId}`} size={50} margin={8} />
                                                                            <View style={{ marginHorizontal: 8 }}>
                                                                                <Text style={{ fontSize: 20, color: `${stateTheme === 'dark' ? '#fff' : '#000'}` }}>{value.Driver.givenName} {value.Driver.familyName}</Text>
                                                                                <Text style={{ fontSize: 14, color: `${stateTheme === 'dark' ? '#fff' : '#000'}` }}>{value.Driver.nationality}</Text>
                                                                            </View>
                                                                        </View>
                                                                    )
                                                                }
                                                            })
                                                        }
                                                        {
                                                            stateResults.RaceTable?.Races[0].Results?.map((value, index) => {
                                                                if (value.FastestLap?.rank === '1') {
                                                                    return (
                                                                        <View key={index} style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}>
                                                                            <View style={{ backgroundColor: '#C026D3', borderRadius: 4, marginHorizontal: 8, padding: 5 }}>
                                                                                <FontAwesomeIcon icon={faClock} size={22} style={{ color: `${stateTheme === 'dark' ? '#fff' : '#000'}` }} />
                                                                            </View>
                                                                            <ImageDriver driver={`${value.Driver.driverId}`} size={50} margin={8} />
                                                                            <View style={{ marginHorizontal: 8 }}>
                                                                                <Text style={{ fontSize: 20, color: `${stateTheme === 'dark' ? '#fff' : '#000'}` }}>{value.Driver.givenName} {value.Driver.familyName}</Text>
                                                                                <Text style={{ fontSize: 14, color: `${stateTheme === 'dark' ? '#fff' : '#000'}` }}>{value.Driver.nationality}</Text>
                                                                            </View>
                                                                        </View>
                                                                    )
                                                                }
                                                            })
                                                        }
                                                    </>
                                                )
                                            }
                                            <ImageCircuit circuit={`${RaceTable.Races[0].Circuit.circuitId}`} />
                                        </ScrollView>
                                    </>
                                ) : (
                                    <>
                                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 6 }}>
                                            <FontAwesomeIcon style={{ flex: 1, color: `${stateTheme === 'dark' ? '#fff' : '#000'}` }} icon={faChevronCircleLeft} size={22} />
                                            <View style={{ flex: 1 }}></View>
                                            <FontAwesomeIcon style={{ flex: 1, color: `${stateTheme === 'dark' ? '#fff' : '#000'}` }} icon={faChevronCircleRight} size={22} />
                                        </View>
                                        <SectionLoadingTable />
                                    </>
                                )
                            }
                        </>
                    } />
                ) : (
                    <SectionLoading />
                )
            }
        </View>
    )
}