import React from "react";
import {
  Center,
  ScrollView,
  VStack,
  HStack,
  Box,
  Text,
} from "@gluestack-ui/themed";

export function History() {
  return (
    <Center flex={1} bg="$gray100">
      <ScrollView w="100%">
        <VStack space="$4" p="$4">

          <Text fontSize="$xl" fontWeight="bold" color="$gray900" mb="$2">
            Gastos
          </Text>

          {/*** Card de Gasto 1 ***/}
          <Box
            borderWidth={1}
            borderColor="$blue500"
            borderRadius="$md"
            bg="$white"
            p="$4"
          >
            <Text fontSize="$md" fontWeight="bold" color="$gray900">
              Gasto – 01.05.2025
            </Text>
            <Text fontSize="$sm" color="$gray700" mb="$2">
              Aluguel – Mensalidade
            </Text>
            <HStack justifyContent="space-between">
              <Text fontSize="$xs" color="$gray600">
                R$ 1.000,00
              </Text>
              <Text fontSize="$xs" color="$gray600">
                Categoria: Habitação
              </Text>
            </HStack>
          </Box>

          {/*** Card de Gasto 2 ***/}
          <Box
            borderWidth={1}
            borderColor="$blue500"
            borderRadius="$md"
            bg="$white"
            p="$4"
          >
            <Text fontSize="$md" fontWeight="bold" color="$gray900">
              Gasto – 10.05.2025
            </Text>
            <Text fontSize="$sm" color="$gray700" mb="$2">
              Supermercado – Compras de mercado
            </Text>
            <HStack justifyContent="space-between">
              <Text fontSize="$xs" color="$gray600">
                R$ 350,00
              </Text>
              <Text fontSize="$xs" color="$gray600">
                Categoria: Alimentação
              </Text>
            </HStack>
          </Box>

          {/*** Card de Gasto 3 ***/}
          <Box
            borderWidth={1}
            borderColor="$blue500"
            borderRadius="$md"
            bg="$white"
            p="$4"
          >
            <Text fontSize="$md" fontWeight="bold" color="$gray900">
              Gasto – 15.05.2025
            </Text>
            <Text fontSize="$sm" color="$gray700" mb="$2">
              Academia – Mensalidade
            </Text>
            <HStack justifyContent="space-between">
              <Text fontSize="$xs" color="$gray600">
                R$ 120,00
              </Text>
              <Text fontSize="$xs" color="$gray600">
                Categoria: Saúde
              </Text>
            </HStack>
          </Box>

          {/*** Você pode repetir esta estrutura para quantos “cards” de gasto quiser ***/}
          
        </VStack>
      </ScrollView>
    </Center>
  );
}
