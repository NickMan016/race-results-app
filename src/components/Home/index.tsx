import { useWindowDimensions, StyleSheet, View } from "react-native";
import { useState } from 'react';
import { SceneMap, TabView, TabBar } from 'react-native-tab-view';
import Standings from "./components/Standings";
import Results from "./components/Results";
import Menu from "../Menu";

const renderScene = SceneMap({
    first: Results,
    second: Standings,
});

export default function Home() {
    const layout = useWindowDimensions();

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'Results' },
        { key: 'second', title: 'Standings' },
    ]);

    const renderTabBar = (props: any) => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'white' }}
            style={{ backgroundColor: '#ee0000' }}
        />
    );

    return (
        <>
            <View style={{ flex: 12 }}>
                <TabView
                    navigationState={{ index, routes }}
                    renderTabBar={renderTabBar}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{ width: layout.width }}
                />
            </View>
            <Menu />
        </>
    )
}