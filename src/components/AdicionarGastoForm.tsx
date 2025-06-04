import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import {
  VStack,
  Text,
  Input,
  InputField,
  Button,
  HStack,
  Box,
} from "@gluestack-ui/themed";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";

// Interface que define as propriedades que o componente deve receber
// categorias: array de strings com as categorias disponíveis
// onSalvar: função callback que será chamada quando um gasto for salvo
interface AdicionarGastoFormProps {
  categorias: string[];
  onSalvar: (gasto: {
    valor: string;
    categoria: string;
    data: string;
    descricao: string;
  }) => void;
}

// Componente principal do formulário de adição de gastos
export function AdicionarGastoForm({
  categorias,
  onSalvar,
}: AdicionarGastoFormProps) {
  // Estados para controlar os valores dos campos do formulário
  const [valor, setValor] = useState("");
  const [categoria, setCategoria] = useState("");
  const [data, setData] = useState("");
  const [descricao, setDescricao] = useState("");

  // Função que lida com o salvamento dos dados
  // Valida se todos os campos estão preenchidos antes de salvar
  const handleSalvar = () => {
    if (!valor || !categoria || !data || !descricao) {
      alert("Preencha todos os campos antes de salvar.");
      return;
    }
    // Chama a função onSalvar passada via props com os dados do formulário
    onSalvar({ valor, categoria, data, descricao });
    // Limpa os campos após salvar
    setValor("");
    setCategoria("");
    setData("");
    setDescricao("");
  };

  // Função para limpar todos os campos do formulário
  const handleCancelar = () => {
    setValor("");
    setCategoria("");
    setData("");
    setDescricao("");
  };

  // Renderização do formulário
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80} // ajuste conforme necessário
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, padding: 16 }}
        keyboardShouldPersistTaps="handled"
      >
        <VStack space="sm">
          {/* Campo para inserir o valor do gasto */}
          <Text fontSize="$sm" color="$gray700">
            Valor:
          </Text>
          <Input bg="$gray100">
            <InputField
              placeholder="R$ 0,00"
              keyboardType="numeric"
              value={valor}
              onChangeText={setValor}
              placeholderTextColor="$gray400"
            />
          </Input>

          {/* Campo de seleção de categoria usando Picker nativo */}
          <Text fontSize="$sm" color="$gray700">
            Categoria:
          </Text>
          <Box
            // envolvemos o Picker num Box para poder estilizar fundo/padding
            bg="$gray100"
            borderRadius="$sm"
            overflow="hidden"
          >
            <Picker
              selectedValue={categoria}
              onValueChange={(itemValue) => setCategoria(itemValue)}
            >
              <Picker.Item label="Selecione a categoria" value="" />
              {categorias.map((cat) => (
                <Picker.Item
                  key={cat}
                  label={cat}
                  value={cat.toLowerCase()}
                />
              ))}
            </Picker>
          </Box>

          {/* Campo para inserir a data do gasto */}
          <Text fontSize="$sm" color="$gray700">
            Data:
          </Text>
          <Input bg="$gray100">
            <InputField
              placeholder="DD/MM/AAAA"
              value={data}
              onChangeText={setData}
              placeholderTextColor="$gray400"
            />
          </Input>

          {/* Campo para inserir a descrição do gasto */}
          <Text fontSize="$sm" color="$gray700">
            Descrição:
          </Text>
          <Input bg="$gray100">
            <InputField
              placeholder="Descrição"
              value={descricao}
              onChangeText={setDescricao}
              placeholderTextColor="$gray400"
            />
          </Input>

          {/* Botões de ação do formulário */}
          <HStack space="sm" mt="$4">
            {/* Botão Salvar - Cor laranja com efeito de pressionar */}
            <Button
              flex={1}
              bg="$orange500"
              $pressed={{ bg: "$orange600" }}
              onPress={handleSalvar}
            >
              <Text color="$white" fontWeight="bold">
                Salvar
              </Text>
            </Button>

            {/* Botão Cancelar - Cor cinza com efeito de pressionar */}
            <Button
              flex={1}
              bg="$gray400"
              $pressed={{ bg: "$gray500" }}
              onPress={handleCancelar}
            >
              <Text color="$white" fontWeight="bold">
                Cancelar
              </Text>
            </Button>
          </HStack>
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
