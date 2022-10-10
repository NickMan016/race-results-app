import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { View, Text, TouchableHighlight } from "react-native"
import Section from "../Section"

export default function Drivers() {
    return (
        <View style={{ flex: 12 }}>
            <View style={{ backgroundColor: '#ee0000', paddingVertical: 15, paddingHorizontal: 12 }}>
                <TouchableHighlight>
                    <FontAwesomeIcon icon={faArrowLeft} style={{ color: '#fff'}} size={18} />
                </TouchableHighlight>
                {/* <Text style={{ color: '#fff', fontSize: 15, textAlign: "right" }}>DRIVERS</Text> */}
            </View>
            <Section title="Drivers" content={
                <>
                    
                </>
            } />
        </View>
    )
}