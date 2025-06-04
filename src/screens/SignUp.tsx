import { VStack, Image, Center, Text, Heading, ScrollView } from "@gluestack-ui/themed";

/* o typescript nao tava entendendo o ".png" entao tive que criar um arquivo types para isso */

import backgrtoundImg from "@assets/background.png";

/* como a logo tava em svg tivemos que baixar umas dependecias o metro.config.js */

/* temos que criar um arquivo tipo para passar o novo tipo svg */

/* peguei essa documentação do site    https://github.com/kristerkari/react-native-svg-transformer */

/* agora conseguimos passar a logo */



import { useNavigation } from "@react-navigation/native";






import Logo from "@assets/logotko.png";



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

        <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#FFF' }} showsVerticalScrollIndicator={false}>


            <VStack flex={1}>

                <Image
                    w="$full"
                    h={624}
                    source={backgrtoundImg}
                    defaultSource={backgrtoundImg}
                    alt="Pesssoas treinando"
                    position="absolute"






                />

                <VStack flex={1} px="$10" pb="$16" bg="#FFF">


                    <Center my="$24">

                        <Image source={Logo} alt="Logo" />

                        <Text color="#888" fontSize="$sm">

                          


                        </Text>

                    </Center>

                    <Center gap="$2" flex={1}>
                        <Heading color="#222" > Crie sua conta  </Heading>

                        <Input placeholder="Nome" style={{ backgroundColor: '#FFF', borderColor: '#DDD' }} placeholderTextColor="#888" />



                        <Input placeholder="Email" keyboardType="email-address" autoCapitalize="none" style={{ backgroundColor: '#FFF', borderColor: '#DDD' }} placeholderTextColor="#888" />

                        <Input placeholder="Senha" secureTextEntry autoCapitalize="none" style={{ backgroundColor: '#FFF', borderColor: '#DDD' }} placeholderTextColor="#888" />

                        {/* colocar o "isLoading" abaixo  para ficar carregando quando user fazer a requisicao ao banco */}

                        <Button title="Criar e Acessar" mt="$2" style={{ backgroundColor: '#FF9100', shadowColor: '#FF9100', shadowOpacity: 0.2, shadowRadius: 8, shadowOffset: { width: 0, height: 4 } }} variant="solid" />

                    </Center>






                    <Button title="Voltar para login" variant="outline" mt="$12" onPress={handelGoback} style={{ borderColor: '#FF9100' }}/>









                </VStack>


            </VStack>
        </ScrollView>
    )
}