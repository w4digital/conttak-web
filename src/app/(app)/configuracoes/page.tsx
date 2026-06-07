import type { Metadata } from "next";
import ConfiguracoesClient from "./configuracoes-client";

export const metadata: Metadata = {
  title: "Configurações | Conttak",
};

export default function ConfiguracoesPage() {
  return (
    <div className="flex flex-col gap-8 max-w-2xl">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Configurações</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Gerencie as preferências do sistema.
        </p>
      </div>
      <ConfiguracoesClient />
    </div>
  );
}
