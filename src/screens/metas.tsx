import React, { useState } from "react";
import {
  Center,
  ScrollView,
  VStack,
  HStack,
  Box,
  Text,
  Input,
  InputField,
  Button,
  Image,
} from "@gluestack-ui/themed";
import { Alert } from "react-native"; // Adicione esta linha

type Meta = {
  nome: string;
  valor: number;
  prazo: string;
  criadoEm: string;
  valorAtual: number;
};

export function Profile() {
  const [metas, setMetas] = useState<Meta[]>([]);
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [prazo, setPrazo] = useState("");

  const adicionarMeta = () => {
    if (!nome || !valor || !prazo) return;
    const novaMeta: Meta = {
      nome,
      valor: Number(valor),
      prazo,
      criadoEm: new Date().toLocaleDateString(),
      valorAtual: 0,
    };
    setMetas([novaMeta, ...metas]);
    setNome("");
    setValor("");
    setPrazo("");
    Alert.alert("Sucesso", "Meta adicionada com sucesso!"); // Alerta de sucesso
  };

  return (
    <Center flex={1} bg="$gray100">
      <ScrollView w="100%">
        <Center mt="$8" mb="$4">
          <Image
            source={require("@assets/logotko.png")}
            alt="Logo"
            w={100}
            h={100}
            resizeMode="contain"
          />
        </Center>
        <VStack space="md" p="$4" mt="$2">
          {/* Metas cadastradas */}
          {metas.map((meta, idx) => {
            const progresso = meta.valorAtual / meta.valor;
            return (
              <Box
                key={idx}
                borderWidth={1}
                borderColor="$blue500"
                borderRadius="$md"
                bg="$white"
                p="$4"
                mb="$2"
              >
                <Text fontSize="$md" fontWeight="bold" color="$gray900">
                  {meta.nome}
                </Text>
                <Text fontSize="$sm" color="$gray700" mb="$1">
                  Prazo: {meta.prazo}
                </Text>
                <Text fontSize="$xs" color="$gray600" mb="$2">
                  Criado em: {meta.criadoEm}
                </Text>
                {/* Barra de progresso */}
                <Box
                  bg="$gray300"
                  h={4}
                  borderRadius="$full"
                  overflow="hidden"
                >
                  <Box
                    bg="$green500"
                    h="100%"
                    w={`${Math.round(progresso * 100)}%`}
                  />
                </Box>
                <HStack justifyContent="space-between" mt="$2">
                  <Text fontSize="$xs" color="$gray600">
                    {Math.round(progresso * 100)}% concluído
                  </Text>
                  <Text fontSize="$xs" color="$gray600">
                    R$ {meta.valorAtual} de R$ {meta.valor}
                  </Text>
                </HStack>
              </Box>
            );
          })}

          {/* Formulário de “Adicionar meta” */}
          <Box bg="$white" borderRadius="$lg" p="$4">
            <Text fontSize="$lg" fontWeight="bold" color="$gray900" mb="$2">
              Adicionar meta
            </Text>
            <Input mb="$2">
              <InputField
                placeholder="Nome:"
                value={nome}
                onChangeText={setNome}
              />
            </Input>
            <Input mb="$2">
              <InputField
                placeholder="Valor necessário:"
                keyboardType="numeric"
                value={valor}
                onChangeText={setValor}
              />
            </Input>
            <Input mb="$2">
              <InputField
                placeholder="Prazo:"
                value={prazo}
                onChangeText={setPrazo}
              />
            </Input>
            <Button mt="$3" bg="$orange500" onPress={adicionarMeta}>
              <Text color="$white">Adicionar meta</Text>
            </Button>
          </Box>
        </VStack>
      </ScrollView>
    </Center>
  );
}
