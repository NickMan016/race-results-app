import { StatusBar } from 'expo-status-bar';
import { F1Provider } from './src/context/F1DB/F1Provider';
import { CountriesProvider } from './src/context/CountriesDB/CountriesProvider';
import { ThemeProvider } from './src/context/Theme/ThemeProvider';
import Router from './src/routes';
import { View, StyleSheet } from 'react-native';
import { getCachedData } from './src/hooks/cache';
import { useContext, useEffect } from 'react';
import { ThemeContext } from './src/context/Theme/ThemeContext';

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

    const { stateTheme, setTheme } = useContext(ThemeContext);
    getCachedData('theme').then(data => {
        if (data === null) {
            setTheme('light')
        }
    })

    return (
        <CountriesProvider>
            <F1Provider>
                <ThemeProvider>
                    <StatusBar
                        animated={true}
                        backgroundColor="#c40000"
                        translucent={false}
                        style='light'
                    />
                    <View style={stateTheme === 'dark' ? styles.container_dark : styles.container_light}>
                        <Router />
                    </View>
                </ThemeProvider>
            </F1Provider>
        </CountriesProvider>
    );
}
