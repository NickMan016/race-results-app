import { View, Text, TouchableHighlight, Appearance, StyleSheet, ColorSchemeName, useColorScheme } from "react-native";
import { useNavigate } from "react-router-native";
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import { faArrowLeft, faCircle } from "@fortawesome/free-solid-svg-icons";
import { faCircle as faCircleBorder } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Section from "../Section";
import { useState } from "react";


export default function Theme() {

    const styles = StyleSheet.create({
        container_radio: {
            paddingTop: 8,
            alignItems: "flex-start"
        },
        radio: {
            fontSize: 22
        }
    })
    let colorScheme: ColorSchemeName = useColorScheme();
    const [radioButtons, setRadioButtons] = useState<RadioButtonProps[]>([
        {
            id: '1',
            label: 'Light',
            value: 'light',
            labelStyle: styles.radio,
            selected: colorScheme === 'dark' ? false : true
        },
        {
            id: '2',
            label: 'Dark',
            value: 'dark',
            labelStyle: styles.radio,
            selected: colorScheme === 'dark' ? true : false
        }
    ]);

    const navigate = useNavigate();

    const backHome = () => {
        navigate('/')
    }

    const handleChangeMode = (radioButtonsArray: RadioButtonProps[]) => {
        const radioSelected = radioButtonsArray.find(element => element.selected)
        setRadioButtons(radioButtonsArray);
        console.log(radioSelected?.value, colorScheme);
        // colorScheme = colorScheme !== radioSelected?.value ? radioSelected?.value : colorScheme;
        

        // Appearance.addChangeListener(({
        //     colorScheme: newColorScheme,
        // }: {
        //     colorScheme: ColorSchemeName;
        // }) => { 
        //     console.log('Cambio');
            
        // });
    }

    return (
        <View style={{ flex: 12 }}>
            <View style={{ backgroundColor: '#ee0000' }}>
                <TouchableHighlight onPress={backHome} style={{ width: 18, paddingVertical: 15, paddingHorizontal: 12 }} activeOpacity={1} underlayColor="#ee0000">
                    <FontAwesomeIcon icon={faArrowLeft} style={{ color: '#fff' }} size={18} />
                </TouchableHighlight>
            </View>
            <Section title="Theme" content={
                <>
                    <RadioGroup
                        radioButtons={radioButtons}
                        onPress={handleChangeMode}
                        containerStyle={styles.container_radio}
                    />
                    {/* <TouchableHighlight onPress={handleChangeMode} style={{ paddingTop: 12 }} activeOpacity={1} underlayColor="#ee0000">
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <FontAwesomeIcon icon={faCircle} style={{ color: '#000' }} size={22} />
                            <Text style={{ paddingLeft: 10, fontSize: 22 }}>Light</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={handleChangeMode} style={{ paddingTop: 12 }} activeOpacity={1} underlayColor="#ee0000">
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <FontAwesomeIcon icon={faCircleBorder} style={{ color: '#000' }} size={22} />
                            <Text style={{ paddingLeft: 10, fontSize: 22 }}>Dark</Text>
                        </View>
                    </TouchableHighlight> */}
                </>
            } />
        </View>
    )
}