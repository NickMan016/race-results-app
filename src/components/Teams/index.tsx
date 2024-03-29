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
import { ThemeContext } from "../../context/Theme/ThemeContext"

export default function Teams() {
    const navigate = useNavigate();
    const years = ["Current"];
    const [isLoad, setIsLoad] = useState(false);
    const [isLoadTable, setIsLoadTable] = useState(false);
    const { stateTheme } = useContext(ThemeContext);
    const { stateConstructors, getConstructors } = useContext(F1Context);
    const { ConstructorTable } = stateConstructors;
    const date = new Date();
    for (let index = (date.getFullYear() - 1); index >= 1950; index--) {
        years.push(index.toString());
    }

    useEffect(() => {
        const responseConstructors = getConstructors('current/constructors');

        setTimeout(() => {
            responseConstructors.then(value => {
                setIsLoad(value)
                setIsLoadTable(value)
            })
        }, 2000);
    }, [])

    const handleChangeSelect = (season: string) => {
        const responseConstructors = getConstructors(`${season.toLocaleLowerCase()}/constructors`);

        setTimeout(() => {
            responseConstructors.then(value => {
                setIsLoadTable(value)
            })
        }, 2000);
    }

    const backHome = () => {
        navigate('/')
    }

    return (
        <View style={{ flex: 12, backgroundColor: `${stateTheme === 'dark' ? '#111827' : '#fff'}` }} >
            <View style={{ backgroundColor: '#ee0000', paddingVertical: 24 }}></View>
            {
                isLoad ? (
                    <Section title="Teams" content={
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
                                buttonStyle={{ borderColor: '#9CA3AF', borderWidth: 3, backgroundColor: `${stateTheme === 'dark' ? '#111827' : '#fff'}`, width: '100%', borderRadius: 5, marginTop: 4, marginBottom: 4, paddingHorizontal: 12 }}
                                buttonTextStyle={{ color: `${stateTheme === 'dark' ? '#fff' : '#000'}` }}
                                dropdownStyle={{ backgroundColor: `${stateTheme === 'dark' ? '#111827' : '#fff'}` }}
                                rowTextStyle={{ color: `${stateTheme === 'dark' ? '#fff' : '#000'}` }}
                            />
                            {
                                isLoadTable ? (
                                    <TableData
                                        height='75%'
                                        tBody={
                                            <>
                                                {
                                                    ConstructorTable.Constructors.map((value, index) => (
                                                        <View key={index} style={{ flexDirection: "row", alignItems: "center", borderBottomWidth: .75, paddingVertical: 4, borderBottomColor: `${stateTheme === 'dark' ? '#fff' : '#000'}` }}>
                                                            <View style={{ flex: .5 }}></View>
                                                            <View style={{ flex: 4 }}>
                                                                <Text style={{ fontSize: 16, color: `${stateTheme === 'dark' ? '#fff' : '#000'}` }}>{value.name}</Text>
                                                                <Text style={{ fontSize: 12, color: `${stateTheme === 'dark' ? '#fff' : '#000'}` }}>{value.nationality}</Text>
                                                            </View>
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