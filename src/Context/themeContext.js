import React,{ createContext } from 'react';
import { useColorScheme } from 'react-native';

export const ThemeContext = createContext();
export const ThemeProvider = ({ children }) => {
    
    const scheme = useColorScheme();
    let textColor = scheme === 'dark' ? 'white' : '#2d333a';
    let back = scheme === 'dark' ? '#2c2e3b' : 'white';
   
    return (
        <ThemeContext.Provider value={{ back ,textColor}}>
            {children}
        </ThemeContext.Provider>

    )
};
