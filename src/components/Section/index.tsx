import { Text, View } from "react-native"


interface PropsSection {
    title: string
    content: JSX.Element
}

export default function Section({ title, content }: PropsSection) {
    return (
        <View style={{paddingHorizontal: 12, paddingVertical: 8}}>
            <Text style={{ fontWeight: "bold", fontSize: 28 }}>{title}</Text>
            {content}
        </View>
    )
}