import { VStack, Image, Center, Text, Heading, ScrollView } from "@gluestack-ui/themed";

/* o typescript nao tava entendendo o ".png" entao tive que criar um arquivo types para isso */

import backgrtoundImg from "@assets/background.png";
import logotkoImg from "@assets/logotko.png";

/* como a logo tava em svg tivemos que baixar umas dependecias o metro.config.js */

/* temos que criar um arquivo tipo para passar o novo tipo svg */

/* peguei essa documentação do site    https://github.com/kristerkari/react-native-svg-transformer */

/* agora conseguimos passar a logo */


import { useNavigation } from "@react-navigation/native";

import { AuthNavigatorRoutesProps } from "@routes/auth.routes";





/* tempos que importar os componentes  de input */



import { Input } from "@components/input";


/* importando o butao */

import { Button } from "@components/Button";
import { Routes } from "@routes/index";









export function Signin() {
    const navigation = useNavigation<AuthNavigatorRoutesProps>();


    function handleNewAccount() {
        navigation.navigate("SignUp");
    }

    return (

        <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#FFF' }} showsVerticalScrollIndicator={false}>


        <VStack flex={1} >

            {/* <Image
                w="$full"
                h={624}
                source={backgrtoundImg}
                defaultSource={backgrtoundImg}
                alt="Pesssoas treinando"
                position="absolute"
            /> */}

            <VStack flex={1} px="$10" pb="$16" bg="#FFF">


                <Center my="$24">

                    <Image
                        source={logotkoImg}
                        alt="Logo TKO"
                        style={{ width: 120, height: 120, marginBottom: 16 }}
                    />

                    <Text color="#888" fontSize="$sm">
                        treine sua mente e seu corpo
                    </Text>

                </Center>

                <Center gap="$2">
                    <Heading color="#222" >
                        Acesse sua conta
                    </Heading>

                    <Input placeholder="E-mail" keyboardType="email-address" autoCapitalize="none" style={{ backgroundColor: '#FFF', borderColor: '#DDD' }} placeholderTextColor="#888" />
                    <Input placeholder="Senha" secureTextEntry autoCapitalize="none" style={{ backgroundColor: '#FFF', borderColor: '#DDD', }} placeholderTextColor="#888" />

                    {/* colocar o "isLoading" abaixo  para ficar carregando quando user fazer a requisicao ao banco */}

                    <Button title="Entrar" style={{ backgroundColor: '#FF9100', shadowColor: '#FF9100', shadowOpacity: 0.2, shadowRadius: 8, shadowOffset: { width: 0, height: 4 } }} variant="solid" />

                </Center>

                <Center flex={1} justifyContent="flex-end" mt="$4">
                    <Text color="#888" fontSize="$sm" mb ="$3" fontFamily="body">Ainda não possui uma conta? <Text style={{ color: '#FF9100', textDecorationLine: 'underline' }}>Conecte-se</Text></Text>
                    <Button title="Criar conta" variant="outline" onPress={handleNewAccount} style={{ borderColor: '#FF9100' }} />
                </Center>



            </VStack>


        </VStack>
        </ScrollView>
    )
}