"use client";

import { ResponsiveDataTable } from "@/components/responsive-data-table";
import { useState } from "react";

type Tipo = "receita" | "despesa" | "transferencia";

type Transacao = {
  id: number;
  descricao: string;
  categoria: string;
  conta: string;
  tipo: Tipo;
  valor: number;
  data: string;
};

const transacoesSeed: Transacao[] = [
  { id: 1, descricao: "Salário", categoria: "Renda", conta: "Nubank", tipo: "receita", valor: 6000, data: "2026-05-01" },
  { id: 2, descricao: "Aluguel", categoria: "Moradia", conta: "Bradesco", tipo: "despesa", valor: 1500, data: "2026-05-05" },
  { id: 3, descricao: "Supermercado", categoria: "Alimentação", conta: "Cartão Nubank", tipo: "despesa", valor: 320, data: "2026-05-06" },
  { id: 4, descricao: "Freelance", categoria: "Renda", conta: "Nubank", tipo: "receita", valor: 2300, data: "2026-05-10" },
  { id: 5, descricao: "Farmácia", categoria: "Saúde", conta: "Carteira", tipo: "despesa", valor: 87.5, data: "2026-05-12" },
  { id: 6, descricao: "Internet", categoria: "Contas fixas", conta: "Bradesco", tipo: "despesa", valor: 110, data: "2026-05-13" },
  { id: 7, descricao: "Restaurante", categoria: "Alimentação", conta: "Cartão Nubank", tipo: "despesa", valor: 96, data: "2026-05-15" },
  { id: 8, descricao: "Transferência para carteira", categoria: "Transferência", conta: "Nubank", tipo: "transferencia", valor: 200, data: "2026-05-18" },
];

const tipoConfig: Record<Tipo, { label: string; cor: string }> = {
  receita: { label: "Receita", cor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400" },
  despesa: { label: "Despesa", cor: "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400" },
  transferencia: { label: "Transferência", cor: "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400" },
};

function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("pt-BR");
}

export function TransacoesClient() {
  const [transacoes, setTransacoes] = useState<Transacao[]>(transacoesSeed);

  return (
    <div className="flex h-full flex-col gap-6">
      <div>
        <div>
          <h1 className="text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
            Transações
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Maio de 2026 · {transacoes.length} lançamentos
          </p>
        </div>
      </div>

      <ResponsiveDataTable
        data={transacoes}
        title="transação"
        createButtonLabel="Nova transação"
        initialPageSize={5}
        columns={[
          {
            key: "descricao",
            label: "Descrição",
            cell: (t) => (
              <span className="font-medium text-zinc-950 dark:text-zinc-50">{t.descricao}</span>
            ),
          },
          {
            key: "tipo",
            label: "Tipo",
            cell: (t) => (
              <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${tipoConfig[t.tipo].cor}`}>
                {tipoConfig[t.tipo].label}
              </span>
            ),
          },
          {
            key: "valor",
            label: "Valor",
            align: "right",
            cell: (t) => (
              <span
                className={`font-medium tabular-nums ${
                  t.tipo === "receita"
                    ? "text-emerald-600 dark:text-emerald-400"
                    : t.tipo === "despesa"
                    ? "text-red-500 dark:text-red-400"
                    : "text-zinc-600 dark:text-zinc-400"
                }`}
              >
                {t.tipo === "receita" ? "+" : t.tipo === "despesa" ? "-" : ""}
                {formatBRL(t.valor)}
              </span>
            ),
          },
          {
            key: "data",
            label: "Data",
            visibility: "sm",
            cell: (t) => (
              <span className="text-zinc-500 dark:text-zinc-400 tabular-nums">{formatDate(t.data)}</span>
            ),
          },
          {
            key: "categoria",
            label: "Categoria",
            visibility: "md",
            cell: (t) => <span className="text-zinc-600 dark:text-zinc-400">{t.categoria}</span>,
          },
          {
            key: "conta",
            label: "Conta",
            visibility: "lg",
            cell: (t) => <span className="text-zinc-600 dark:text-zinc-400">{t.conta}</span>,
          },
        ]}
        details={[
          { label: "Descrição", value: (t) => t.descricao },
          { label: "Data", value: (t) => formatDate(t.data) },
          { label: "Tipo", value: (t) => tipoConfig[t.tipo].label },
          { label: "Categoria", value: (t) => t.categoria },
          { label: "Conta", value: (t) => t.conta },
          {
            label: "Valor",
            value: (t) => `${t.tipo === "receita" ? "+" : t.tipo === "despesa" ? "-" : ""}${formatBRL(t.valor)}`,
          },
        ]}
        formFields={[
          { key: "descricao", label: "Descrição", required: true, placeholder: "Ex.: Mercado" },
          { key: "categoria", label: "Categoria", required: true, placeholder: "Ex.: Alimentação" },
          { key: "conta", label: "Conta", required: true, placeholder: "Ex.: Nubank" },
          {
            key: "tipo",
            label: "Tipo",
            type: "select",
            required: true,
            options: [
              { label: "Receita", value: "receita" },
              { label: "Despesa", value: "despesa" },
              { label: "Transferência", value: "transferencia" },
            ],
          },
          { key: "valor", label: "Valor", type: "number", required: true },
          { key: "data", label: "Data", type: "date", required: true },
        ]}
        onCreate={(payload) => {
          const tipo = (payload.tipo as Tipo) ?? "despesa";
          setTransacoes((prev) => {
            const nextId = prev.reduce((acc, item) => Math.max(acc, item.id), 0) + 1;
            return [
              {
                id: nextId,
                descricao: String(payload.descricao ?? "Sem descrição"),
                categoria: String(payload.categoria ?? "Sem categoria"),
                conta: String(payload.conta ?? "Sem conta"),
                tipo,
                valor: Number(payload.valor ?? 0),
                data: String(payload.data ?? "2026-05-01"),
              },
              ...prev,
            ];
          });
        }}
        onUpdate={(row, payload) => {
          setTransacoes((prev) =>
            prev.map((item) =>
              item.id === row.id
                ? {
                    ...item,
                    descricao: String(payload.descricao ?? item.descricao),
                    categoria: String(payload.categoria ?? item.categoria),
                    conta: String(payload.conta ?? item.conta),
                    tipo: (payload.tipo as Tipo) ?? item.tipo,
                    valor: Number(payload.valor ?? item.valor),
                    data: String(payload.data ?? item.data),
                  }
                : item
            )
          );
        }}
        onDelete={(row) => {
          setTransacoes((prev) => prev.filter((item) => item.id !== row.id));
        }}
      />
    </div>
  );
}
