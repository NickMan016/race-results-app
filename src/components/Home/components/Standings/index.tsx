import { ScrollView, View } from "react-native";
import SectionConstructorStanding from "./components/SectionConstructorStanding";
import SectionDriverStanding from "./components/SectionDriverStanding";


export default function Standings() {
    return (
        <ScrollView>
            <View>
                <SectionDriverStanding />
            </View>
            <View style={{marginTop: 12}}>
                <SectionConstructorStanding />
            </View>
        </ScrollView>
    )
}