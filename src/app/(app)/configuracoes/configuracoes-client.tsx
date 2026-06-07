"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "next-themes";
import { useState } from "react";

function SwitchRow({
  id,
  label,
  description,
  checked,
  onCheckedChange,
}: {
  id: string;
  label: string;
  description?: string;
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="flex flex-col gap-0.5">
        <Label htmlFor={id} className="cursor-pointer">
          {label}
        </Label>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
      <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}

export default function ConfiguracoesClient() {
  const { theme, setTheme } = useTheme();

  // Geral
  const [moeda, setMoeda] = useState("BRL");
  const [idioma, setIdioma] = useState("pt-BR");

  // Notificações
  const [emailResumo, setEmailResumo] = useState(true);
  const [emailTransacao, setEmailTransacao] = useState(false);
  const [pushLimite, setPushLimite] = useState(true);
  const [pushMeta, setPushMeta] = useState(true);

  // Segurança
  const [senhaAtual, setSenhaAtual] = useState("");
  const [senhaNova, setSenhaNova] = useState("");
  const [senhaConfirm, setSenhaConfirm] = useState("");
  const [saving2fa, setSaving2fa] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);

  async function handleSalvarGeral(e: React.FormEvent) {
    e.preventDefault();
    // TODO: integrar com API
  }

  async function handleSalvarSenha(e: React.FormEvent) {
    e.preventDefault();
    setSaving2fa(true);
    await new Promise((r) => setTimeout(r, 700));
    setSaving2fa(false);
    setSenhaAtual("");
    setSenhaNova("");
    setSenhaConfirm("");
  }

  return (
    <Tabs defaultValue="geral">
      <TabsList className="mb-2">
        <TabsTrigger value="geral">Geral</TabsTrigger>
        <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
        <TabsTrigger value="seguranca">Segurança</TabsTrigger>
      </TabsList>

      {/* GERAL */}
      <TabsContent value="geral">
        <Card>
          <CardHeader>
            <CardTitle>Preferências gerais</CardTitle>
            <CardDescription>
              Configure moeda, idioma e aparência do sistema.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSalvarGeral} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="moeda">Moeda padrão</Label>
                  <select
                    id="moeda"
                    value={moeda}
                    onChange={(e) => setMoeda(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="BRL">BRL — Real brasileiro</option>
                    <option value="USD">USD — Dólar americano</option>
                    <option value="EUR">EUR — Euro</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="idioma">Idioma</Label>
                  <select
                    id="idioma"
                    value={idioma}
                    onChange={(e) => setIdioma(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="pt-BR">Português (Brasil)</option>
                    <option value="en">English</option>
                    <option value="es">Español</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label>Tema</Label>
                <div className="flex gap-3">
                  {(
                    [
                      { value: "light", label: "Claro" },
                      { value: "dark", label: "Escuro" },
                      { value: "system", label: "Sistema" },
                    ] as const
                  ).map((t) => (
                    <button
                      key={t.value}
                      type="button"
                      onClick={() => setTheme(t.value)}
                      className={`flex h-9 items-center rounded-md border px-4 text-sm font-medium capitalize transition-colors ${
                        theme === t.value
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-input bg-background hover:bg-accent"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit">Salvar preferências</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </TabsContent>

      {/* NOTIFICAÇÕES */}
      <TabsContent value="notificacoes">
        <Card>
          <CardHeader>
            <CardTitle>Notificações por e-mail</CardTitle>
            <CardDescription>
              Escolha quais alertas deseja receber por e-mail.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col divide-y divide-border">
            <SwitchRow
              id="email-resumo"
              label="Resumo semanal"
              description="Receba um resumo das suas finanças toda segunda-feira."
              checked={emailResumo}
              onCheckedChange={setEmailResumo}
            />
            <SwitchRow
              id="email-transacao"
              label="Nova transação"
              description="E-mail sempre que uma transação for registrada."
              checked={emailTransacao}
              onCheckedChange={setEmailTransacao}
            />
          </CardContent>
        </Card>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Notificações push</CardTitle>
            <CardDescription>
              Alertas diretos no navegador ou dispositivo.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col divide-y divide-border">
            <SwitchRow
              id="push-limite"
              label="Limite de gasto atingido"
              description="Avise quando uma categoria ultrapassar o limite definido."
              checked={pushLimite}
              onCheckedChange={setPushLimite}
            />
            <SwitchRow
              id="push-meta"
              label="Progresso de meta"
              description="Atualizações sobre suas metas financeiras."
              checked={pushMeta}
              onCheckedChange={setPushMeta}
            />
          </CardContent>
        </Card>
      </TabsContent>

      {/* SEGURANÇA */}
      <TabsContent value="seguranca">
        <Card>
          <CardHeader>
            <CardTitle>Alterar senha</CardTitle>
            <CardDescription>
              Use uma senha forte com pelo menos 8 caracteres.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSalvarSenha} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="senha-atual">Senha atual</Label>
                <Input
                  id="senha-atual"
                  type="password"
                  value={senhaAtual}
                  onChange={(e) => setSenhaAtual(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="senha-nova">Nova senha</Label>
                <Input
                  id="senha-nova"
                  type="password"
                  value={senhaNova}
                  onChange={(e) => setSenhaNova(e.target.value)}
                  minLength={8}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="senha-confirm">Confirmar nova senha</Label>
                <Input
                  id="senha-confirm"
                  type="password"
                  value={senhaConfirm}
                  onChange={(e) => setSenhaConfirm(e.target.value)}
                  minLength={8}
                  required
                />
              </div>
              <div className="flex justify-end">
                <Button type="submit" disabled={saving2fa}>
                  {saving2fa ? "Salvando..." : "Atualizar senha"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Autenticação em dois fatores</CardTitle>
            <CardDescription>
              Adicione uma camada extra de segurança à sua conta.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Separator className="mb-4" />
            <SwitchRow
              id="2fa"
              label="Ativar 2FA"
              description="Após ativar, você precisará de um código adicional ao entrar."
              checked={twoFactor}
              onCheckedChange={setTwoFactor}
            />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
