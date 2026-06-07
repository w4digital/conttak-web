"use client";

import { MoreHorizontal, Plus, X } from "lucide-react";
import { useState } from "react";

type Rec = {
  id: string;
  nome: string;
  tipo: "Entrada" | "Saída";
  valor: string;
  frequencia: string;
  primeira: string;
  final?: string;
  conta: string;
  categoria: string;
  status: "Ativa" | "Pausada" | "Encerrada";
};

const seed: Rec[] = [
  { id: "r1", nome: "Salário", tipo: "Entrada", valor: "+R$ 6.800,00", frequencia: "Mensal", primeira: "2026-06-05", conta: "Caixa", categoria: "Renda", status: "Ativa" },
  { id: "r2", nome: "Internet", tipo: "Saída", valor: "-R$ 120,00", frequencia: "Mensal", primeira: "2026-05-30", conta: "Nubank", categoria: "Moradia", status: "Ativa" },
  { id: "r3", nome: "Academia", tipo: "Saída", valor: "-R$ 119,90", frequencia: "Mensal", primeira: "2026-05-29", conta: "Nubank", categoria: "Saúde", status: "Ativa" },
];

export function RecorrenciasClient() {
  const [items, setItems] = useState<Rec[]>(seed);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [drawer, setDrawer] = useState<"create" | "edit" | null>(null);
  const [selected, setSelected] = useState<Rec | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState<"Entrada" | "Saída">("Saída");
  const [valor, setValor] = useState("");
  const [frequencia, setFrequencia] = useState("Mensal");
  const [primeira, setPrimeira] = useState("");
  const [final, setFinal] = useState("");
  const [conta, setConta] = useState("Nubank");
  const [categoria, setCategoria] = useState("Moradia");

  function abrirNovo() {
    setDrawer("create");
    setSelected(null);
    setNome(""); setTipo("Saída"); setValor(""); setFrequencia("Mensal");
    setPrimeira(""); setFinal(""); setConta("Nubank"); setCategoria("Moradia");
    setErrors({});
  }

  function abrirEditar(item: Rec) {
    setDrawer("edit");
    setSelected(item);
    setNome(item.nome);
    setTipo(item.tipo);
    setValor(item.valor.replace("+R$", "").replace("-R$", "").trim());
    setFrequencia(item.frequencia);
    setPrimeira(item.primeira);
    setFinal(item.final ?? "");
    setConta(item.conta);
    setCategoria(item.categoria);
    setErrors({});
  }

  function salvar() {
    const errs: Record<string, boolean> = {};
    if (!nome.trim()) errs.nome = true;
    if (!valor.trim()) errs.valor = true;
    if (!primeira) errs.primeira = true;
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setToast("Preencha os campos obrigatórios.");
      setTimeout(() => setToast(null), 1500);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const novo: Rec = {
        id: selected?.id ?? crypto.randomUUID(),
        nome,
        tipo,
        valor: `${tipo === "Entrada" ? "+" : "-"}R$ ${valor}`,
        frequencia,
        primeira,
        final: final || undefined,
        conta,
        categoria,
        status: "Ativa",
      };

      setItems((prev) => drawer === "edit" && selected ? prev.map((item) => item.id === selected.id ? novo : item) : [novo, ...prev]);
      setLoading(false);
      setDrawer(null);
      setSelected(null);
      setToast(drawer === "edit" ? "Recorrência atualizada." : "Recorrência criada.");
      setTimeout(() => setToast(null), 1600);
    }, 700);
  }

  function alterarStatus(id: string, status: Rec["status"]) {
    setItems((prev) => prev.map((item) => item.id === id ? { ...item, status } : item));
    setToast(`Recorrência ${status.toLowerCase()}.`);
    setTimeout(() => setToast(null), 1500);
  }

  function excluir(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id));
    setToast("Recorrência excluída.");
    setTimeout(() => setToast(null), 1500);
  }

  const diasCalendario = items.slice(0, 6).map((item) => ({ dia: new Date(item.primeira + "T00:00:00").toLocaleDateString("pt-BR", { day: "2-digit" }), label: item.nome }));

  return (
    <>
      {toast ? <div className="fixed right-4 top-20 z-[80] rounded-lg bg-zinc-900 px-3 py-2 text-sm text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900">{toast}</div> : null}

      <div className="flex flex-col gap-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-950 dark:text-zinc-50">Recorrências</h1>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Despesas e receitas que se repetem automaticamente no tempo.</p>
          </div>
          <button onClick={abrirNovo} className="inline-flex h-10 items-center gap-2 rounded-full bg-zinc-950 px-4 text-sm font-medium text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900"><Plus className="h-4 w-4" /> Nova Recorrência</button>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_360px]">
          <section className="rounded-2xl border border-black/[.08] bg-white dark:border-white/[.08] dark:bg-zinc-900">
            <div className="overflow-x-auto">
              <div className="min-w-[920px]">
                <div className="grid grid-cols-[1fr_0.7fr_0.7fr_0.7fr_0.7fr_0.9fr_0.8fr] border-b border-black/[.06] px-4 py-3 text-xs font-medium uppercase tracking-wide text-zinc-500 dark:border-white/[.06] dark:text-zinc-400 sm:px-5">
                  <span>Item</span><span>Valor</span><span>Frequência</span><span>Primeira</span><span>Conta</span><span>Status</span><span className="text-right">Ações</span>
                </div>
                <ul className="divide-y divide-black/[.04] dark:divide-white/[.04]">
                  {items.map((item) => (
                    <li key={item.id} className="grid grid-cols-[1fr_0.7fr_0.7fr_0.7fr_0.7fr_0.9fr_0.8fr] items-center px-4 py-3 text-sm sm:px-5">
                      <span className="font-medium">{item.nome}</span>
                      <span className={item.tipo === "Entrada" ? "text-emerald-600 font-semibold" : "text-red-500 font-semibold"}>{item.valor}</span>
                      <span>{item.frequencia}</span>
                      <span>{new Date(item.primeira + "T00:00:00").toLocaleDateString("pt-BR")}</span>
                      <span>{item.conta}</span>
                      <span className="text-xs font-medium">{item.status}</span>
                      <div className="relative flex justify-end">
                        <button className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800" onClick={() => setMenuOpen((prev) => prev === item.id ? null : item.id)}><MoreHorizontal className="h-4 w-4" /></button>
                        {menuOpen === item.id ? (
                          <div className="absolute right-0 top-9 z-20 w-40 rounded-lg border border-black/[.08] bg-white p-1 shadow dark:border-white/[.08] dark:bg-zinc-900">
                            <button className="block w-full rounded px-2 py-1 text-left text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800" onClick={() => { abrirEditar(item); setMenuOpen(null); }}>Editar</button>
                            <button className="block w-full rounded px-2 py-1 text-left text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800" onClick={() => { alterarStatus(item.id, "Pausada"); setMenuOpen(null); }}>Pausar</button>
                            <button className="block w-full rounded px-2 py-1 text-left text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800" onClick={() => { alterarStatus(item.id, "Encerrada"); setMenuOpen(null); }}>Encerrar</button>
                            <button className="block w-full rounded px-2 py-1 text-left text-sm text-red-600 hover:bg-zinc-100 dark:hover:bg-zinc-800" onClick={() => { excluir(item.id); setMenuOpen(null); }}>Excluir</button>
                          </div>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <aside className="rounded-2xl border border-black/[.08] bg-white p-5 dark:border-white/[.08] dark:bg-zinc-900">
            <h2 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">Calendário simplificado</h2>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">Próximas ocorrências financeiras</p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {diasCalendario.map((dia) => (
                <div key={`${dia.dia}-${dia.label}`} className="rounded-lg border border-black/[.08] p-2 dark:border-white/[.08]"><p className="text-xs font-semibold">{dia.dia}</p><p className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400">{dia.label}</p></div>
              ))}
            </div>
          </aside>
        </div>
      </div>

      {drawer ? (
        <>
          <div className="fixed inset-0 z-40 bg-black/40" onClick={() => !loading && setDrawer(null)} />
          <aside className="fixed inset-y-0 right-0 z-50 w-full max-w-lg border-l border-black/[.08] bg-white p-6 dark:border-white/[.08] dark:bg-zinc-900">
            <div className="flex items-start justify-between"><h3 className="text-lg font-semibold">{drawer === "create" ? "Nova Recorrência" : "Editar Recorrência"}</h3><button className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800" onClick={() => setDrawer(null)}><X className="h-4 w-4" /></button></div>
            <div className="mt-5 grid gap-3">
              <label className="text-sm">
                <span className="mb-1 block">Nome</span>
                <input className={`h-10 w-full rounded-lg border px-3 bg-transparent ${errors.nome ? "border-red-500 bg-red-50 dark:bg-red-900/20" : "border-black/[.08] dark:border-white/[.08]"}`} value={nome} onChange={(e) => { setNome(e.target.value); setErrors((p) => ({ ...p, nome: false })); }} />
              </label>
              <label className="text-sm"><span className="mb-1 block">Tipo</span><select className="h-10 w-full rounded-lg border border-black/[.08] bg-transparent px-3 dark:border-white/[.08]" value={tipo} onChange={(e) => setTipo(e.target.value as "Entrada" | "Saída")}><option>Entrada</option><option>Saída</option></select></label>
              <label className="text-sm">
                <span className="mb-1 block">Valor</span>
                <input className={`h-10 w-full rounded-lg border px-3 bg-transparent ${errors.valor ? "border-red-500 bg-red-50 dark:bg-red-900/20" : "border-black/[.08] dark:border-white/[.08]"}`} value={valor} onChange={(e) => { setValor(e.target.value); setErrors((p) => ({ ...p, valor: false })); }} />
              </label>
              <label className="text-sm"><span className="mb-1 block">Frequência</span><select className="h-10 w-full rounded-lg border border-black/[.08] bg-transparent px-3 dark:border-white/[.08]" value={frequencia} onChange={(e) => setFrequencia(e.target.value)}><option>Diário</option><option>Semanal</option><option>Mensal</option><option>Anual</option></select></label>
              <label className="text-sm">
                <span className="mb-1 block">Primeira Ocorrência</span>
                <input type="date" className={`h-10 w-full rounded-lg border px-3 bg-transparent ${errors.primeira ? "border-red-500 bg-red-50 dark:bg-red-900/20" : "border-black/[.08] dark:border-white/[.08]"}`} value={primeira} onChange={(e) => { setPrimeira(e.target.value); setErrors((p) => ({ ...p, primeira: false })); }} />
              </label>
              <label className="text-sm"><span className="mb-1 block">Data Final (opcional)</span><input type="date" className="h-10 w-full rounded-lg border border-black/[.08] bg-transparent px-3 dark:border-white/[.08]" value={final} onChange={(e) => setFinal(e.target.value)} /></label>
              <label className="text-sm"><span className="mb-1 block">Conta</span><select className="h-10 w-full rounded-lg border border-black/[.08] bg-transparent px-3 dark:border-white/[.08]" value={conta} onChange={(e) => setConta(e.target.value)}><option>Nubank</option><option>Inter</option><option>Caixa</option><option>Carteira</option></select></label>
              <label className="text-sm"><span className="mb-1 block">Categoria</span><select className="h-10 w-full rounded-lg border border-black/[.08] bg-transparent px-3 dark:border-white/[.08]" value={categoria} onChange={(e) => setCategoria(e.target.value)}><option>Moradia</option><option>Saúde</option><option>Lazer</option><option>Renda</option></select></label>
            </div>
            <div className="mt-5 flex justify-end gap-2"><button className="h-10 rounded-lg border border-black/[.08] px-4 text-sm dark:border-white/[.08]" onClick={() => setDrawer(null)} disabled={loading}>Cancelar</button><button className="h-10 rounded-lg bg-zinc-950 px-4 text-sm text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900" onClick={salvar} disabled={loading}>{loading ? "Salvando..." : "Salvar"}</button></div>
          </aside>
        </>
      ) : null}
    </>
  );
}
