"use client";

import { MoreHorizontal, Plus, X } from "lucide-react";
import { useMemo, useState } from "react";

type Parcelamento = {
  id: string;
  nome: string;
  parcelaAtual: number;
  totalParcelas: number;
  valorMensal: number;
  restante: number;
  dataInicial: string;
  dataFinal: string;
  conta: string;
  categoria: string;
};

const seed: Parcelamento[] = [
  { id: "p1", nome: "Notebook Dell", parcelaAtual: 4, totalParcelas: 12, valorMensal: 200, restante: 1600, dataInicial: "2026-01-15", dataFinal: "2026-12-15", conta: "Caixa", categoria: "Tecnologia" },
  { id: "p2", nome: "Curso Product Design", parcelaAtual: 7, totalParcelas: 10, valorMensal: 180, restante: 540, dataInicial: "2025-12-10", dataFinal: "2026-09-10", conta: "Inter", categoria: "Educação" },
  { id: "p3", nome: "Seguro Auto", parcelaAtual: 2, totalParcelas: 6, valorMensal: 430, restante: 1720, dataInicial: "2026-04-08", dataFinal: "2026-09-08", conta: "Nubank", categoria: "Veículo" },
];

function brl(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function addMonths(dateStr: string, months: number): Date {
  const d = new Date(dateStr + "T00:00:00");
  d.setMonth(d.getMonth() + months);
  return d;
}

function gerarCronograma(item: Parcelamento) {
  return Array.from({ length: item.totalParcelas }, (_, i) => {
    const d = addMonths(item.dataInicial, i);
    return {
      num: i + 1,
      data: d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" }),
      valor: item.valorMensal,
      paga: i < item.parcelaAtual,
    };
  });
}

type DrawerMode = "create" | "edit" | "details" | null;

export function ParcelamentosClient() {
  const [items, setItems] = useState<Parcelamento[]>(seed);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [drawer, setDrawer] = useState<DrawerMode>(null);
  const [selected, setSelected] = useState<Parcelamento | null>(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const [nome, setNome] = useState("");
  const [valorTotal, setValorTotal] = useState("");
  const [parcelas, setParcelas] = useState("12");
  const [dataInicial, setDataInicial] = useState("");
  const [conta, setConta] = useState("Nubank");
  const [categoria, setCategoria] = useState("Tecnologia");

  const comprometimento = useMemo(() => items.reduce((acc, item) => acc + item.valorMensal, 0), [items]);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 1600);
  }

  function abrirNovo() {
    setDrawer("create");
    setSelected(null);
    setNome(""); setValorTotal(""); setParcelas("12"); setDataInicial("");
    setConta("Nubank"); setCategoria("Tecnologia");
    setErrors({});
  }

  function abrirEditar(item: Parcelamento) {
    setDrawer("edit");
    setSelected(item);
    setNome(item.nome);
    setValorTotal(String(Math.round(item.valorMensal * item.totalParcelas)));
    setParcelas(String(item.totalParcelas));
    setDataInicial(item.dataInicial);
    setConta(item.conta);
    setCategoria(item.categoria);
    setErrors({});
  }

  function abrirDetalhes(item: Parcelamento) {
    setSelected(item);
    setDrawer("details");
  }

  function salvar() {
    const errs: Record<string, boolean> = {};
    if (!nome.trim()) errs.nome = true;
    if (!valorTotal) errs.valorTotal = true;
    if (!parcelas) errs.parcelas = true;
    if (!dataInicial) errs.dataInicial = true;
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      showToast("Preencha os campos obrigatórios.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const total = Number(valorTotal);
      const qtd = Number(parcelas);
      const mensal = total / Math.max(1, qtd);
      const dataFim = addMonths(dataInicial, qtd - 1).toISOString().split("T")[0];

      if (drawer === "edit" && selected) {
        setItems((prev) => prev.map((item) => item.id === selected.id ? {
          ...item, nome, totalParcelas: qtd, valorMensal: mensal,
          restante: Math.max(0, (qtd - item.parcelaAtual) * mensal),
          dataInicial, dataFinal: dataFim, conta, categoria,
        } : item));
        showToast("Parcelamento atualizado.");
      } else {
        const novo: Parcelamento = {
          id: crypto.randomUUID(), nome, parcelaAtual: 1, totalParcelas: qtd,
          valorMensal: mensal, restante: Math.max(0, (qtd - 1) * mensal),
          dataInicial, dataFinal: dataFim, conta, categoria,
        };
        setItems((prev) => [novo, ...prev]);
        showToast("Parcelamento criado.");
      }

      setLoading(false);
      setDrawer(null);
      setSelected(null);
    }, 700);
  }

  function excluir(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id));
    setDrawer(null);
    setSelected(null);
    showToast("Parcelamento removido.");
  }

  function quitar(item: Parcelamento) {
    setItems((prev) => prev.map((e) => e.id === item.id ? { ...e, parcelaAtual: e.totalParcelas, restante: 0 } : e));
    setMenuOpen(null);
    setDrawer(null);
    showToast("Parcelamento quitado antecipadamente.");
  }

  const inputCls = (field: string) =>
    `h-10 w-full rounded-lg border px-3 bg-transparent ${errors[field] ? "border-red-500 bg-red-50 dark:bg-red-900/20" : "border-black/[.08] dark:border-white/[.08]"}`;

  const cronograma = selected && drawer === "details" ? gerarCronograma(selected) : [];

  return (
    <>
      {toast ? <div className="fixed right-4 top-20 z-[80] rounded-lg bg-zinc-900 px-3 py-2 text-sm text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900">{toast}</div> : null}

      <div className="flex flex-col gap-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-950 dark:text-zinc-50">Parcelamentos</h1>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Acompanhe compromissos parcelados e o impacto no fluxo mensal.</p>
          </div>
          <button onClick={abrirNovo} className="inline-flex h-10 items-center gap-2 rounded-full bg-zinc-950 px-4 text-sm font-medium text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900">
            <Plus className="h-4 w-4" /> Novo Parcelamento
          </button>
        </div>

        <section className="rounded-2xl border border-black/[.08] bg-white p-5 dark:border-white/[.08] dark:bg-zinc-900">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Comprometimento mensal atual</p>
          <p className="mt-2 text-3xl font-semibold text-zinc-950 dark:text-zinc-50">{brl(comprometimento)}</p>
        </section>

        <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          {items.map((item) => {
            const progresso = Math.round((item.parcelaAtual / item.totalParcelas) * 100);
            return (
              <article key={item.id} className="rounded-2xl border border-black/[.08] bg-white p-5 dark:border-white/[.08] dark:bg-zinc-900">
                <div className="mb-2 flex items-start justify-between gap-2">
                  <button
                    className="text-left text-base font-semibold text-zinc-950 hover:underline dark:text-zinc-50"
                    onClick={() => abrirDetalhes(item)}
                  >
                    {item.nome}
                  </button>
                  <div className="relative">
                    <button
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800"
                      onClick={() => setMenuOpen((prev) => prev === item.id ? null : item.id)}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                    {menuOpen === item.id ? (
                      <div className="absolute right-0 top-9 z-20 w-48 rounded-lg border border-black/[.08] bg-white p-1 shadow dark:border-white/[.08] dark:bg-zinc-900">
                        <button className="block w-full rounded px-2 py-1 text-left text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800" onClick={() => { abrirDetalhes(item); setMenuOpen(null); }}>Ver detalhes</button>
                        <button className="block w-full rounded px-2 py-1 text-left text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800" onClick={() => { abrirEditar(item); setMenuOpen(null); }}>Editar</button>
                        <button className="block w-full rounded px-2 py-1 text-left text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800" onClick={() => quitar(item)}>Quitar antecipadamente</button>
                        <button className="block w-full rounded px-2 py-1 text-left text-sm text-red-600 hover:bg-zinc-100 dark:hover:bg-zinc-800" onClick={() => { excluir(item.id); setMenuOpen(null); }}>Excluir</button>
                      </div>
                    ) : null}
                  </div>
                </div>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{item.parcelaAtual}/{item.totalParcelas} parcelas pagas</p>
                <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                  <div className="h-full rounded-full bg-zinc-900 dark:bg-zinc-100" style={{ width: `${progresso}%` }} />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div><p className="text-zinc-500 dark:text-zinc-400">Valor mensal</p><p className="mt-1 font-semibold">{brl(item.valorMensal)}</p></div>
                  <div><p className="text-zinc-500 dark:text-zinc-400">Restante</p><p className="mt-1 font-semibold">{brl(item.restante)}</p></div>
                  <div><p className="text-zinc-500 dark:text-zinc-400">Data final</p><p className="mt-1 font-medium">{new Date(item.dataFinal + "T00:00:00").toLocaleDateString("pt-BR")}</p></div>
                  <div><p className="text-zinc-500 dark:text-zinc-400">Conta</p><p className="mt-1 font-medium">{item.conta}</p></div>
                </div>
              </article>
            );
          })}
        </section>
      </div>

      {drawer ? (
        <>
          <div className="fixed inset-0 z-40 bg-black/40" onClick={() => !loading && setDrawer(null)} />
          <aside className="fixed inset-y-0 right-0 z-50 w-full max-w-lg overflow-y-auto border-l border-black/[.08] bg-white p-6 dark:border-white/[.08] dark:bg-zinc-900">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                  {drawer === "create" ? "Novo Parcelamento" : drawer === "edit" ? "Editar Parcelamento" : selected?.nome ?? "Detalhes"}
                </h3>
                {drawer === "details" && selected ? (
                  <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{selected.categoria} · {selected.conta}</p>
                ) : null}
              </div>
              <button className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800" onClick={() => setDrawer(null)}>
                <X className="h-4 w-4" />
              </button>
            </div>

            {drawer === "details" && selected ? (
              <div className="mt-5 space-y-5">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl border border-black/[.08] p-3 dark:border-white/[.08]">
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Valor Total</p>
                    <p className="mt-1 font-semibold">{brl(selected.valorMensal * selected.totalParcelas)}</p>
                  </div>
                  <div className="rounded-xl border border-black/[.08] p-3 dark:border-white/[.08]">
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Valor Mensal</p>
                    <p className="mt-1 font-semibold">{brl(selected.valorMensal)}</p>
                  </div>
                  <div className="rounded-xl border border-black/[.08] p-3 dark:border-white/[.08]">
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Parcelas Pagas</p>
                    <p className="mt-1 font-semibold">{selected.parcelaAtual} de {selected.totalParcelas}</p>
                  </div>
                  <div className="rounded-xl border border-black/[.08] p-3 dark:border-white/[.08]">
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Restante</p>
                    <p className="mt-1 font-semibold text-red-500">{brl(selected.restante)}</p>
                  </div>
                </div>

                <div>
                  <div className="mb-1 flex justify-between text-xs text-zinc-500 dark:text-zinc-400">
                    <span>Progresso</span>
                    <span>{Math.round((selected.parcelaAtual / selected.totalParcelas) * 100)}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                    <div className="h-full rounded-full bg-zinc-900 dark:bg-zinc-100" style={{ width: `${Math.round((selected.parcelaAtual / selected.totalParcelas) * 100)}%` }} />
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 text-sm font-semibold text-zinc-950 dark:text-zinc-50">Cronograma das Parcelas</h4>
                  <div className="max-h-52 space-y-1 overflow-y-auto pr-1">
                    {cronograma.map((parcela) => (
                      <div
                        key={parcela.num}
                        className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm ${
                          parcela.paga
                            ? "bg-zinc-100 text-zinc-400 line-through dark:bg-zinc-800/60"
                            : "border border-black/[.06] dark:border-white/[.06]"
                        }`}
                      >
                        <span>Parcela {parcela.num}/{selected.totalParcelas} · {parcela.data}</span>
                        <span className={parcela.paga ? "" : "font-semibold text-red-500"}>{brl(parcela.valor)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {selected.restante > 0 ? (
                  <div className="rounded-xl border border-amber-200/60 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
                    <p className="font-semibold">Impacto futuro</p>
                    <p className="mt-1">
                      {selected.totalParcelas - selected.parcelaAtual} parcelas restantes, totalizando {brl(selected.restante)} nos próximos {selected.totalParcelas - selected.parcelaAtual} meses.
                    </p>
                  </div>
                ) : (
                  <div className="rounded-xl border border-emerald-200/60 bg-emerald-50 p-3 text-sm text-emerald-900 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200">
                    <p className="font-semibold">✓ Parcelamento quitado</p>
                    <p className="mt-1">Todas as parcelas foram pagas.</p>
                  </div>
                )}

                <div className="flex justify-end gap-2">
                  <button className="h-10 rounded-lg border border-black/[.08] px-3 text-sm dark:border-white/[.08]" onClick={() => abrirEditar(selected)}>Editar</button>
                  <button className="h-10 rounded-lg border border-red-200 px-3 text-sm text-red-600 dark:border-red-800" onClick={() => excluir(selected.id)}>Excluir</button>
                  {selected.restante > 0 ? (
                    <button className="h-10 rounded-lg bg-zinc-950 px-3 text-sm text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900" onClick={() => quitar(selected)}>Quitar agora</button>
                  ) : null}
                </div>
              </div>
            ) : (
              <>
                <div className="mt-5 grid gap-3">
                  <label className="text-sm">
                    <span className="mb-1 block">Nome</span>
                    <input className={inputCls("nome")} value={nome} onChange={(e) => { setNome(e.target.value); setErrors((p) => ({ ...p, nome: false })); }} />
                  </label>
                  <label className="text-sm">
                    <span className="mb-1 block">Valor Total</span>
                    <input className={inputCls("valorTotal")} placeholder="2400,00" value={valorTotal} onChange={(e) => { setValorTotal(e.target.value); setErrors((p) => ({ ...p, valorTotal: false })); }} />
                  </label>
                  <label className="text-sm">
                    <span className="mb-1 block">Quantidade de Parcelas</span>
                    <input type="number" min={2} className={inputCls("parcelas")} value={parcelas} onChange={(e) => { setParcelas(e.target.value); setErrors((p) => ({ ...p, parcelas: false })); }} />
                  </label>
                  <label className="text-sm">
                    <span className="mb-1 block">Data Inicial</span>
                    <input type="date" className={inputCls("dataInicial")} value={dataInicial} onChange={(e) => { setDataInicial(e.target.value); setErrors((p) => ({ ...p, dataInicial: false })); }} />
                  </label>
                  <label className="text-sm">
                    <span className="mb-1 block">Conta</span>
                    <select className="h-10 w-full rounded-lg border border-black/[.08] bg-transparent px-3 dark:border-white/[.08]" value={conta} onChange={(e) => setConta(e.target.value)}>
                      <option>Nubank</option><option>Inter</option><option>Caixa</option><option>Carteira</option>
                    </select>
                  </label>
                  <label className="text-sm">
                    <span className="mb-1 block">Categoria</span>
                    <select className="h-10 w-full rounded-lg border border-black/[.08] bg-transparent px-3 dark:border-white/[.08]" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                      <option>Tecnologia</option><option>Educação</option><option>Veículo</option><option>Moradia</option><option>Saúde</option>
                    </select>
                  </label>
                  {valorTotal && parcelas && Number(parcelas) > 0 ? (
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Valor por parcela: <strong>{brl(Number(valorTotal) / Number(parcelas))}</strong>
                    </p>
                  ) : null}
                </div>
                <div className="mt-5 flex justify-end gap-2">
                  <button className="h-10 rounded-lg border border-black/[.08] px-4 text-sm dark:border-white/[.08]" onClick={() => setDrawer(null)} disabled={loading}>Cancelar</button>
                  <button className="h-10 rounded-lg bg-zinc-950 px-4 text-sm text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900" onClick={salvar} disabled={loading}>
                    {loading ? "Salvando..." : "Salvar"}
                  </button>
                </div>
              </>
            )}
          </aside>
        </>
      ) : null}
    </>
  );
}
