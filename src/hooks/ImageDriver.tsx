import { Image } from "react-native";

interface PropsImageDriver {
    driver: string
    size: number,
    margin: number
}

export default function ImageDriver({ driver, size, margin }: PropsImageDriver) {
    
    return (
        <Image
            style={{ width: size, height: size, borderRadius: (size / 2), marginHorizontal: margin }}
            source={{uri: `https://race-results-images.up.railway.app/api/drivers/${driver}/image`}}
            onError={(error) => console.error(error)}
        />
    )
}