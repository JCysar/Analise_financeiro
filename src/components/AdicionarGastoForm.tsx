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
    tipo: 'fixo' | 'variavel' | '';
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
  // Estado para categorias customizadas
  const [categoriasCustom, setCategoriasCustom] = useState<string[]>([]);
  // Estado para mostrar input de nova categoria
  const [adicionandoCategoria, setAdicionandoCategoria] = useState(false);
  const [novaCategoria, setNovaCategoria] = useState("");
  // Estado para tipo de gasto
  const [tipo, setTipo] = useState<'fixo' | 'variavel' | ''>('');

  // Função que lida com o salvamento dos dados
  // Valida se todos os campos estão preenchidos antes de salvar
  const handleSalvar = () => {
    if (!valor || !categoria || !data || !descricao || !tipo) {
      alert("Preencha todos os campos antes de salvar.");
      return;
    }
    // Chama a função onSalvar passada via props com os dados do formulário
    onSalvar({ valor, categoria, data, descricao, tipo });
    // Limpa os campos após salvar
    setValor("");
    setCategoria("");
    setData("");
    setDescricao("");
    setTipo('');
  };

  // Função para limpar todos os campos do formulário
  const handleCancelar = () => {
    setValor("");
    setCategoria("");
    setData("");
    setDescricao("");
  };

  // Função para adicionar nova categoria
  const handleAdicionarCategoria = () => {
    if (novaCategoria.trim() && !categoriasCustom.includes(novaCategoria.trim())) {
      setCategoriasCustom([...categoriasCustom, novaCategoria.trim()]);
      setCategoria(novaCategoria.trim().toLowerCase());
      setNovaCategoria("");
      setAdicionandoCategoria(false);
    }
  };

  // Renderização do formulário
  return (
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
          {[...categorias, ...categoriasCustom].map((cat) => (
            <Picker.Item
              key={cat}
              label={cat}
              value={cat.toLowerCase()}
            />
          ))}
        </Picker>
      </Box>
      {/* Botão para adicionar nova categoria */}
      {!adicionandoCategoria ? (
        <Button mt="$2" bg="$orange500" onPress={() => setAdicionandoCategoria(true)}>
          <Text color="$white">Adicionar nova categoria</Text>
        </Button>
      ) : (
        <HStack space="sm" mt="$2" alignItems="center">
          <Input flex={2} bg="$gray100">
            <InputField
              placeholder="Nova categoria"
              value={novaCategoria}
              onChangeText={setNovaCategoria}
            />
          </Input>
          <Button flex={1} bg="$green500" onPress={handleAdicionarCategoria}>
            <Text color="$white">Salvar</Text>
          </Button>
          <Button flex={1} bg="$gray400" onPress={() => { setAdicionandoCategoria(false); setNovaCategoria(""); }}>
            <Text color="$white">Cancelar</Text>
          </Button>
        </HStack>
      )}
      {/* Campo para selecionar tipo de gasto */}
      <Text fontSize="$sm" color="$gray700" mt="$2">
        Tipo de gasto:
      </Text>
      <HStack space="md" mb="$2">
        <Button
          flex={1}
          bg={tipo === 'fixo' ? "$orange500" : "$gray200"}
          onPress={() => setTipo('fixo')}
        >
          <Text color={tipo === 'fixo' ? "$white" : "$gray900"}>Fixo</Text>
        </Button>
        <Button
          flex={1}
          bg={tipo === 'variavel' ? "$orange500" : "$gray200"}
          onPress={() => setTipo('variavel')}
        >
          <Text color={tipo === 'variavel' ? "$white" : "$gray900"}>Variável</Text>
        </Button>
      </HStack>
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
  );
}
