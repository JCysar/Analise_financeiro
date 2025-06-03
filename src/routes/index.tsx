import {NavigationContainer, DefaultTheme} from '@react-navigation/native';

import { AuthRoutes } from './auth.routes';


import { gluestackUIConfig } from  "../../config/gluestack-ui.config";

import { Box } from '@gluestack-ui/themed';

import { AppRoutes } from './app.routes';



export function Routes() {


  /* deixar a cor padrao de toda a aplicacao das rotas signIn e signUp */

  const theme = DefaultTheme;
  theme.colors.background = gluestackUIConfig.tokens.colors.gray700;

  return (

    /* esse box previne gliches quando a pagina carregar e nao ficar completamente branca */

    <Box flex ={1} bg="$gray700">


{/* caso eu queira autenticação antes passo abaixo inves de AppRoutes passo <AuthRoutes /> */}

    <NavigationContainer theme ={theme}>
      

       <AppRoutes /> 
{/*    <AuthRoutes/>   */}


    </NavigationContainer>



    </Box>
  );
}