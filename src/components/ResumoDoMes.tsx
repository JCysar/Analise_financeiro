import React from "react";
import { Center, Text, Box, HStack, VStack, ScrollView } from "@gluestack-ui/themed";
// Dimensions might not be strictly needed anymore if containerWidth is not used for bar calculations
// import { Dimensions } from "react-native"; 
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

// Helper function to determine bar color based on percentage of income
const getDynamicColor = (percentage: number): string => {
  if (percentage <= 5) return "#FEF3C7"; // Amber 200 (Lightest)
  if (percentage <= 15) return "#FDBA74"; // Orange 300
  if (percentage <= 30) return "#FB923C"; // Orange 400
  if (percentage <= 50) return "#F97316"; // Orange 500
  if (percentage <= 75) return "#EA580C"; // Orange 600
  return "#DC2626"; // Red 600 (Most intense for > 75%)
};

export function ResumoDoMes() {
  const { despesas, renda } = useDespesas();

  // Define constants for bar display
  const MAX_BAR_HEIGHT = 120; // Max visual height for a bar
  const MIN_BAR_HEIGHT = 8;   // Min visual height for a non-zero bar
  const EXP_FACTOR = 1.2;     // To make larger values more prominent

  const totalPorCategoria: { [key: string]: number } = {};
  despesas.forEach((d) => {
    totalPorCategoria[d.nome] = (totalPorCategoria[d.nome] || 0) + d.valor;
  });

  const totalGastos = despesas.reduce((sum, d) => sum + d.valor, 0);

  const categoriasData: CategoriaData[] = Object.keys(totalPorCategoria).map((cat) => {
    const categoryValue = totalPorCategoria[cat];
    const categoryPercentage = renda > 0 ? Math.round((categoryValue / renda) * 100) : 0;
    return {
      name: cat,
      percentage: categoryPercentage,
      value: categoryValue,
      color: getDynamicColor(categoryPercentage), // Assign dynamic color here
    };
  });

  // Determine max expense for fallback bar scaling (when renda is 0 or not set)
  const positiveExpenseValues = categoriasData.map(c => c.value).filter(v => v > 0);
  const maxActualExpense = positiveExpenseValues.length > 0 ? Math.max(...positiveExpenseValues) : 1;

  return (
    <Center w="100%" mb="$4">
      <Box w="100%" bg="$orange100" p="$4" rounded="$lg">
        <Text color="$black" fontWeight="bold" mb="$4">
          Resumo do mês
        </Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <HStack>
            {categoriasData.length === 0 || totalGastos === 0 ? (
              <Text color="$gray600">Nenhum gasto registrado.</Text>
            ) : (
              categoriasData.map((item, index) => {
                let barHeight = 0;
                if (item.value > 0 && renda > 0 && item.percentage >= 0) { // ensure percentage is non-negative for Math.pow
                  const percentageAsDecimal = item.percentage / 100;
                  // Ensure base for Math.pow is non-negative
                  const poweredPercentage = Math.pow(Math.max(0, percentageAsDecimal), EXP_FACTOR);
                  barHeight = MAX_BAR_HEIGHT * poweredPercentage;
                  barHeight = Math.max(MIN_BAR_HEIGHT, barHeight);
                  barHeight = Math.min(barHeight, MAX_BAR_HEIGHT);
                } else if (item.value > 0) { // Fallback if income is zero/not set, or percentage is 0
                  const normalizedValue = item.value / maxActualExpense;
                  const poweredValue = Math.pow(Math.max(0, normalizedValue), EXP_FACTOR);
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
                    height={MAX_BAR_HEIGHT + 60} // Approx height for labels + max bar
                    ml={index > 0 ? 8 : 0} // Use numerical margin
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
                      bg={item.color} // Use item.color which was set during mapping
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