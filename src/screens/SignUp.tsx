import { VStack, Center, Text, Heading, ScrollView, Link, LinkText, HStack } from "@gluestack-ui/themed";
import { KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

/* o typescript nao tava entendendo o ".png" entao tive que criar um arquivo types para isso */

/* como a logo tava em svg tivemos que baixar umas dependecias o metro.config.js */

/* temos que criar um arquivo tipo para passar o novo tipo svg */

/* peguei essa documentação do site    https://github.com/kristerkari/react-native-svg-transformer */

/* agora conseguimos passar a logo */

import Logo from "@assets/logotko.png";

/* tempos que importar os componentes  de input */

import { Input } from "@components/input";

/* importando o butao */

import { Button } from "@components/Button";

export function SignUp() {
    const navigation = useNavigation<AuthNavigatorRoutesProps>();

    function handleGoBackToLogin() {
        navigation.navigate("Signin");
    }

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
            style={{ flex: 1, backgroundColor: 'white' }}
        >
            <ScrollView 
                contentContainerStyle={{ 
                    flexGrow: 1, 
                    justifyContent: 'center'
                }} 
                showsVerticalScrollIndicator={false}
            >
                <VStack px="$10" pb="$10" w="$full">

                    <Center my="$12"> 
                        <Heading color="$textDark800" fontSize="$2xl" mb="$2">
                            Crie a sua conta!
                        </Heading>
                        <Text color="$textLight700" fontSize="$md">
                            vamos criar sua conta juntos
                        </Text>
                    </Center>

                    <VStack space="md">
                        <VStack space="xs">
                            <Text color="$textLight800" fontWeight="$bold">Nome*</Text>
                            <Input
                                placeholder="Seu nome completo"
                                autoCapitalize="words"
                                placeholderTextColor="$coolGray400"
                                rounded="$lg"
                            />
                        </VStack>

                        <VStack space="xs">
                            <Text color="$textLight800" fontWeight="$bold">E-mail*</Text>
                            <Input
                                placeholder="Seu e-mail"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                placeholderTextColor="$coolGray400"
                                rounded="$lg"
                            />
                        </VStack>

                        <VStack space="xs">
                            <Text color="$textLight800" fontWeight="$bold">Senha*</Text>
                            <Input
                                placeholder="Crie uma senha"
                                secureTextEntry
                                autoCapitalize="none"
                                placeholderTextColor="$coolGray400"
                                rounded="$lg"
                            />
                        </VStack>

                        <VStack space="xs">
                            <Text color="$textLight800" fontWeight="$bold">Confirmar senha*</Text>
                            <Input
                                placeholder="Confirme sua senha"
                                secureTextEntry
                                autoCapitalize="none"
                                placeholderTextColor="$coolGray400"
                                rounded="$lg"
                            />
                        </VStack>
                    </VStack>

                    <Button
                        title="Cadastrar"
                        mt="$10"
                        mb="$6"
                        bg="#FF9100" 
                        sx={{
                            ":pressed": {
                                bg: "$orange700"
                            }
                        }}
                        rounded="$lg"
                    />

                    <Center>
                        <HStack>
                            <Text color="$textLight700" fontSize="$sm" fontFamily="$body">Já possui uma conta? </Text>
                            <Link onPress={handleGoBackToLogin}>
                                <LinkText color="#FF9100" fontSize="$sm" fontFamily="$body" fontWeight="$bold" textDecorationLine="underline">
                                    Faça login
                                </LinkText>
                            </Link>
                        </HStack>
                    </Center>

                </VStack>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}