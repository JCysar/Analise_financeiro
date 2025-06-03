// src/screens/Home.tsx

import React, { useState } from "react";
import {
  Center,
  Text,
  Box,
  VStack,
  HStack,
  ScrollView,
  Pressable,
} from "@gluestack-ui/themed";
import { Dimensions } from "react-native";
import { ResumoDoMes } from "../components/ResumoDoMes";
import { UltimosGastos } from "../components/UltimosGastos";
import { AdicionarGastoForm } from "../components/AdicionarGastoForm"; // Novo componente

export function Home() {
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

  // Lista de categorias fixas
  const categorias = ["Mercado", "Lazer", "Transporte"];

  // Simulação de dados de renda e gastos totais
  const rendaTotal = 8000;
  const gastosTotais = despesas.reduce((sum, d) => sum + d.valor, 0);
  const saldo = rendaTotal - gastosTotais;

  return (
    <Center flex={1} bg="$gray100">
      <ScrollView
        w="100%"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* Header */}
        <Box w="100%" px="$4" pt="$6" pb="$4" bg="$white">
          <HStack justifyContent="space-between" alignItems="center">
            <Box w={10} h={10} bg="$gray300" rounded="$full" />
            <Pressable>
              <Text fontSize="$lg">👁️</Text>
            </Pressable>
          </HStack>
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
                  Renda: R$ {rendaTotal.toLocaleString("pt-BR")}
                </Text>
              </HStack>
              <HStack alignItems="center" space="xs">
                <Text fontSize="$md">💸</Text>
                <Text fontSize="$sm" color="$gray600">
                  Gastos: R$ {gastosTotais.toLocaleString("pt-BR")}
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

        {/* Últimos Gastos */}
        <UltimosGastos despesas={despesas} />

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
          <AdicionarGastoForm
            categorias={categorias}
            onSalvar={({ valor, categoria, data, descricao }) => {
              if (!valor || !categoria || !data || !descricao) return;
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
            }}
          />
        </Box>
      </ScrollView>
    </Center>
  );
}
