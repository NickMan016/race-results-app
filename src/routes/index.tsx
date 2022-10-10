import { Text, View } from "react-native"
import { NativeRouter, Routes, Route } from "react-router-native";
import Drivers from "../components/Drivers";
import Home from "../components/Home";

export default function Router() {
    return (
        <NativeRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/drivers" element={<Drivers />} />
                <Route path="/teams" element={
                    <View style={{flex: 12}}>
                        <Text>teams</Text>
                    </View>
                } />
                <Route path="/schedule" element={
                    <View style={{flex: 12}}>
                        <Text>schedule</Text>
                    </View>
                } />
            </Routes>
        </NativeRouter>
    )
}