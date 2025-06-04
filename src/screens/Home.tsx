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
import { ToggleSaldoButton } from "../components/ToggleSaldoButton";
import { Image } from "react-native";
import { useDespesas } from "../context/ExpensesContext"; // já está importado
import { Alert } from "react-native";

export function Home() {
  const { despesas, adicionarDespesa, renda } = useDespesas();

  // Remova o estado local de despesas
  // const [despesasState, setDespesas] = useState([...]);

  // Lista de categorias fixas
  const categorias = ["Mercado", "Lazer", "Transporte"];

  // Calcule os totais usando o contexto
  const gastosTotais = despesas.reduce((sum, d) => sum + (d.valor || 0), 0);
  const saldo = (renda || 0) - gastosTotais;

  const [saldoVisivel, setSaldoVisivel] = useState(true);

  return (
    <Center flex={1} bg="$gray100">
      <ScrollView
        w="100%"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* Header */}
        <Box
          w="100%"
          px="$4"
          pt="$10"
          pb="$10"
          bg="$white"
          style={{ position: "relative" }}
          mt="$10"
        >
          <HStack justifyContent="flex-end" alignItems="center">
            <Image
              source={require("../assets/logotko.png")}
              style={{
                width: 80,
                height: 80,
                resizeMode: "contain",
                marginRight: "80%", // ajuste esse valor para mover mais ou menos
              }}
            />
          </HStack>
          <VStack mt="$4" space="sm">
            <HStack alignItems="center" space="sm">
              <Text fontSize="$2xl" fontWeight="bold" color="$black">
                Saldo:{" "}
                {saldoVisivel
                  ? `R$ ${saldo.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`
                  : "••••••"}
              </Text>
              <ToggleSaldoButton
                visivel={saldoVisivel}
                onToggle={() => setSaldoVisivel((v) => !v)}
              />
            </HStack>
            <HStack alignItems="center" space="md">
              <HStack alignItems="center" space="xs">
                <Text fontSize="$md">💰</Text>
                <Text fontSize="$sm" color="$gray600">
                  Renda: R$ {renda.toLocaleString("pt-BR")}
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
                descricao,
              };
              adicionarDespesa(novaDespesa); // Use o contexto!
              Alert.alert("Sucesso", "Gasto adicionado com sucesso!");
            }}
          />
        </Box>
      </ScrollView>
    </Center>
  );
}
