import React from "react";
import { Center, Text, Box, HStack, VStack } from "@gluestack-ui/themed";
import { Dimensions } from "react-native";

interface CategoriaData {
  name: string;
  percentage: number;
  color: string;
}

// Exemplo de componente ResumoMes
interface Gasto {
  valor: number | string;
}

interface ResumoMesProps {
  income: number | string;
  gastos: Gasto[];
}

export function ResumoMes({ income, gastos }: ResumoMesProps) {
  // Calcule o saldo
  const saldo = Number(income) - gastos.reduce((acc, gasto) => acc + Number(gasto.valor), 0);

  return (
    <Box>
      <Text>Saldo do mês: R$ {saldo.toFixed(2)}</Text>
    </Box>
  );
}

export function ResumoDoMes() {
  const categoriasData: CategoriaData[] = [
    { name: "Mercado",    percentage: 40, color: "#C2410C" },
    { name: "Lazer",      percentage: 15, color: "#EA580C" },
    { name: "Transporte", percentage: 30, color: "#FB923C" },
  ];

  const containerWidth = Dimensions.get("window").width - 32;

  return (
    <Center w="100%" mb="$4">
      <Box
        w="100%"
        bg="$orange100"
        p="$4"
        rounded="$lg"
      >
        <Text color="$black" fontWeight="bold" mb="$4">
          Resumo do mês
        </Text>
        <VStack space="sm">
          {categoriasData.map((item) => {
            const barWidth = (containerWidth * item.percentage) / 100;
            return (
              <HStack key={item.name} alignItems="center" mb="$2">
                <Box
                  width={barWidth}
                  height={10}
                  bg={item.color}
                  rounded="$full"
                />
                <Text color="$black" ml="$2">
                  {item.name} ({item.percentage}%)
                </Text>
              </HStack>
            );
          })}
        </VStack>
      </Box>
    </Center>
  );
}