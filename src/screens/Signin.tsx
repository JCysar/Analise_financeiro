import { VStack, Image, Center, Text, Heading, ScrollView, Box, Checkbox, CheckboxIndicator, CheckboxIcon, CheckboxLabel, Link, LinkText, HStack } from "@gluestack-ui/themed";
import { KeyboardAvoidingView, Platform } from 'react-native';

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









export function Signin() {
    const navigation = useNavigation<AuthNavigatorRoutesProps>();


    function handleNewAccount() {
        navigation.navigate("SignUp");
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} bg="$white">
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                <VStack flex={1} px="$10" justifyContent="center">

                    <Center mb="$16">
                        {/* Replace placeholder Box with the Image component */}
                        <Image
                            source={logotkoImg}
                            alt="Logo"
                            w={120} 
                            h={120} 
                            mb="$10"
                        />
                    </Center>

                    <VStack space="md">
                        <VStack space="xs">
                            <Text color="$textLight800" fontWeight="$bold">E-mail*</Text>
                            <Input
                                placeholder="Seu e-mail"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                placeholderTextColor="$coolGray400"
                                rounded="$lg" // Increased border radius
                            />
                        </VStack>

                        <VStack space="xs">
                            <Text color="$textLight800" fontWeight="$bold">Senha*</Text>
                            <Input
                                placeholder="Sua senha"
                                secureTextEntry
                                autoCapitalize="none"
                                placeholderTextColor="$coolGray400"
                                rounded="$lg" // Increased border radius
                            />
                        </VStack>

                        <Checkbox value="rememberMe" aria-label="Mantenha-me conectado" size="md" mt="$2">
                            <CheckboxIndicator mr="$2">
                                <CheckboxIcon />
                            </CheckboxIndicator>
                            <CheckboxLabel color="$textLight700">Mantenha-me conectado</CheckboxLabel>
                        </Checkbox>
                    </VStack>

                    <Button
                        title="Entrar"
                        mt="$10"
                        mb="$6"
                        bg="#FF9100" // Orange color from image
                        sx={{
                            ":pressed": {
                                bg: "$orange700"
                            }
                        }}
                        rounded="$lg" // Increased border radius
                    />

                    <Center>
                        <HStack>
                            <Text color="$textLight700" fontSize="$sm" fontFamily="$body">Ainda não possui uma conta? </Text>
                            <Link onPress={handleNewAccount}>
                                <LinkText color="#FF9100" fontSize="$sm" fontFamily="$body" fontWeight="$bold" textDecorationLine="underline">
                                    Conecte-se
                                </LinkText>
                            </Link>
                        </HStack>
                    </Center>

                </VStack>
            </KeyboardAvoidingView>
        </ScrollView>
    );
}