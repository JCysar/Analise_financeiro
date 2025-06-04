import React, { createContext, useContext, useState } from "react";

interface Despesa {
  id: number;
  nome: string;
  valor: number;
  data: string;
  icone: string;
  descricao: string;
}

interface DespesasContextType {
  despesas: Despesa[];
  adicionarDespesa: (despesa: Despesa) => void;
  renda: number;
  setRenda: (valor: number) => void;
}

const DespesasContext = createContext<DespesasContextType | undefined>(undefined);

export function DespesasProvider({ children }: { children: React.ReactNode }) {
  const [despesas, setDespesas] = useState<Despesa[]>([]);
  const [renda, setRenda] = useState<number>(0);

  function adicionarDespesa(despesa: Despesa) {
    setDespesas((prev) => [despesa, ...prev]);
  }

  return (
    <DespesasContext.Provider value={{ despesas, adicionarDespesa, renda, setRenda }}>
      {children}
    </DespesasContext.Provider>
  );
}

export function useDespesas() {
  const context = useContext(DespesasContext);
  if (!context) throw new Error("useDespesas deve ser usado dentro do DespesasProvider");
  return context;
}