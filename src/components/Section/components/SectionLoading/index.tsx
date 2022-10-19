import { View, Image, ActivityIndicator } from "react-native"

export default function SectionLoading() {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Image
                style={{ width: 70, height: 70, resizeMode: "center", marginBottom: 14 }}
                source={require('./../../../../../assets/Race_Results_Logo_Icon.png')}
            />
            <ActivityIndicator size="large" color='#ee0000' />
        </View>
    )
} 