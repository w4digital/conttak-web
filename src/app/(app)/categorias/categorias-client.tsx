"use client";

import { ResponsiveDataTable } from "@/components/responsive-data-table";
import { useState } from "react";

type Categoria = {
  id: number;
  nome: string;
  tipo: "despesa" | "receita";
  transacoes: number;
  cor: string;
};

const categoriasSeed: Categoria[] = [
  { id: 1, nome: "Alimentação", tipo: "despesa", transacoes: 12, cor: "#f97316" },
  { id: 2, nome: "Moradia", tipo: "despesa", transacoes: 3, cor: "#8b5cf6" },
  { id: 3, nome: "Saúde", tipo: "despesa", transacoes: 5, cor: "#ef4444" },
  { id: 4, nome: "Transporte", tipo: "despesa", transacoes: 8, cor: "#3b82f6" },
  { id: 5, nome: "Contas fixas", tipo: "despesa", transacoes: 4, cor: "#6b7280" },
  { id: 6, nome: "Lazer", tipo: "despesa", transacoes: 6, cor: "#ec4899" },
  { id: 7, nome: "Renda", tipo: "receita", transacoes: 2, cor: "#10b981" },
  { id: 8, nome: "Investimentos", tipo: "receita", transacoes: 1, cor: "#f59e0b" },
];

const tipoLabel: Record<Categoria["tipo"], string> = {
  despesa: "Despesa",
  receita: "Receita",
};

const tipoCor: Record<Categoria["tipo"], string> = {
  despesa: "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400",
  receita: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
};

export function CategoriasClient() {
  const [categorias, setCategorias] = useState<Categoria[]>(categoriasSeed);

  return (
    <div className="flex h-full flex-col gap-6">
      <div>
        <div>
          <h1 className="text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
            Categorias
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            {categorias.length} categorias cadastradas
          </p>
        </div>
      </div>

      <ResponsiveDataTable
        data={categorias}
        title="categoria"
        createButtonLabel="Nova categoria"
        initialPageSize={5}
        columns={[
          {
            key: "nome",
            label: "Categoria",
            cell: (cat) => (
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: cat.cor }} />
                <span className="font-medium text-zinc-950 dark:text-zinc-50">{cat.nome}</span>
              </div>
            ),
          },
          {
            key: "tipo",
            label: "Tipo",
            cell: (cat) => (
              <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${tipoCor[cat.tipo]}`}>
                {tipoLabel[cat.tipo]}
              </span>
            ),
          },
          {
            key: "transacoes",
            label: "Transações",
            align: "right",
            cell: (cat) => (
              <span className="tabular-nums text-zinc-700 dark:text-zinc-200">{cat.transacoes}</span>
            ),
          },
          {
            key: "cor",
            label: "Cor",
            visibility: "sm",
            cell: (cat) => <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">{cat.cor}</span>,
          },
        ]}
        details={[
          { label: "Categoria", value: (cat) => cat.nome },
          { label: "Tipo", value: (cat) => tipoLabel[cat.tipo] },
          { label: "Transações", value: (cat) => String(cat.transacoes) },
          { label: "Cor", value: (cat) => cat.cor },
        ]}
        formFields={[
          { key: "nome", label: "Nome", required: true, placeholder: "Ex.: Educação" },
          {
            key: "tipo",
            label: "Tipo",
            type: "select",
            required: true,
            options: [
              { label: "Despesa", value: "despesa" },
              { label: "Receita", value: "receita" },
            ],
          },
          { key: "transacoes", label: "Transações", type: "number", required: true },
          { key: "cor", label: "Cor", required: true, placeholder: "#14b8a6" },
        ]}
        onCreate={(payload) => {
          const tipo = (payload.tipo as Categoria["tipo"]) ?? "despesa";
          setCategorias((prev) => {
            const nextId = prev.reduce((acc, categoria) => Math.max(acc, categoria.id), 0) + 1;
            return [
              {
                id: nextId,
                nome: String(payload.nome ?? "Nova categoria"),
                tipo,
                transacoes: Number(payload.transacoes ?? 0),
                cor: String(payload.cor ?? "#6b7280"),
              },
              ...prev,
            ];
          });
        }}
        onUpdate={(row, payload) => {
          setCategorias((prev) =>
            prev.map((item) =>
              item.id === row.id
                ? {
                    ...item,
                    nome: String(payload.nome ?? item.nome),
                    tipo: (payload.tipo as Categoria["tipo"]) ?? item.tipo,
                    transacoes: Number(payload.transacoes ?? item.transacoes),
                    cor: String(payload.cor ?? item.cor),
                  }
                : item
            )
          );
        }}
        onDelete={(row) => {
          setCategorias((prev) => prev.filter((item) => item.id !== row.id));
        }}
      />
    </div>
  );
}
