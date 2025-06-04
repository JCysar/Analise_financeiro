import React, { createContext, useContext, useState } from "react";

interface Despesa {
  id: number;
  nome: string;
  valor: number;
  data: string;
  icone: string;
}

interface DespesasContextType {
  despesas: Despesa[];
  adicionarDespesa: (despesa: Despesa) => void;
}

const DespesasContext = createContext<DespesasContextType | undefined>(undefined);

export function DespesasProvider({ children }: { children: React.ReactNode }) {
  const [despesas, setDespesas] = useState<Despesa[]>([]);

  function adicionarDespesa(despesa: Despesa) {
    setDespesas((prev) => [despesa, ...prev]);
  }

  return (
    <DespesasContext.Provider value={{ despesas, adicionarDespesa }}>
      {children}
    </DespesasContext.Provider>
  );
}

export function useDespesas() {
  const context = useContext(DespesasContext);
  if (!context) throw new Error("useDespesas deve ser usado dentro do DespesasProvider");
  return context;
}