import { View, Image, ActivityIndicator } from "react-native"

export default function SectionLoadingTable() {
    return (
        <View style={{ justifyContent: "center", alignItems: "center", height: 500 }}>
            <Image
                style={{ width: 70, height: 70, resizeMode: "center", marginBottom: 14 }}
                source={require('./../../../../../assets/Race_Results_Logo_Icon.png')}
            />
            <ActivityIndicator size="large" color='#ee0000' />
        </View>
    )
} 