import React from "react";
import { Center, Text, Box, HStack, VStack, ScrollView } from "@gluestack-ui/themed";
import { Dimensions } from "react-native";
import { useDespesas } from "../context/ExpensesContext";

interface CategoriaData {
  name: string;
  percentage: number;
  color: string;
  value: number;
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
  const { despesas, renda } = useDespesas();

  // Calcule os totais por categoria dinamicamente
  const totalPorCategoria: { [key: string]: number } = {};
  despesas.forEach((d) => {
    totalPorCategoria[d.nome] = (totalPorCategoria[d.nome] || 0) + d.valor;
  });

  // Calcule o total de gastos
  const totalGastos = despesas.reduce((sum, d) => sum + d.valor, 0);

  // Monte os dados para o gráfico
  const categoriasData: CategoriaData[] = Object.keys(totalPorCategoria).map((cat) => ({
    name: cat,
    percentage: renda > 0 ? Math.round((totalPorCategoria[cat] / renda) * 100) : 0,
    value: totalPorCategoria[cat],
    color:
      cat.toLowerCase() === "mercado"
        ? "#C2410C"
        : cat.toLowerCase() === "lazer"
        ? "#EA580C"
        : "#FB923C",
  }));

  // Determine max expense for dynamic bar scaling
  const positiveExpenseValues = categoriasData.map(c => c.value).filter(v => v > 0);
  const maxActualExpense = positiveExpenseValues.length > 0 ? Math.max(...positiveExpenseValues) : 1;

  const MAX_BAR_HEIGHT = 120; // Max visual height for a bar
  const MIN_BAR_HEIGHT = 8;   // Min visual height for a non-zero bar
  const EXP_FACTOR = 1.2;     // To make larger values more prominent

  return (
    <Center w="100%" mb="$4">
      <Box w="100%" bg="$orange100" p="$4" rounded="$lg">
        <Text color="$black" fontWeight="bold" mb="$4">
          Resumo do mês
        </Text>
        {/* Make this section scrollable if there are many categories */}
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <HStack>
            {categoriasData.length === 0 || totalGastos === 0 ? (
              <Text color="$gray600">Nenhum gasto registrado.</Text>
            ) : (
              categoriasData.map((item, index) => {
                let barHeight = 0;
                if (item.value > 0 && item.percentage > 0) {
                  const percentageAsDecimal = item.percentage / 100;
                  const poweredPercentage = Math.pow(percentageAsDecimal, EXP_FACTOR);
                  barHeight = MAX_BAR_HEIGHT * poweredPercentage;
                  barHeight = Math.max(MIN_BAR_HEIGHT, barHeight);
                  barHeight = Math.min(barHeight, MAX_BAR_HEIGHT);
                } else if (item.value > 0 && renda <= 0) {
                  const normalizedValue = item.value / maxActualExpense;
                  const poweredValue = Math.pow(normalizedValue, EXP_FACTOR);
                  barHeight = MAX_BAR_HEIGHT * poweredValue;
                  barHeight = Math.max(MIN_BAR_HEIGHT, barHeight);
                  barHeight = Math.min(barHeight, MAX_BAR_HEIGHT);
                }
                return (
                  <VStack 
                    key={item.name} 
                    alignItems="center" 
                    minWidth={80} 
                    py="$2" 
                    justifyContent="flex-end"
                    height={MAX_BAR_HEIGHT + 60}
                    ml={index > 0 ? 8 : 0}
                  >
                    <Text color="$black" fontSize="$xs" numberOfLines={1} textAlign="center">{item.name}</Text>
                    <Text color="$gray700" fontSize="$xs" textAlign="center">
                      R${item.value.toFixed(2)}
                    </Text>
                    <Text color="$gray700" fontSize="$xs" textAlign="center">
                      ({item.percentage}%)
                    </Text>
                    <Box
                      height={barHeight}
                      width={40}
                      bg={item.color}
                      rounded="$sm"
                    />
                  </VStack>
                );
              })
            )}
          </HStack>
        </ScrollView>
      </Box>
    </Center>
  );
}