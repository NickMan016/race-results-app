import { View, TouchableHighlight, StyleSheet } from "react-native";
import { useNavigate } from "react-router-native";
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Section from "../Section";
import { useContext, useState } from "react";
import { ThemeContext } from "../../context/Theme/ThemeContext";


export default function Theme() {

    const { stateTheme, setTheme } = useContext(ThemeContext);

    const styles = StyleSheet.create({
        container_radio: {
            paddingTop: 8,
            alignItems: "flex-start"
        },
        radio: {
            fontSize: 22,
            color: `${stateTheme === 'dark' ? '#fff' : '#000'}`,
        }
    })
    
    const [radioButtons, setRadioButtons] = useState<RadioButtonProps[]>([
        {
            id: '1',
            label: 'Light',
            value: 'light',
            labelStyle: styles.radio,
            color: `${stateTheme === 'dark' ? '#fff' : '#000'}`,
            selected: stateTheme === 'dark' ? false : true
        },
        {
            id: '2',
            label: 'Dark',
            value: 'dark',
            labelStyle: styles.radio,
            color: `${stateTheme === 'dark' ? '#fff' : '#000'}`,
            selected: stateTheme === 'dark' ? true : false
        }
    ]);
    

    const navigate = useNavigate();

    const backHome = () => {
        navigate('/')
    }

    const handleChangeMode = (radioButtonsArray: RadioButtonProps[]) => {
        const radioSelected = radioButtonsArray.find(element => element.selected)
        setTheme(radioSelected?.value || '');
        const radioButtonsArrayUpdate: RadioButtonProps[] = [];
        radioButtons.map(element => {
            element.color = `${radioSelected?.value === 'dark' ? '#fff' : '#000'}`
            element.labelStyle = {
                fontSize: 22,
                color: `${radioSelected?.value === 'dark' ? '#fff' : '#000'}`,
            }
            radioButtonsArrayUpdate.push(element);
        })
        setRadioButtons(radioButtonsArrayUpdate);
    }

    return (
        <View style={{ flex: 12, backgroundColor: `${stateTheme === 'dark' ? '#111827' : '#fff'}` }}>
            <View style={{ backgroundColor: '#ee0000', paddingVertical: 24 }}></View>
            <Section title="Theme" content={
                <>
                    <RadioGroup
                        radioButtons={radioButtons}
                        onPress={handleChangeMode}
                        containerStyle={styles.container_radio}
                    />
                </>
            } />
        </View>
    )
}