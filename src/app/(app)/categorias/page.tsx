import type { Metadata } from "next";
import { CategoriasClient } from "./categorias-client";

export const metadata: Metadata = {
  title: "Categorias | Conttak",
};

export default function CategoriasPage() {
  return <CategoriasClient />;
}
