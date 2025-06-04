import React from "react";
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
  Image, // Adicione esta linha se for usar o componente Image
} from "@gluestack-ui/themed";

export function Profile() {
  return (
    <Center flex={1} bg="$gray100">
      <ScrollView w="100%">
        {/* Espaço para a logo */}
        <Center mt="$8" mb="$4">
          {/* Substitua o source pelo caminho da sua logo */}
          <Image
            source={require("@assets/logotko.png")}
            alt="Logo"
            w={100}
            h={100}
            resizeMode="contain"
          />
        </Center>
        <VStack space="md" p="$4" mt="$2">
          {/*** Card de Meta 1 ***/}
          <Box
            borderWidth={1}
            borderColor="$blue500"
            borderRadius="$md"
            bg="$white"
            p="$4"
          >
            <Text fontSize="$md" fontWeight="bold" color="$gray900">
              Meta - 30.05.2026
            </Text>
            <Text fontSize="$sm" color="$gray700" mb="$2">
              Viagem para Europa
            </Text>

            {/** Barra de progresso (30%) **/}
            <Box
              bg="$gray300"
              h={4}
              borderRadius="$full"
              overflow="hidden"
            >
              <Box bg="$green500" h="100%" w="30%" />
            </Box>

            <HStack justifyContent="space-between" mt="$2">
              <Text fontSize="$xs" color="$gray600">
                30% concluído
              </Text>
              <Text fontSize="$xs" color="$gray600">
                R$ 5.000 de R$ 20.000
              </Text>
            </HStack>
          </Box>

          {/*** Card de Meta 2 ***/}
          <Box
            borderWidth={1}
            borderColor="$blue500"
            borderRadius="$md"
            bg="$white"
            p="$4"
          >
            <Text fontSize="$md" fontWeight="bold" color="$gray900">
              Meta - 15.03.2026
            </Text>
            <Text fontSize="$sm" color="$gray700" mb="$2">
              Carro novo
            </Text>

            {/** Barra de progresso (também 30%) **/}
            <Box
              bg="$gray300"
              h={4}
              borderRadius="$full"
              overflow="hidden"
            >
              <Box bg="$green500" h="100%" w="30%" />
            </Box>

            <HStack justifyContent="space-between" mt="$2">
              <Text fontSize="$xs" color="$gray600">
                30% concluído
              </Text>
              <Text fontSize="$xs" color="$gray600">
                R$ 5.000 de R$ 20.000
              </Text>
            </HStack>
          </Box>

          {/*** Formulário de “Adicionar meta” ***/}
          <Box bg="$white" borderRadius="$lg" p="$4">
            <Text fontSize="$lg" fontWeight="bold" color="$gray900" mb="$2">
              Adicionar meta
            </Text>
              <Input>
                <InputField placeholder="Nome:" />
              </Input>
              <Input>
                <InputField placeholder="Valor necessário:" keyboardType="numeric" />
              </Input>
              <Input>
                <InputField placeholder="Prazo:" />
              </Input>
              <Input>
                <InputField placeholder="Prazo:" />
              </Input>
              <Button mt="$3" bg="$orange500">
                <Text color="$white">Adicionar meta</Text>
              </Button>
          </Box>
        </VStack>
      </ScrollView>
    </Center>
  );
}
