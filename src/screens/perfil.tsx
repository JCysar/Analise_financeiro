// Tela de Perfil: permite ao usuário visualizar e editar seus dados pessoais e renda
import React, { useState } from "react";
import {
  Center,
  ScrollView,
  VStack,
  Box,
  Text,
  Button,
  Image,
  Pressable,
  Heading,
  Icon,
} from "@gluestack-ui/themed";
import { User as UserIcon, Camera as CameraIcon } from "lucide-react-native";
import { useDespesas } from "../context/ExpensesContext";
import { Alert, Platform } from "react-native";
import { Input } from "@components/input";
import * as ImagePicker from 'expo-image-picker';

// Componente principal da tela de perfil
export function Perfil() {
  // Dados simulados do usuário
  const existingUser = {
    name: "Vinicius Lourenço",
    email: "vinicius.lourenco@example.com",
    phone: "(11) 99999-1234",
  };

  const [name, setName] = useState(existingUser.name);
  const [email, setEmail] = useState(existingUser.email);
  const [phone, setPhone] = useState(existingUser.phone);
  const [income, setIncome] = useState("");
  const [profileImageUri, setProfileImageUri] = useState<string | null>(null);

  const { setRenda } = useDespesas();

  const handleSelectImage = async () => {
    // Request permission to access media library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão Necessária', 'Desculpe, precisamos da permissão da galeria para fazer isso funcionar!');
      return;
    }

    // Launch image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Only allow images
      allowsEditing: true, // Allow user to edit the image (crop, etc.)
      aspect: [1, 1], // Aspect ratio for cropping (square for profile picture)
      quality: 1, // Highest quality
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setProfileImageUri(result.assets[0].uri);
    }
  };

  return (
    <ScrollView flex={1} bg="$gray100" showsVerticalScrollIndicator={false}>
      <VStack space="lg" p="$6" pt="$12">
        
        <Center>
          <Pressable
            onPress={handleSelectImage}
            w={120}
            h={120}
            rounded="$full"
            bg="$coolGray300"
            justifyContent="center"
            alignItems="center"
            mb="$4"
            sx={{ _dark: { bg: "$coolGray700" } }}
          >
            {profileImageUri ? (
              <Image
                source={{ uri: profileImageUri }}
                alt="Foto de perfil"
                w={120}
                h={120}
                rounded="$full"
              />
            ) : (
              <Icon as={UserIcon} size="xl" color="$coolGray500" />
            )}
            <Box
              position="absolute"
              bottom={0}
              right={0}
              bg="$primary500"
              rounded="$full"
              p="$1.5"
            >
              <Icon as={CameraIcon} size="sm" color="$white" />
            </Box>
          </Pressable>
          <Heading size="xl" color="$textDark800" mb="$1">
            Meu Perfil
          </Heading>
          <Text color="$textLight600" fontSize="$md" mb="$6">Edite seus dados e gerencie sua renda.</Text>
        </Center>

        {/* Card de informações do usuário */}
        <Box
          bg="$white"
          rounded="$xl"
          p="$6"
          shadow="md"
          sx={{ _dark: { bg: "$coolGray800" } }}
        >
          {/* Campo Nome */}
          <Text color="$textLight800" fontWeight="$bold" mb="$1">Nome Completo*</Text>
          <Input
            value={name}
            onChangeText={setName}
            placeholder="Seu nome completo"
            rounded="$lg"
          />

          <Box h="$4" />

          {/* Campo E-mail */}
          <Text color="$textLight800" fontWeight="$bold" mb="$1">E-mail*</Text>
          <Input
            value={email}
            onChangeText={setEmail}
            placeholder="Seu e-mail"
            keyboardType="email-address"
            rounded="$lg"
          />
          
          <Box h="$4" />

          {/* Campo Telefone */}
          <Text color="$textLight800" fontWeight="$bold" mb="$1">Telefone</Text>
          <Input
            value={phone}
            onChangeText={setPhone}
            placeholder="(xx) xxxxx-xxxx"
            keyboardType="phone-pad"
            rounded="$lg"
          />

          <Box h="$4" />

          {/* Campo Renda */}
          <Text color="$textLight800" fontWeight="$bold" mb="$1">Renda Mensal (R$)</Text>
          <Input
            value={income}
            onChangeText={setIncome}
            placeholder="Ex: 3500.00"
            keyboardType="numeric"
            rounded="$lg"
          />

          <Box h="$6" />

          {/* Botão para salvar alterações */}
          <Button
            onPress={() => {
              setRenda(Number(income) || 0);
              Alert.alert("Sucesso", "Dados atualizados com sucesso!");
            }}
            bg="#FF9100"
            rounded="$lg"
            size="lg"
            sx={{
                ":pressed": {
                    bg: "$orange700"
                }
            }}
          >
            <Text color="$white" fontWeight="$bold">
              Salvar Alterações
            </Text>
          </Button>
        </Box>
      </VStack>
    </ScrollView>
  );
}
