import { BackgroundImage, MantineColorsTuple, MantinePrimaryShade, MantineProvider } from '@mantine/core';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import React, { useEffect, useState } from "react";
import { useSettings } from '../stores/settings';
import theme from '../theme';
import { fetchNui } from '../utils/fetchNui';
import { isEnvBrowser } from '../utils/misc';
import "./App.css";
import Main from './Main/main';

const App: React.FC = () => {
  const [curTheme, setCurTheme] = useState(theme);
  const primaryColor = useSettings(state => state.primaryColor);
  const primaryShade = useSettings(state => state.primaryShade);
  const customTheme = useSettings(state => state.customTheme);
  // Ensure the theme is updated when the settings change
  useEffect(() => {
    const updatedTheme = {
      ...theme, // Start with the existing theme object
      colors: {
        ...theme.colors, // Copy the existing colors
        custom: customTheme
      },
    };
    
    setCurTheme(updatedTheme);

    // set primary color
    setCurTheme({
      ...updatedTheme,
      primaryColor: primaryColor,
      primaryShade: primaryShade,
    });

  }, [primaryColor, primaryShade, customTheme]);

  
  useEffect(() => {
    if (!isEnvBrowser()) {
      fetchNui<{
        primaryColor: string;
        primaryShade: MantinePrimaryShade;
        customTheme: MantineColorsTuple;
      }>('GET_SETTINGS')
        .then((data) => {
          // Ensure data is of type SettingsProps
          if (data.primaryColor && data.primaryShade && data.customTheme) {
            setCurTheme({
              ...curTheme,
              primaryColor: data.primaryColor,
              primaryShade: data.primaryShade,
              colors: {
                ...curTheme.colors,
                custom: data.customTheme
              }
            });
          } else {
            console.error('SettingsProvider: Invalid settings data received from NUI:', data);
          }
        }) 
        .catch((error) => {
          console.error('Failed to fetch settings:', error);
        });
    } else {
      console.warn('SettingsProvider: Not fetching settings from NUI');
    }
  }, []);

  return (
        
    <MantineProvider theme={curTheme} defaultColorScheme='dark'>
      <Wrapper>
        <Main />
      </Wrapper>
    </MantineProvider>
  );
};

export default App;



function Wrapper({ children }: { children: React.ReactNode }) {
  return isEnvBrowser() ? ( 
    <BackgroundImage w='100vw' h='100vh' style={{overflow:'hidden'}}
      src="https://i.ytimg.com/vi/TOxuNbXrO28/maxresdefault.jpg"
    >  
      {children}
    </BackgroundImage>
  ) : (
    <>{children}</>
  )
}