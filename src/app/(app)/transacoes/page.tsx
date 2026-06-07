import type { Metadata } from "next";
import { TransacoesClient } from "./transacoes-client";

export const metadata: Metadata = {
  title: "Transações | Conttak",
};

export default function TransacoesPage() {
  return <TransacoesClient />;
}
