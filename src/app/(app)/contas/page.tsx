import type { Metadata } from "next";
import { ContasClient } from "./contas-client";

export const metadata: Metadata = {
  title: "Contas | Conttak",
};

export default function ContasPage() {
  return <ContasClient />;
}
