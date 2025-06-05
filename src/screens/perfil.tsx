// Tela de Perfil: permite ao usuário visualizar e editar seus dados pessoais e renda
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
import { useDespesas } from "../context/ExpensesContext";
import { Alert } from "react-native"; // Adicione esta linha

// Componente principal da tela de perfil
export function Exercise() {
  // Dados simulados do usuário (em um app real, viriam de uma API ou contexto)
  const existingUser = {
    name: "Vinicius Lourenço",
    email: "vinicius.lourenco@example.com",
    phone: "(11) 99999-1234",
  };

  // Estados para os campos do formulário
  const [name, setName] = useState(existingUser.name);
  const [email, setEmail] = useState(existingUser.email);
  const [phone, setPhone] = useState(existingUser.phone);
  const [income, setIncome] = useState("");

  // Função do contexto para atualizar a renda
  const { setRenda } = useDespesas();

  // Renderização da tela
  return (
    <Center flex={1} bg="$gray100">
      <ScrollView w="100%">
        <VStack space="lg" p="$4">
          {/* Cabeçalho */}
          <Text fontSize="$2xl" fontWeight="bold" color="$gray900" mb="$2">
            Meu Perfil
          </Text>

          {/* Card de informações do usuário */}
          <Box
            bg="$white"
            borderRadius="$lg"
            borderWidth={1}
            borderColor="$blue500"
            p="$4"
          >
            {/* Campo Nome */}
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

            {/* Campo E-mail */}
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

            {/* Campo Telefone */}
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

            {/* Campo Renda */}
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

            {/* Botão para salvar alterações */}
            <Button
              onPress={() => {
                setRenda(Number(income) || 0);
                Alert.alert("Sucesso", "Dados atualizados com sucesso!");
              }}
              bg="$orange500"
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
