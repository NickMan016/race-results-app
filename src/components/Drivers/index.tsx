import { View, Text, TouchableHighlight } from "react-native"
import { useNavigate } from "react-router-native"
import { useContext, useEffect, useState } from "react"
import { F1Context } from "../../context/F1DB/F1Context"
import { faArrowLeft, faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import SelectDropdown from "react-native-select-dropdown"
import Section from "../Section"
import TableData from "../TableData"
import SectionLoadingTable from "../Section/components/SectionLoadingTable"
import SectionLoading from "../Section/components/SectionLoading"

export default function Drivers() {
    const navigate = useNavigate();
    const years = ["Current"];
    const [isLoad, setIsLoad] = useState(false);
    const [isLoadTable, setIsLoadTable] = useState(false);
    const { stateDrivers, getDrivers } = useContext(F1Context);
    const { DriverTable } = stateDrivers;
    const date = new Date();
    for (let index = (date.getFullYear() - 1); index >= 1950; index--) {
        years.push(index.toString());
    }

    useEffect(() => {
        const responseDrivers = getDrivers('current/drivers');

        setTimeout(() => {
            responseDrivers.then(value => {
                setIsLoad(value)
                setIsLoadTable(value)
            })
        }, 2000);
    }, [])

    const handleChangeSelect = (season: string) => {
        const responseDrivers = getDrivers(`${season.toLocaleLowerCase()}/drivers`);

        setTimeout(() => {
            responseDrivers.then(value => {
                setIsLoadTable(value)
            })
        }, 2000);
    }

    const backHome = () => {
        navigate('/')
    }

    return (
        <View style={{ flex: 12 }} >
            <View style={{ backgroundColor: '#ee0000' }}>
                <TouchableHighlight onPress={backHome} style={{ width: 18, paddingVertical: 15, paddingHorizontal: 12 }} activeOpacity={1} underlayColor="#ee0000">
                    <FontAwesomeIcon icon={faArrowLeft} style={{ color: '#fff' }} size={18} />
                </TouchableHighlight>
            </View>
            {
                isLoad ? (
                    <Section title="Drivers" content={
                        <>
                            <SelectDropdown
                                data={years}
                                onSelect={(selectedItem, index) => {
                                    setIsLoadTable(false)
                                    handleChangeSelect(selectedItem)
                                }}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem
                                }}
                                rowTextForSelection={(item, index) => {
                                    return item
                                }}
                                renderDropdownIcon={() => (
                                    <FontAwesomeIcon icon={faChevronDown} />
                                )}
                                defaultButtonText="Select An Option"
                                defaultValueByIndex={0}
                                buttonStyle={{ borderColor: '#9CA3AF', borderWidth: 3, backgroundColor: '#ffffff', width: '100%', borderRadius: 5, marginTop: 4, marginBottom: 4, paddingHorizontal: 12 }}
                            />
                            {
                                isLoadTable ? (
                                    <TableData
                                        height='75%'
                                        tBody={
                                            <>
                                                {
                                                    DriverTable.Drivers.map((value, index) => (
                                                        <View key={index} style={{ flexDirection: "row", alignItems: "center", borderBottomWidth: .75, borderBottomColor: '#000', paddingVertical: 4 }}>
                                                            <View style={{ flex: .5 }}></View>
                                                            <View style={{ flex: 4 }}>
                                                                <Text style={{ fontSize: 16 }}>{`${value.givenName} ${value.familyName}`}</Text>
                                                                <Text style={{ fontSize: 12 }}>{value.nationality}</Text>
                                                            </View>
                                                            <View style={{ flex: 4 }}><Text style={{ fontSize: 16 }}>{value.permanentNumber || 'Not Number'}</Text></View>
                                                        </View>
                                                    ))
                                                }
                                            </>
                                        }
                                    />
                                ) : (
                                    <SectionLoadingTable />
                                )
                            }
                        </>
                    } />
                ) : (
                    <SectionLoading />
                )
            }
        </View >
    )
}