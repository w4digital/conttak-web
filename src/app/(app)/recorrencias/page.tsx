import type { Metadata } from "next";
import { RecorrenciasClient } from "./recorrencias-client";

export const metadata: Metadata = {
  title: "Recorrências | Conttak",
};

export default function RecorrenciasPage() {
  return <RecorrenciasClient />;
}
