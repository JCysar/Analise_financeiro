import React, { useState, useMemo } from "react";
import { Center, Text, Box, HStack, VStack, ScrollView, Pressable, Icon } from "@gluestack-ui/themed";
import { Platform } from "react-native";
import { CalendarDays as CalendarDaysIcon } from "lucide-react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
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

  // State for month/year filtering
  const [currentFilterDate, setCurrentFilterDate] = useState(new Date());
  const [showMonthYearPicker, setShowMonthYearPicker] = useState(false);

  // Define constants for bar display
  const MAX_BAR_HEIGHT = 120; // Max visual height for a bar
  const MIN_BAR_HEIGHT = 8;   // Min visual height for a non-zero bar
  const EXP_FACTOR = 1.2;     // To make larger values more prominent

  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowMonthYearPicker(Platform.OS === 'ios'); // Keep open on iOS until dismissed
    if (event.type === 'dismissed') {
        setShowMonthYearPicker(false);
        return;
    }
    if (selectedDate) {
      setCurrentFilterDate(selectedDate);
    }
    if (Platform.OS !== 'ios') {
        setShowMonthYearPicker(false);
    }
  };

  const formattedMonthYear = useMemo(() => {
    return currentFilterDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' });
  }, [currentFilterDate]);

  // Filter despesas based on currentFilterDate
  const filteredDespesas = useMemo(() => {
    const selectedMonth = currentFilterDate.getMonth(); // 0-indexed
    const selectedYear = currentFilterDate.getFullYear();

    return despesas.filter(d => {
      if (!d.data || typeof d.data !== 'string') return false;
      const parts = d.data.split('/');
      if (parts.length !== 3) return false;
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; // Convert to 0-indexed month
      const year = parseInt(parts[2], 10);
      return month === selectedMonth && year === selectedYear;
    });
  }, [despesas, currentFilterDate]);

  const totalPorCategoria: { [key: string]: number } = {};
  filteredDespesas.forEach((d) => {
    totalPorCategoria[d.nome] = (totalPorCategoria[d.nome] || 0) + d.valor;
  });

  const totalGastos = filteredDespesas.reduce((sum, d) => sum + d.valor, 0);

  const categoriasData: CategoriaData[] = Object.keys(totalPorCategoria).map((cat) => {
    const categoryValue = totalPorCategoria[cat];
    const categoryPercentage = renda > 0 ? Math.round((categoryValue / renda) * 100) : 0;
    return {
      name: cat,
      percentage: categoryPercentage,
      value: categoryValue,
      color: getDynamicColor(categoryPercentage),
    };
  });

  const positiveExpenseValues = categoriasData.map(c => c.value).filter(v => v > 0);
  const maxActualExpense = positiveExpenseValues.length > 0 ? Math.max(...positiveExpenseValues) : 1;

  return (
    <Center w="100%" mb="$4">
      <Box w="100%" bg="$orange100" p="$4" rounded="$lg">
        <HStack justifyContent="space-between" alignItems="center" mb="$4">
          <Text color="$black" fontWeight="bold">
            Resumo de {formattedMonthYear}
          </Text>
          <Pressable onPress={() => setShowMonthYearPicker(true)} ml="$2">
            <Icon as={CalendarDaysIcon} size="lg" color="$black" />
          </Pressable>
        </HStack>

        {showMonthYearPicker && (
          <DateTimePicker
            testID="monthYearPicker"
            value={currentFilterDate}
            mode="date" // Standard date picker, user informed to select any day for month/year
            display="default"
            onChange={handleDateChange}
          />
        )}

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <HStack>
            {categoriasData.length === 0 || totalGastos === 0 ? (
              <Text color="$gray600">Nenhum gasto registrado para {formattedMonthYear}.</Text>
            ) : (
              categoriasData.map((item, index) => {
                let barHeight = 0;
                // Ensure item.percentage is non-negative for Math.pow
                const safePercentage = Math.max(0, item.percentage);

                if (item.value > 0 && renda > 0 && safePercentage >= 0) {
                  const percentageAsDecimal = safePercentage / 100;
                  const poweredPercentage = Math.pow(percentageAsDecimal, EXP_FACTOR);
                  barHeight = MAX_BAR_HEIGHT * poweredPercentage;
                  barHeight = Math.max(MIN_BAR_HEIGHT, barHeight);
                  barHeight = Math.min(barHeight, MAX_BAR_HEIGHT);
                } else if (item.value > 0) { 
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
                    height={MAX_BAR_HEIGHT + 70} // Adjusted height for potentially longer month name
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