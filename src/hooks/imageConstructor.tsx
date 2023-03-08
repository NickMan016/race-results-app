import { Image } from "react-native";

interface PropsImageConstructor {
    constructor: string
}

export default function ImageConstructor({ constructor }: PropsImageConstructor) {
    const constructors:any = {
        'red_bull': require('./../../assets/constructors/red_bull.png'),
    }
    
    return (
        <Image
            style={{ width: '80%', height: 100, resizeMode: "center" }}
            source={constructors[constructor]}
        />
    )
}