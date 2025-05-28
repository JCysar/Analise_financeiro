
import {  StatusBar } from 'react-native';

import {
  useFonts,
  Roboto_700Bold,
  Roboto_400Regular

} from "@expo-google-fonts/roboto";

/* aqui sao algumas rotas usadas para poder usar os compontentes */


import { GluestackUIProvider } from '@gluestack-ui/themed'

import { config } from "./config/gluestack-ui.config";

import {Routes } from "./src/routes";

import { Loading } from '@components/Loading';





export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_700Bold, Roboto_400Regular });

  return (
    <GluestackUIProvider config={config}>



      <StatusBar
        barStyle={"light-content"}
        backgroundColor="transparent"
        translucent={true}

      />


      {fontsLoaded ?
        <Routes />
        :
        <Loading />
      }
    </GluestackUIProvider>
  )
}