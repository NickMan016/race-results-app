import { StatusBar } from 'expo-status-bar';
import { F1Provider } from './src/context/F1DB/F1Provider';
import { CountriesProvider } from './src/context/CountriesDB/CountriesProvider';
import Router from './src/routes';
import { Appearance, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container_light: {
        flex: 1,
        backgroundColor: '#fff'
    },
    container_dark: {
        flex: 1,
        backgroundColor: '#111827'
    }
})

export default function App() {

    const colorScheme = Appearance.getColorScheme();

    return (
        <CountriesProvider>
            <F1Provider>
                <StatusBar
                    animated={true}
                    backgroundColor="#c40000"
                    translucent={false}
                    style='light'
                />
                <View style={colorScheme === 'dark' ? styles.container_dark : styles.container_light}>
                    <Router />
                </View>
            </F1Provider>
        </CountriesProvider>
    );
}
