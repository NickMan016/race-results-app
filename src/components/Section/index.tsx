import { Text, View } from "react-native"
import { ThemeContext } from "../../context/Theme/ThemeContext";
import { useContext } from "react";


interface PropsSection {
    title: string
    content: JSX.Element
}

export default function Section({ title, content }: PropsSection) {
    const { stateTheme } = useContext(ThemeContext);


    return (
        <View style={{ paddingHorizontal: 12, paddingVertical: 8 }}>
            <Text style={{ fontWeight: "bold", fontSize: 28, color: `${stateTheme === 'dark' ? '#fff' : '#000'}` }}>{title}</Text>
            {content}
        </View>
    )
}