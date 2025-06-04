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

interface AdicionarGastoFormProps {
  categorias: string[];
  onSalvar: (gasto: {
    valor: string;
    categoria: string;
    data: string;
    descricao: string;
  }) => void;
}

export function AdicionarGastoForm({
  categorias,
  onSalvar,
}: AdicionarGastoFormProps) {
  const [valor, setValor] = useState("");
  const [categoria, setCategoria] = useState("");
  const [data, setData] = useState("");
  const [descricao, setDescricao] = useState("");

  const handleSalvar = () => {
    if (!valor || !categoria || !data || !descricao) {
      alert("Preencha todos os campos antes de salvar.");
      return;
    }
    onSalvar({ valor, categoria, data, descricao });
    setValor("");
    setCategoria("");
    setData("");
    setDescricao("");
  };

  const handleCancelar = () => {
    setValor("");
    setCategoria("");
    setData("");
    setDescricao("");
  };

  return (
    <VStack space="sm">
      {/* --- Campo de Valor --- */}
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

      {/* --- Campo de Categoria (com Picker nativo) --- */}
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

      {/* --- Campo de Data --- */}
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

      {/* --- Campo de Descrição --- */}
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

      {/* --- Botões Salvar / Cancelar --- */}
      <HStack space="sm" mt="$4">
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
  );
}
