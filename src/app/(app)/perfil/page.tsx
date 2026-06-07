import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Metadata } from "next";
import PerfilForm from "./perfil-form";

export const metadata: Metadata = {
  title: "Perfil | Conttak",
};

export default function PerfilPage() {
  return (
    <div className="flex flex-col gap-8 max-w-2xl">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Perfil</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Gerencie suas informações pessoais e preferências de conta.
        </p>
      </div>

      {/* Avatar */}
      <Card>
        <CardHeader>
          <CardTitle>Foto do perfil</CardTitle>
          <CardDescription>
            Sua foto será exibida no sistema e em comunicações.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted text-2xl font-bold text-muted-foreground">
              J
            </div>
            <div className="flex flex-col gap-2">
              <button className="inline-flex h-9 items-center rounded-md border border-input bg-background px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
                Alterar foto
              </button>
              <p className="text-xs text-muted-foreground">
                JPG, PNG ou GIF. Máximo 2 MB.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Dados pessoais */}
      <Card>
        <CardHeader>
          <CardTitle>Dados pessoais</CardTitle>
          <CardDescription>
            Atualize seu nome e e-mail de acesso.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PerfilForm />
        </CardContent>
      </Card>

      <Separator />

      {/* Zona de perigo */}
      <Card className="border-destructive/40">
        <CardHeader>
          <CardTitle className="text-destructive">Zona de perigo</CardTitle>
          <CardDescription>
            Ações irreversíveis relacionadas à sua conta.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <button className="inline-flex h-10 items-center rounded-md bg-destructive px-4 text-sm font-medium text-destructive-foreground transition-colors hover:bg-destructive/90">
            Excluir conta
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
