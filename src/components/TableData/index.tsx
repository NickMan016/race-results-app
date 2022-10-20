import { View, ScrollView } from "react-native"

interface PropsTableData {
    tBody: JSX.Element
    height: number | string
}

export default function TableData({ tBody, height }: PropsTableData) {
    return (
        <>

            <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 3, backgroundColor: '#ee0000', borderTopStartRadius: 3, borderTopEndRadius: 3, marginTop: 8 }}></View>
            <ScrollView style={{ height: height }} nestedScrollEnabled={true}>
                {tBody}
            </ScrollView>
            <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 1, backgroundColor: '#ee0000', borderBottomStartRadius: 2, borderBottomEndRadius: 2 }}></View>
        </>
    )
}