import { Image } from "react-native";

interface PropsImageCircuit {
    circuit: string
}

export default function ImageCircuit({ circuit }: PropsImageCircuit) {
    const circuits:any = {
        'albert_park': require('./../../assets/circuits/albert_park.png'),
        'americas': require('./../../assets/circuits/americas.png'),
        'bahrain': require('./../../assets/circuits/bahrain.png'),
        'baku': require('./../../assets/circuits/baku.png'),
        'catalunya': require('./../../assets/circuits/catalunya.png'),
        'hungaroring': require('./../../assets/circuits/hungaroring.png'),
        'imola': require('./../../assets/circuits/imola.png'),
        'interlagos': require('./../../assets/circuits/interlagos.png'),
        'jeddah': require('./../../assets/circuits/jeddah.png'),
        'losail': require('./../../assets/circuits/losail.png'),
        'marina_bay': require('./../../assets/circuits/marina_bay.png'),
        'miami': require('./../../assets/circuits/miami.png'),
        'monaco': require('./../../assets/circuits/monaco.png'),
        'monza': require('./../../assets/circuits/monza.png'),
        'red_bull_ring': require('./../../assets/circuits/red_bull_ring.png'),
        'ricard': require('./../../assets/circuits/ricard.png'),
        'rodriguez': require('./../../assets/circuits/rodriguez.png'),
        'silverstone': require('./../../assets/circuits/silverstone.png'),
        'spa': require('./../../assets/circuits/spa.png'),
        'suzuka': require('./../../assets/circuits/suzuka.png'),
        'vegas': require('./../../assets/circuits/vegas.png'),
        'villeneuve': require('./../../assets/circuits/villeneuve.png'),
        'yas_marina': require('./../../assets/circuits/yas_marina.png'),
        'zandvoort': require('./../../assets/circuits/zandvoort.png'),
    }
    
    return (
        <Image
            style={{ width: '100%', height: 200, resizeMode: "center", marginTop: 20 }}
            source={circuits[circuit]}
        />
    )
}