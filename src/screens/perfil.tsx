import React from "react";
import {
  Center,
  ScrollView,
  VStack,
  Box,
  Text,
  Input,
  Button,
} from "@gluestack-ui/themed";

export function Exercise() {
  // Aqui, de forma estática, estamos “simulando” os dados já existentes do usuário.
  // Em um app real, você buscaria isso de uma API ou do estado global.
  const existingUser = {
    name: "Vinicius Lourenço",
    email: "vinicius.lourenco@example.com",
    phone: "(11) 99999-1234",
  };

  return (
    <Center flex={1} bg="$gray100">
      <ScrollView w="100%">
        <VStack space="lg" p="$4">
          {/*** Cabeçalho “Perfil” ***/}
          <Text fontSize="$2xl" fontWeight="bold" color="$gray900" mb="$2">
            Meu Perfil
          </Text>

          {/*** Card de informações do usuário ***/}
          <Box
            bg="$white"
            borderRadius="$lg"
            borderWidth={1}
            borderColor="$blue500"
            p="$4"
          >
            {/** Nome **/}
            <Text fontSize="$sm" color="$gray700" mb="$1">
              Nome
            </Text>
            <Input
              defaultValue={existingUser.name}
              placeholder="Digite seu nome"
            />

            {/** Espaçamento entre campos **/}
            <Box h="$3" />

            {/** E-mail **/}
            <Text fontSize="$sm" color="$gray700" mb="$1">
              E-mail
            </Text>
            <Input
              defaultValue={existingUser.email}
              placeholder="Digite seu e-mail"
              keyboardType="email-address"
            />

            <Box h="$3" />

            {/** Telefone **/}
            <Text fontSize="$sm" color="$gray700" mb="$1">
              Telefone
            </Text>
            <Input
              defaultValue={existingUser.phone}
              placeholder="(xx) xxxxx-xxxx"
              keyboardType="phone-pad"
            />

            <Box h="$4" />

            {/** Botão para salvar alterações **/}
            <Button bg="$orange500">
              <Text color="$white" fontWeight="bold">
                Salvar alterações
              </Text>
            </Button>
          </Box>
        </VStack>
      </ScrollView>
    </Center>
  );
}
