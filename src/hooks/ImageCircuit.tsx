import { Image } from "react-native";

interface PropsImageCircuit {
    circuit: string
}

export default function ImageCircuit({ circuit }: PropsImageCircuit) {
    return (
        <Image
            style={{ width: '100%', height: 200, resizeMode: "center", marginTop: 20 }}
            source={{ uri: `https://race-results-images.up.railway.app/api/circuits/${circuit}/image` }}
        />
    )
}