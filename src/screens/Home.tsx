import React, { useState } from "react";
import {
  Center,
  Text,
  Box,
  VStack,
  HStack,
  Divider,
  Button,
  Input,
  InputField,
  Select,
  ScrollView,
} from "@gluestack-ui/themed";
import { Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";

export function Home() {
  // Estado para o valor do gasto a ser adicionado
  const [valor, setValor] = useState("");
  // Estado para a categoria do gasto a ser adicionado
  const [categoria, setCategoria] = useState("");
  // Estado para a data do gasto a ser adicionado
  const [data, setData] = useState("");
  // Estado para a descrição do gasto a ser adicionado
  const [descricao, setDescricao] = useState("");

  // Lista de despesas já cadastradas (simulação, poderia vir de uma API ou banco local)
  const [despesas, setDespesas] = useState([
    { id: 1, nome: "Mercado", valor: 100, data: "02/06/2025" },
    { id: 2, nome: "Shopping", valor: 200, data: "03/06/2025" },
  ]);

  // Dados simulados para o gráfico de pizza
  const dadosGrafico = [
    {
      name: "Mercado",
      value: 30,
      color: "#3B82F6", // azul
      legendFontColor: "#FFFFFF",
      legendFontSize: 14,
    },
    {
      name: "Lazer",
      value: 15,
      color: "#8B5CF6", // roxo
      legendFontColor: "#FFFFFF",
      legendFontSize: 14,
    },
    {
      name: "Transporte",
      value: 40,
      color: "#F97316", // laranja
      legendFontColor: "#FFFFFF",
      legendFontSize: 14,
    },
  ];

  // Calcula a largura do gráfico de pizza de acordo com a tela
  const screenWidth = Dimensions.get("window").width - 32;

  // Função para salvar uma nova despesa
  const handleSalvar = () => {
    // Validação simples: todos os campos precisam estar preenchidos
    if (!valor || !categoria || !data || !descricao) {
      alert("Preencha todos os campos antes de salvar.");
      return;
    }
    // Cria um novo objeto de despesa
    const novaDespesa = {
      id: Date.now(),
      nome: categoria.charAt(0).toUpperCase() + categoria.slice(1),
      valor: parseFloat(valor.replace(",", ".")),
      data,
    };
    // Adiciona a nova despesa ao início da lista
    setDespesas([novaDespesa, ...despesas]);
    // Limpa os campos do formulário
    setValor("");
    setCategoria("");
    setData("");
    setDescricao("");
  };

  // Função para cancelar o preenchimento do formulário e limpar os campos
  const handleCancelar = () => {
    setValor("");
    setCategoria("");
    setData("");
    setDescricao("");
  };

  // Cálculos de resumo financeiro
  const rendaTotal = 5000; // Valor fixo de renda (poderia ser dinâmico)
  const gastosTotais = despesas.reduce((sum, d) => sum + d.valor, 0); // Soma dos valores das despesas
  const saldo = rendaTotal - gastosTotais; // Saldo disponível

  return (
    // Centraliza todo o conteúdo na tela e define o fundo
    <Center flex={1} bg="$gray700" px="$4">
      {/* ScrollView permite rolar toda a página para ver todos os blocos */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Bloco de Resumo Financeiro */}
        <Box bg="$gray800" p="$4" rounded="$lg" w="100%" mb="$4">
          {/* Linha com renda e gastos totais */}
          <HStack justifyContent="space-between" mb="$2">
            <Text color="$green500" fontWeight="bold">
              Renda: R$ {rendaTotal.toFixed(2)}
            </Text>
            <Text color="$red500" fontWeight="bold">
              Gastos: R$ {gastosTotais.toFixed(2)}
            </Text>
          </HStack>
          {/* Linha divisória */}
          <Divider bg="$gray600" />
          {/* Saldo disponível */}
          <Text color="$yellow500" fontWeight="bold" mt="$2">
            Saldo: R$ {saldo.toFixed(2)}
          </Text>
        </Box>

        {/* Bloco do Gráfico de Pizza */}
        <Box bg="$gray800" p="$4" rounded="$lg" w="100%" mb="$4">
          <Text color="$white" mb="$2" fontWeight="bold">
            Gráfico de Gastos
          </Text>
          {/* Gráfico de pizza mostrando a distribuição dos gastos por categoria */}
          <PieChart
            data={dadosGrafico}
            width={screenWidth}
            height={220}
            chartConfig={{
              backgroundGradientFrom: "#2d2d2d",
              backgroundGradientTo: "#2d2d2d",
              color: () => `rgba(255, 255, 255, 1)`,
              labelColor: () => `#FFFFFF`,
            }}
            accessor="value"
            backgroundColor="transparent"
            paddingLeft="15"
            center={[0, 0]}
            absolute
          />
        </Box>

        {/* Bloco de Últimos Gastos */}
        <Box bg="$gray800" p="$4" rounded="$lg" w="100%" mb="$4">
          <Text color="$white" mb="$2" fontWeight="bold">
            Últimos Gastos
          </Text>
          {/* Lista de despesas cadastradas, cada uma em uma linha */}
          <VStack space="sm">
            {despesas.map((d) => (
              <HStack
                key={d.id}
                justifyContent="space-between"
                alignItems="center"
              >
                <Text color="$white">
                  • {d.nome}: R$ {d.valor.toFixed(2)}{" "}
                  <Text color="$gray400">({d.data})</Text>
                </Text>
              </HStack>
            ))}
          </VStack>
        </Box>

        {/* Bloco do Formulário para Adicionar Gasto */}
        <Box bg="$gray800" p="$4" rounded="$lg" w="100%" mb="$4">
          <Text color="$white" mb="$2" fontWeight="bold">
            Adicionar Gasto
          </Text>
          {/* Formulário com campos controlados */}
          <VStack space="sm">
            {/* Campo para valor */}
            <Input bg="$gray700">
              <InputField
                placeholder="Valor (R$), ex: 150,00"
                keyboardType="numeric"
                value={valor}
                onChangeText={setValor}
                placeholderTextColor="$gray400"
              />
            </Input>
            {/* Campo para categoria */}
            <Select
              placeholder="Selecione a categoria"
              selectedValue={categoria}
              onValueChange={setCategoria}
              bg="$gray700"
            >
              <Select.Item label="Mercado" value="mercado" />
              <Select.Item label="Lazer" value="lazer" />
              <Select.Item label="Transporte" value="transporte" />
            </Select>
            {/* Campo para data */}
            <Input bg="$gray700">
              <InputField
                placeholder="Data (DD/MM/AAAA)"
                value={data}
                onChangeText={setData}
                placeholderTextColor="$gray400"
              />
            </Input>
            {/* Campo para descrição */}
            <Input bg="$gray700">
              <InputField
                placeholder="Descrição"
                value={descricao}
                onChangeText={setDescricao}
                placeholderTextColor="$gray400"
              />
            </Input>
            {/* Botões de ação */}
            <HStack space="sm" mt="$2">
              {/* Botão para salvar o gasto */}
              <Button bg="$green600" flex={1} onPress={handleSalvar}>
                <Text color="$white">Salvar</Text>
              </Button>
              {/* Botão para cancelar e limpar o formulário */}
              <Button bg="$red600" flex={1} onPress={handleCancelar}>
                <Text color="$white">Cancelar</Text>
              </Button>
            </HStack>
          </VStack>
        </Box>
      </ScrollView>
    </Center>
  );
}