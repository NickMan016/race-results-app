import { createContext, Dispatch, SetStateAction } from "react";
import { Country } from "../../interfaces/CountriesInterfaces";
import { DriverStanding, MRData } from "../../interfaces/F1Interfaces";

export type F1ContextProps = {
    stateResults: MRData,
    stateQualifying: MRData,
    stateSprint: MRData,
    stateRace: MRData,
    stateDriverStanding: MRData,
    stateConstructorStanding: MRData,
    stateConstructors: MRData,
    stateDrivers: MRData,
    stateSchedule: MRData,
    stateInfoDriverChampion: DriverStanding,
    getResults: ( query: string, setCountry: Dispatch<SetStateAction<Country>> ) => Promise<boolean>,
    getQualifying: ( query: string, setCountry: Dispatch<SetStateAction<Country>> ) => Promise<boolean>,
    getSprint: ( query: string, setCountry: Dispatch<SetStateAction<Country>> ) => Promise<boolean>,
    getRace: ( query: string, setCountry: Dispatch<SetStateAction<Country>> ) => Promise<boolean>,
    getRaceWithResults: ( query: string, setCountry: Dispatch<SetStateAction<Country>> ) => Promise<boolean>,
    getDriverStanding: ( query: string ) => Promise<boolean>,
    getConstructorStanding: ( query: string ) => Promise<boolean>,
    getConstructors: ( query: string ) => Promise<boolean>,
    getDrivers: ( query: string ) => Promise<boolean>,
    getSchedule: ( query: string ) => Promise<boolean>,
    getInfoDriverChampion: () => Promise<boolean>,
}

export const F1Context = createContext<F1ContextProps>({} as F1ContextProps);