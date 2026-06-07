"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function PerfilForm() {
  const [nome, setNome] = useState("João Silva");
  const [email, setEmail] = useState("joao@exemplo.com");
  const [telefone, setTelefone] = useState("+55 11 91234-5678");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    // TODO: integrar com API
    await new Promise((r) => setTimeout(r, 700));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="nome">Nome completo</Label>
          <Input
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Seu nome"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="telefone">Telefone</Label>
          <Input
            id="telefone"
            type="tel"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            placeholder="+55 11 99999-9999"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="voce@exemplo.com"
          required
        />
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={saving}>
          {saving ? "Salvando..." : "Salvar alterações"}
        </Button>
        {saved && (
          <span className="text-sm text-emerald-600 dark:text-emerald-400">
            ✓ Salvo com sucesso
          </span>
        )}
      </div>
    </form>
  );
}
