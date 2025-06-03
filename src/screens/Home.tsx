// src/screens/Home.tsx

import React, { useState } from "react";
import {
  Center,
  Text,
  Box,
  VStack,
  HStack,
  ScrollView,
  Button,
  Input,
  InputField,
  Select,
  Pressable,
} from "@gluestack-ui/themed";
import { Dimensions } from "react-native";
import { ResumoDoMes } from "../components/ResumoDoMes";

export function Home() {
  // Estados de formulário
  const [valor, setValor] = useState("");
  const [categoria, setCategoria] = useState("");
  const [data, setData] = useState("");
  const [descricao, setDescricao] = useState("");

  // Despesas cadastradas (simulação de back-end/local)
  const [despesas, setDespesas] = useState([
    {
      id: 1,
      nome: "Mercado",
      valor: 100,
      data: "22/05/2025",
      icone: "🛒",
    },
    {
      id: 2,
      nome: "Transporte",
      valor: 70,
      data: "20/05/2025",
      icone: "🚗",
    },
    {
      id: 3,
      nome: "Transporte",
      valor: 40,
      data: "22/05/2025",
      icone: "🚗",
    },
  ]);

  // Lista de categorias fixas (poderia vir de API ou tabela dinâmica)
  const categorias = ["Mercado", "Lazer", "Transporte"];

  // Funções de salvar e cancelar despesa
  const handleSalvar = () => {
    if (!valor || !categoria || !data || !descricao) {
      alert("Preencha todos os campos antes de salvar.");
      return;
    }
    const novaDespesa = {
      id: Date.now(),
      nome: categoria.charAt(0).toUpperCase() + categoria.slice(1),
      valor: parseFloat(valor.replace(",", ".")),
      data,
      icone:
        categoria.toLowerCase() === "mercado"
          ? "🛒"
          : categoria.toLowerCase() === "lazer"
          ? "🎉"
          : "🚗",
    };
    setDespesas([novaDespesa, ...despesas]);
    setValor("");
    setCategoria("");
    setData("");
    setDescricao("");
  };

  const handleCancelar = () => {
    setValor("");
    setCategoria("");
    setData("");
    setDescricao("");
  };

  // Simulação de dados de renda e gastos totais
  const rendaTotal = 8000;
  const gastosTotais = despesas.reduce((sum, d) => sum + d.valor, 0);
  const saldo = rendaTotal - gastosTotais;

  // Largura da tela para cálculo de tamanhos em porcentagem
  const screenWidth = Dimensions.get("window").width;

  return (
    // Container geral com fundo claro
    <Center flex={1} bg="$gray100">
      <ScrollView
        w="100%"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* Header com avatar, ícone de “olho” e texto de saldo/renda/gastos */}
        <Box w="100%" px="$4" pt="$6" pb="$4" bg="$white">
          <HStack justifyContent="space-between" alignItems="center">
            {/* Placeholder para avatar */}
            <Box w={10} h={10} bg="$gray300" rounded="$full" />
            {/* Ícone de visualizar/ocultar (placeholder) */}
            <Pressable>
              <Text fontSize="$lg">👁️</Text>
            </Pressable>
          </HStack>

          {/* Espaçamento abaixo do header */}
          <VStack mt="$4" space="sm">
            <Text fontSize="$2xl" fontWeight="bold" color="$black">
              Saldo: R$ {saldo.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>
            <HStack alignItems="center" space="md">
              <HStack alignItems="center" space="xs">
                <Text fontSize="$md">💰</Text>
                <Text fontSize="$sm" color="$gray600">
                  Renda: R$ {rendaTotal.toLocaleString("pt-BR", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </Text>
              </HStack>
              <HStack alignItems="center" space="xs">
                <Text fontSize="$md">💸</Text>
                <Text fontSize="$sm" color="$gray600">
                  Gastos: R$ {gastosTotais.toLocaleString("pt-BR", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </Text>
              </HStack>
            </HStack>
          </VStack>
        </Box>

        {/* Resumo do mês */}
        <Box
          w="90%"
          alignSelf="center"
          bg="$orange100"
          p="$4"
          rounded="$lg"
          mt="$4"
        >
          <ResumoDoMes />
        </Box>

        {/* Últimos Gastos em Scroll Horizontal */}
        <VStack w="100%" mt="$6">
          <Text
            px="$4"
            mb="$2"
            fontSize="$lg"
            fontWeight="bold"
            color="$black"
          >
            Últimos gastos
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            px="$4"
          >
            <HStack space="md">
              {despesas.map((d) => (
                <Box
                  key={d.id}
                  bg="$white"
                  p="$3"
                  rounded="$lg"
                  width={screenWidth * 0.4}
                  shadowColor="#000"
                  shadowOffset={{ width: 0, height: 1 }}
                  shadowOpacity={0.1}
                  shadowRadius={2}
                  elevation={2}
                >
                  <Center>
                    {/* Ícone da despesa */}
                    <Box
                      w={12}
                      h={12}
                      bg="$orange200"
                      rounded="$full"
                      alignItems="center"
                      justifyContent="center"
                      mb="$3"
                    >
                      <Text fontSize="$2xl">{d.icone}</Text>
                    </Box>
                    {/* Valor */}
                    <Text
                      fontSize="$md"
                      fontWeight="bold"
                      color="$black"
                      textAlign="center"
                    >
                      R$ {d.valor.toFixed(2)}
                    </Text>
                    {/* Data */}
                    <Text fontSize="$xs" color="$gray500" mt="$1">
                      {d.data}
                    </Text>
                  </Center>
                </Box>
              ))}
            </HStack>
          </ScrollView>
        </VStack>

        {/* Formulário de Adicionar Gasto */}
        <Box
          w="90%"
          alignSelf="center"
          bg="$white"
          p="$4"
          rounded="$lg"
          mt="$6"
          mb="$8"
        >
          <Text mb="$4" fontSize="$lg" fontWeight="bold" color="$black">
            Adicionar gasto
          </Text>

          <VStack space="sm">
            {/* Campo Valor */}
            <Text fontSize="$sm" color="$gray700">
              Valor:
            </Text>
            <Input bg="$gray100">
              <InputField
                placeholder="R$ 0,00"
                keyboardType="numeric"
                value={valor}
                onChangeText={setValor}
                placeholderTextColor="$gray400"
              />
            </Input>

            {/* Campo Categoria */}
            <Text fontSize="$sm" color="$gray700">
              Categoria:
            </Text>
            <Select
              placeholder="Selecione a categoria"
              selectedValue={categoria}
              onValueChange={setCategoria}
              bg="$gray100"
            >
              {categorias.map((cat) => (
                <Select.Item
                  key={cat}
                  label={cat}
                  value={cat.toLowerCase()}
                />
              ))}
            </Select>

            {/* Campo Data */}
            <Text fontSize="$sm" color="$gray700">
              Data:
            </Text>
            <Input bg="$gray100">
              <InputField
                placeholder="DD/MM/AAAA"
                value={data}
                onChangeText={setData}
                placeholderTextColor="$gray400"
              />
            </Input>

            {/* Campo Descrição */}
            <Text fontSize="$sm" color="$gray700">
              Descrição:
            </Text>
            <Input bg="$gray100">
              <InputField
                placeholder="Descrição"
                value={descricao}
                onChangeText={setDescricao}
                placeholderTextColor="$gray400"
              />
            </Input>

            {/* Botões Salvar e Cancelar */}
            <HStack space="sm" mt="$4">
              <Button
                flex={1}
                bg="$orange500"
                _pressed={{ bg: "$orange600" }}
                onPress={handleSalvar}
              >
                <Text color="$white" fontWeight="bold">
                  Salvar
                </Text>
              </Button>
              <Button
                flex={1}
                bg="$gray400"
                _pressed={{ bg: "$gray500" }}
                onPress={handleCancelar}
              >
                <Text color="$white" fontWeight="bold">
                  Cancelar
                </Text>
              </Button>
            </HStack>
          </VStack>
        </Box>
      </ScrollView>
    </Center>
  );
}
