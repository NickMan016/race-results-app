import { StatusBar } from 'expo-status-bar';
import { F1Provider } from './src/context/F1DB/F1Provider';
import { CountriesProvider } from './src/context/CountriesDB/CountriesProvider';
import Router from './src/routes';

export default function App() {

    return (
        <CountriesProvider>
            <F1Provider>
                <StatusBar
                    animated={true}
                    backgroundColor="#c40000"
                    translucent={false}
                    style='light'
                />
                <Router />
            </F1Provider>
        </CountriesProvider>
    );
}
