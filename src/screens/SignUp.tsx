import { VStack, Image, Center, Text, Heading, ScrollView } from "@gluestack-ui/themed";

/* o typescript nao tava entendendo o ".png" entao tive que criar um arquivo types para isso */

import backgrtoundImg from "@assets/background.png";

/* como a logo tava em svg tivemos que baixar umas dependecias o metro.config.js */

/* temos que criar um arquivo tipo para passar o novo tipo svg */

/* peguei essa documentação do site    https://github.com/kristerkari/react-native-svg-transformer */

/* agora conseguimos passar a logo */



import { useNavigation } from "@react-navigation/native";






import Logo from "@assets/logo.svg";



/* tempos que importar os componentes  de input */



import { Input } from "@components/input";


/* importando o butao */

import { Button } from "@components/Button";








export function SignUp() {

    const navigation = useNavigation();

    function handelGoback() {
        navigation.goBack();
    }   

    return (

        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>


            <VStack flex={1}>

                <Image
                    w="$full"
                    h={624}
                    source={backgrtoundImg}
                    defaultSource={backgrtoundImg}
                    alt="Pesssoas treinando"
                    position="absolute"






                />

                <VStack flex={1} px="$10" pb="$16">


                    <Center my="$24">

                        <Logo />

                        <Text color="$gray100" fontSize="$sm">

                            treine sua mente e seu corpo


                        </Text>

                    </Center>

                    <Center gap="$2" flex={1}>
                        <Heading color="$gray100" > Crie sua conta  </Heading>

                        <Input placeholder="Nome" />



                        <Input placeholder="Email" keyboardType="email-address" autoCapitalize="none" />

                        <Input placeholder="Senha" secureTextEntry autoCapitalize="none" />

                        {/* colocar o "isLoading" abaixo  para ficar carregando quando user fazer a requisicao ao banco */}

                        <Button title="Criar e Acessar" mt="$2" />

                    </Center>






                    <Button title="Voltar para login" variant="outline" mt="$12" onPress={handelGoback}/>









                </VStack>


            </VStack>
        </ScrollView>
    )
}