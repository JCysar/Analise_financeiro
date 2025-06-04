import React, { useState } from "react";
import {
  Center,
  ScrollView,
  VStack,
  Box,
  Text,
  Input,
  Button,
  InputField, // Adicione esta importação
} from "@gluestack-ui/themed";

export function Exercise() {
  // Aqui, de forma estática, estamos “simulando” os dados já existentes do usuário.
  // Em um app real, você buscaria isso de uma API ou do estado global.
  const existingUser = {
    name: "Vinicius Lourenço",
    email: "vinicius.lourenco@example.com",
    phone: "(11) 99999-1234",
  };

  const [name, setName] = useState(existingUser.name);
  const [email, setEmail] = useState(existingUser.email);
  const [phone, setPhone] = useState(existingUser.phone);
  const [income, setIncome] = useState("");

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
            <Input>
              <InputField
                value={name}
                onChangeText={setName}
                placeholder="Digite seu nome"
              />
            </Input>

            <Box h="$3" />

            {/** E-mail **/}
            <Text fontSize="$sm" color="$gray700" mb="$1">
              E-mail
            </Text>
            <Input>
              <InputField
                value={email}
                onChangeText={setEmail}
                placeholder="Digite seu e-mail"
                keyboardType="email-address"
              />
            </Input>

            {/** Telefone **/}
            <Text fontSize="$sm" color="$gray700" mb="$1">
              Telefone
            </Text>
            <Input>
              <InputField
                value={phone}
                onChangeText={setPhone}
                placeholder="(xx) xxxxx-xxxx"
                keyboardType="phone-pad"
              />
            </Input>

            {/** Renda **/}
            <Text fontSize="$sm" color="$gray700" mb="$1">
              Renda
            </Text>
            <Input>
              <InputField
                value={income}
                onChangeText={setIncome}
                placeholder="Digite sua renda"
                keyboardType="numeric"
              />
            </Input>

            <Box h="$4" />

            {/*** Ações ***/}
            <Button
              onPress={() => {
                /** Aqui você enviaria os dados atualizados para serem salvos */
              }}
              bg="$orange500" // altere para a cor laranja desejada
              borderRadius="$md"
              p="$3"
            >
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
