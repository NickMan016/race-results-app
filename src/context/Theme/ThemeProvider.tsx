import { useState } from "react"
import { ThemeContext } from "./ThemeContext"
import { getCachedData, setCachedData } from "../../hooks/cache"


interface ProviderProps {
    children: JSX.Element | JSX.Element[]
}

export const ThemeProvider = ({ children }: ProviderProps) => {

    const [stateTheme, setStateTheme] = useState('');
    
    const getTheme = async () => {
        getCachedData('theme').then(data => {
            setStateTheme(data);
        });
    }
    
    const setTheme = async ( theme: string ) => {
        setCachedData('theme', theme).then(data => {
            setStateTheme(theme);
        })
    }

    return (
        <ThemeContext.Provider value={{
            stateTheme,
            getTheme,
            setTheme
        }}>
            {children}
        </ThemeContext.Provider>
    )
}