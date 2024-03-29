import { NativeRouter, Routes, Route } from "react-router-native";
import Drivers from "../components/Drivers";
import Home from "../components/Home";
import Menu from "../components/Menu";
import Schedule from "../components/Schedule";
import Teams from "../components/Teams";
import Theme from "../components/Theme";

export default function Router() {
    return (
        <NativeRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/drivers" element={<Drivers />} />
                <Route path="/teams" element={<Teams />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/theme" element={<Theme />} />
            </Routes>
            <Menu />
        </NativeRouter>
    )
}