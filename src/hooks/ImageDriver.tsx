import { Image } from "react-native";

interface PropsImageDriver {
    driver: string
    size: number,
    margin: number
}

export default function ImageDriver({ driver, size, margin }: PropsImageDriver) {
    const drivers:any = {
        'albon': require('./../../assets/drivers/albon.png'),
        'alonso': require('./../../assets/drivers/alonso.png'),
        'bottas': require('./../../assets/drivers/bottas.png'),
        'de_vries': require('./../../assets/drivers/de_vries.png'),
        'gasly': require('./../../assets/drivers/gasly.png'),
        'hamilton': require('./../../assets/drivers/hamilton.png'),
        'hulkenberg': require('./../../assets/drivers/hulkenberg.png'),
        'kevin_magnussen': require('./../../assets/drivers/kevin_magnussen.png'),
        'latifi': require('./../../assets/drivers/latifi.png'),
        'leclerc': require('./../../assets/drivers/leclerc.png'),
        'max_verstappen': require('./../../assets/drivers/max_verstappen.png'),
        'mick_schumacher': require('./../../assets/drivers/mick_schumacher.png'),
        'norris': require('./../../assets/drivers/norris.png'),
        'ocon': require('./../../assets/drivers/ocon.png'),
        'perez': require('./../../assets/drivers/perez.png'),
        'ricciardo': require('./../../assets/drivers/ricciardo.png'),
        'russell': require('./../../assets/drivers/russell.png'),
        'sainz': require('./../../assets/drivers/sainz.png'),
        'stroll': require('./../../assets/drivers/stroll.png'),
        'tsunoda': require('./../../assets/drivers/tsunoda.png'),
        'vettel': require('./../../assets/drivers/vettel.png'),
        'zhou': require('./../../assets/drivers/zhou.png'),
    }
    
    return (
        <Image
            style={{ width: size, height: size, borderRadius: 25, marginHorizontal: margin }}
            source={drivers[driver]}
        />
    )
}