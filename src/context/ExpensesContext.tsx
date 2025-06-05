import React, { createContext, useContext, useState } from "react";

// Interface que define o formato de uma despesa
interface Despesa {
  id: number; // Identificador único da despesa
  nome: string; // Nome da despesa
  valor: number; // Valor da despesa
  data: string; // Data da despesa
  icone: string; // Ícone associado à despesa
  descricao: string; // Descrição detalhada da despesa
}

// Interface que define o formato do contexto das despesas
interface DespesasContextType {
  despesas: Despesa[]; // Lista de despesas
  adicionarDespesa: (despesa: Despesa) => void; // Função para adicionar uma nova despesa
  renda: number; // Valor da renda total
  setRenda: (valor: number) => void; // Função para atualizar a renda
}

// Cria o contexto das despesas, inicialmente indefinido
const DespesasContext = createContext<DespesasContextType | undefined>(undefined);

// Componente provedor do contexto das despesas
export function DespesasProvider({ children }: { children: React.ReactNode }) {
  // Estado para armazenar a lista de despesas
  const [despesas, setDespesas] = useState<Despesa[]>([]);
  // Estado para armazenar o valor da renda
  const [renda, setRenda] = useState<number>(0);

  // Função para adicionar uma nova despesa à lista
  function adicionarDespesa(despesa: Despesa) {
    setDespesas((prev) => [despesa, ...prev]); // Adiciona a nova despesa no início da lista
  }

  // Retorna o provedor do contexto, disponibilizando os valores e funções para os componentes filhos
  return (
    <DespesasContext.Provider value={{ despesas, adicionarDespesa, renda, setRenda }}>
      {children}
    </DespesasContext.Provider>
  );
}

// Hook personalizado para acessar o contexto das despesas
export function useDespesas() {
  const context = useContext(DespesasContext);
  // Garante que o hook seja usado dentro do provedor
  if (!context) throw new Error("useDespesas deve ser usado dentro do DespesasProvider");
  return context;
}