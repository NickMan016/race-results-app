import { useWindowDimensions, View } from "react-native";
import { useContext, useState } from 'react';
import { SceneMap, TabView, TabBar } from 'react-native-tab-view';
import Standings from "./components/Standings";
import Results from "./components/Results";
import SectionFinishSeason from "./components/SectionFinishSeason";
import { ThemeContext } from "../../context/Theme/ThemeContext";

const renderScene = SceneMap({
    first: Results,
    second: Standings,
});

export default function Home() {
    const layout = useWindowDimensions();
    const { stateTheme } = useContext(ThemeContext);
    const [showSectionFinishSeason, setShowSectionFinishSeason] = useState(true);

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
            <View style={{
                flex: 12,
                backgroundColor: `${stateTheme === 'dark' ? '#111827' : '#fff'}`
            }}>
                {
                    showSectionFinishSeason ? (
                        <SectionFinishSeason showSectionFinishSeason={setShowSectionFinishSeason} />
                    ) : (
                        <TabView
                            navigationState={{ index, routes }}
                            renderTabBar={renderTabBar}
                            renderScene={renderScene}
                            onIndexChange={setIndex}
                            initialLayout={{ width: layout.width }}
                        />
                    )
                }
            </View>
        </>
    )
}