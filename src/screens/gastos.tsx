import React from "react";
import {
  Center,
  ScrollView,
  VStack,
  HStack,
  Box,
  Text,
} from "@gluestack-ui/themed";
import { useDespesas } from "../context/ExpensesContext"; // Importando o contexto de despesas

export function History() {
  const { despesas } = useDespesas();

  return (
    <Center flex={1} bg="$gray100">
      <ScrollView w="100%">
        <VStack space="$4" p="$4">
          <Text fontSize="$xl" fontWeight="bold" color="$gray900" mb="$2">
            Gastos
          </Text>
          {despesas.map((d) => (
            <Box
              key={d.id}
              borderWidth={1}
              borderColor="$blue500"
              borderRadius="$md"
              bg="$white"
              p="$4"
            >
              <Text fontSize="$md" fontWeight="bold" color="$gray900">
                {d.nome} – {d.data}
              </Text>
              <Text fontSize="$sm" color="$gray700" mb="$2">
                {d.icone} – {d.descricao}
              </Text>
              <HStack justifyContent="space-between">
                <Text fontSize="$xs" color="$gray600">
                  R$ {d.valor.toFixed(2)}
                </Text>
                <Text fontSize="$xs" color="$gray600">
                  Categoria: {d.nome}
                </Text>
              </HStack>
            </Box>
          ))}
        </VStack>
      </ScrollView>
    </Center>
  );
}
