import { BackgroundImage, MantineProvider } from '@mantine/core';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import React, { useEffect, useState } from "react";
import { localeStore } from '../stores/locales';
import { useSettings } from '../stores/settings';
import theme from '../theme';
import { isEnvBrowser } from '../utils/misc';
import "./App.css";
import Main from './Main/main';
import Sequences from './Pages/Sequences/main';


const App: React.FC = () => {
  const [curTheme, setCurTheme] = useState(theme);
  const primaryColor = useSettings((data) => data.primaryColor);
  const primaryShade = useSettings((data) => data.primaryShade);
  const customTheme = useSettings((data) => data.customTheme);
  const fetchSettings = useSettings((state) => state.fetchSettings);
  const fetchLocales  = localeStore((state) => state.fetchLocales);
  
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
    fetchSettings();
    fetchLocales();
  }, [fetchSettings, fetchLocales]);

  return (
        
    <MantineProvider theme={curTheme} defaultColorScheme='dark'>
      <Wrapper>
        <Main />
        <Sequences />
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