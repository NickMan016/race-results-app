import { createContext } from "react";

export type ThemeContextProps = {
    stateTheme: string,
    getTheme: () => void,
    setTheme: ( theme: string ) => void
}

export const ThemeContext = createContext<ThemeContextProps>({} as ThemeContextProps);