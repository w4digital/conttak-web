"use client";

import { MoreHorizontal, Plus, X } from "lucide-react";
import { useMemo, useState } from "react";

type Movimentacao = {
  id: string;
  descricao: string;
  data: string;
  valor: string;
};

type Conta = {
  id: string;
  nome: string;
  tipo: string;
  saldoAtual: number;
  entradasMes: number;
  saidasMes: number;
  cor: string;
  icone: string;
  arquivada?: boolean;
  historico: Movimentacao[];
  saldoTimeline: { label: string; valor: number }[];
};

const seed: Conta[] = [
  {
    id: "carteira",
    nome: "Carteira",
    tipo: "Carteira",
    saldoAtual: 640,
    entradasMes: 900,
    saidasMes: 260,
    cor: "#f59e0b",
    icone: "Carteira",
    historico: [
      { id: "c1", descricao: "Almoço", data: "29 mai", valor: "-R$ 42,00" },
      { id: "c2", descricao: "Estacionamento", data: "28 mai", valor: "-R$ 18,00" },
      { id: "c3", descricao: "Reembolso", data: "26 mai", valor: "+R$ 80,00" },
    ],
    saldoTimeline: [
      { label: "Sem 1", valor: 530 },
      { label: "Sem 2", valor: 590 },
      { label: "Sem 3", valor: 610 },
      { label: "Sem 4", valor: 640 },
    ],
  },
  {
    id: "nubank",
    nome: "Nubank",
    tipo: "Carteira Digital",
    saldoAtual: 3820,
    entradasMes: 2300,
    saidasMes: 1760,
    cor: "#4f46e5",
    icone: "Cartao",
    historico: [
      { id: "n1", descricao: "Internet", data: "30 mai", valor: "-R$ 120,00" },
      { id: "n2", descricao: "Academia", data: "29 mai", valor: "-R$ 119,90" },
      { id: "n3", descricao: "Freela UX", data: "24 mai", valor: "+R$ 900,00" },
    ],
    saldoTimeline: [
      { label: "Sem 1", valor: 4200 },
      { label: "Sem 2", valor: 4050 },
      { label: "Sem 3", valor: 3940 },
      { label: "Sem 4", valor: 3820 },
    ],
  },
  {
    id: "inter",
    nome: "Inter",
    tipo: "Conta Corrente",
    saldoAtual: 2140,
    entradasMes: 6840,
    saidasMes: 4720,
    cor: "#f97316",
    icone: "Banco",
    historico: [
      { id: "i1", descricao: "Aluguel", data: "03 jun", valor: "-R$ 1.850,00" },
      { id: "i2", descricao: "Mercado", data: "27 mai", valor: "-R$ 640,00" },
      { id: "i3", descricao: "Pix recebido", data: "29 mai", valor: "+R$ 540,00" },
    ],
    saldoTimeline: [
      { label: "Sem 1", valor: 1650 },
      { label: "Sem 2", valor: 1890 },
      { label: "Sem 3", valor: 2260 },
      { label: "Sem 4", valor: 2140 },
    ],
  },
  {
    id: "caixa",
    nome: "Caixa",
    tipo: "Poupança",
    saldoAtual: 5880,
    entradasMes: 6800,
    saidasMes: 920,
    cor: "#10b981",
    icone: "Cofre",
    historico: [
      { id: "x1", descricao: "Parcela notebook", data: "30 mai", valor: "-R$ 200,00" },
      { id: "x2", descricao: "Seguro auto", data: "18 mai", valor: "-R$ 430,00" },
      { id: "x3", descricao: "Salário", data: "05 mai", valor: "+R$ 6.800,00" },
    ],
    saldoTimeline: [
      { label: "Sem 1", valor: 4900 },
      { label: "Sem 2", valor: 5200 },
      { label: "Sem 3", valor: 6040 },
      { label: "Sem 4", valor: 5880 },
    ],
  },
];

function formatBRL(valor: number) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function ContasClient() {
  const [contas, setContas] = useState<Conta[]>(seed);
  const ativas = contas.filter((c) => !c.arquivada);
  const [contaAtivaId, setContaAtivaId] = useState(ativas[0]?.id ?? "");
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [drawer, setDrawer] = useState<"new" | "edit" | "details" | null>(null);
  const [novoEventoDrawer, setNovoEventoDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("Conta Corrente");
  const [saldoInicial, setSaldoInicial] = useState("");
  const [cor, setCor] = useState("#3b82f6");
  const [icone, setIcone] = useState("Banco");

  const [eventoTipo, setEventoTipo] = useState<"Entrada" | "Saída">("Saída");
  const [eventoTitulo, setEventoTitulo] = useState("");
  const [eventoValor, setEventoValor] = useState("");
  const [eventoData, setEventoData] = useState("");
  const [eventoCategoria, setEventoCategoria] = useState("Moradia");
  const [eventoDescricao, setEventoDescricao] = useState("");

  const contaAtiva = useMemo(() => ativas.find((conta) => conta.id === contaAtivaId) ?? ativas[0], [ativas, contaAtivaId]);
  const maxTimeline = Math.max(...(contaAtiva?.saldoTimeline.map((p) => p.valor) ?? [1]));

  function abrirNovaConta() {
    setDrawer("new");
    setNome("");
    setTipo("Conta Corrente");
    setSaldoInicial("");
    setCor("#3b82f6");
    setIcone("Banco");
    setErrors({});
  }

  function abrirEdicao(conta: Conta) {
    setContaAtivaId(conta.id);
    setDrawer("edit");
    setNome(conta.nome);
    setTipo(conta.tipo);
    setSaldoInicial(String(conta.saldoAtual));
    setCor(conta.cor);
    setIcone(conta.icone);
    setErrors({});
  }

  function abrirDetalhes(conta: Conta) {
    setContaAtivaId(conta.id);
    setDrawer("details");
  }

  function salvarConta() {
    const errs: Record<string, boolean> = {};
    if (!nome.trim()) errs.nome = true;
    if (!saldoInicial.trim()) errs.saldoInicial = true;
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setToast("Nome e saldo inicial são obrigatórios.");
      setTimeout(() => setToast(null), 1500);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      if (drawer === "edit" && contaAtiva) {
        setContas((prev) => prev.map((item) => item.id === contaAtiva.id ? { ...item, nome, tipo, saldoAtual: Number(saldoInicial), cor, icone } : item));
        setToast("Conta atualizada.");
      } else {
        const nova: Conta = {
          id: crypto.randomUUID(),
          nome,
          tipo,
          saldoAtual: Number(saldoInicial),
          entradasMes: Number(saldoInicial),
          saidasMes: 0,
          cor,
          icone,
          historico: [{ id: crypto.randomUUID(), descricao: "Saldo inicial", data: "Hoje", valor: `+R$ ${saldoInicial}` }],
          saldoTimeline: [
            { label: "Sem 1", valor: Number(saldoInicial) * 0.7 },
            { label: "Sem 2", valor: Number(saldoInicial) * 0.8 },
            { label: "Sem 3", valor: Number(saldoInicial) * 0.9 },
            { label: "Sem 4", valor: Number(saldoInicial) },
          ],
        };
        setContas((prev) => [nova, ...prev]);
        setContaAtivaId(nova.id);
        setToast("Conta criada com sucesso.");
      }

      setLoading(false);
      setDrawer(null);
      setTimeout(() => setToast(null), 1600);
    }, 700);
  }

  function arquivarConta(conta: Conta) {
    setContas((prev) => prev.map((item) => item.id === conta.id ? { ...item, arquivada: true } : item));
    setMenuOpenId(null);
    setToast(`Conta ${conta.nome} arquivada.`);
    setTimeout(() => setToast(null), 1500);
  }

  function abrirNovoEventoConta() {
    setEventoTipo("Saída");
    setEventoTitulo("");
    setEventoValor("");
    setEventoData("");
    setEventoCategoria("Moradia");
    setEventoDescricao("");
    setNovoEventoDrawer(true);
  }

  function salvarEventoConta() {
    if (!eventoTitulo.trim() || !eventoValor.trim() || !eventoData) {
      setToast("Preencha título, valor e data do evento.");
      setTimeout(() => setToast(null), 1500);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const valorNumero = Number(eventoValor.replace(",", "."));
      const isEntrada = eventoTipo === "Entrada";
      const valorHistorico = `${isEntrada ? "+" : "-"}R$ ${eventoValor}`;

      setContas((prev) =>
        prev.map((item) => {
          if (item.id !== contaAtiva.id) return item;

          return {
            ...item,
            saldoAtual: item.saldoAtual + (isEntrada ? valorNumero : -valorNumero),
            entradasMes: isEntrada ? item.entradasMes + valorNumero : item.entradasMes,
            saidasMes: isEntrada ? item.saidasMes : item.saidasMes + valorNumero,
            historico: [
              {
                id: crypto.randomUUID(),
                descricao: `${eventoTitulo} (${eventoCategoria})${eventoDescricao ? ` - ${eventoDescricao}` : ""}`,
                data: new Date(eventoData + "T00:00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "short" }),
                valor: valorHistorico,
              },
              ...item.historico,
            ],
          };
        })
      );

      setLoading(false);
      setNovoEventoDrawer(false);
      setToast("Evento criado e refletido na conta.");
      setTimeout(() => setToast(null), 1700);
    }, 700);
  }

  if (!contaAtiva) {
    return <div className="text-sm text-zinc-500">Nenhuma conta ativa.</div>;
  }

  return (
    <>
      {toast ? <div className="fixed right-4 top-20 z-[80] rounded-lg bg-zinc-900 px-3 py-2 text-sm text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900">{toast}</div> : null}

      <div className="flex flex-col gap-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-950 dark:text-zinc-50">Contas</h1>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Visão operacional por conta com foco em saldo, entradas e saídas.</p>
          </div>
          <button onClick={abrirNovaConta} className="inline-flex h-10 items-center gap-2 rounded-full bg-zinc-950 px-4 text-sm font-medium text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900">
            <Plus className="h-4 w-4" /> Nova Conta
          </button>
        </div>

        <section className="overflow-x-auto pb-2">
          <div className="flex min-w-max gap-4">
            {ativas.map((conta) => {
              const ativa = conta.id === contaAtivaId;
              return (
                <article
                  key={conta.id}
                  className={`relative w-[280px] rounded-2xl border p-5 text-left transition-colors ${
                    ativa
                      ? "border-zinc-900 bg-zinc-900 text-zinc-50 dark:border-zinc-50 dark:bg-zinc-50 dark:text-zinc-900"
                      : "border-black/[.08] bg-white hover:bg-zinc-50 dark:border-white/[.08] dark:bg-zinc-900 dark:hover:bg-zinc-800/60"
                  }`}
                >
                  <button className="absolute inset-0" onClick={() => setContaAtivaId(conta.id)} aria-label={`Selecionar ${conta.nome}`} />
                  <div className="relative z-10">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="inline-flex items-center gap-2 text-sm"><span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: conta.cor }} />{conta.nome}</span>
                      <div className="relative">
                        <button className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-black/10 dark:hover:bg-white/10" onClick={() => setMenuOpenId((prev) => prev === conta.id ? null : conta.id)}>
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                        {menuOpenId === conta.id ? (
                          <div className="absolute right-0 top-9 z-20 w-36 rounded-lg border border-black/[.08] bg-white p-1 shadow dark:border-white/[.08] dark:bg-zinc-900">
                            <button className="block w-full rounded px-2 py-1 text-left text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800" onClick={() => { abrirDetalhes(conta); setMenuOpenId(null); }}>Ver detalhes</button>
                            <button className="block w-full rounded px-2 py-1 text-left text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800" onClick={() => { abrirEdicao(conta); setMenuOpenId(null); }}>Editar</button>
                            <button className="block w-full rounded px-2 py-1 text-left text-sm text-red-600 hover:bg-zinc-100 dark:hover:bg-zinc-800" onClick={() => arquivarConta(conta)}>Arquivar</button>
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <p className="text-2xl font-semibold">{formatBRL(conta.saldoAtual)}</p>
                    <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                      <div><p className="opacity-70">Entradas</p><p className="mt-1 font-medium">{formatBRL(conta.entradasMes)}</p></div>
                      <div><p className="opacity-70">Saídas</p><p className="mt-1 font-medium">{formatBRL(conta.saidasMes)}</p></div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <article className="rounded-2xl border border-black/[.08] bg-white p-5 dark:border-white/[.08] dark:bg-zinc-900">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h2 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">Histórico de movimentações</h2>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">Conta selecionada: {contaAtiva.nome}</p>
              </div>
              <button onClick={abrirNovoEventoConta} className="inline-flex h-9 items-center gap-2 rounded-lg border border-black/[.08] px-3 text-xs font-medium text-zinc-700 hover:bg-zinc-50 dark:border-white/[.08] dark:text-zinc-200 dark:hover:bg-zinc-800">
                <Plus className="h-3.5 w-3.5" /> Novo Evento
              </button>
            </div>
            <ul className="mt-4 space-y-2">
              {contaAtiva.historico.map((mov) => (
                <li key={mov.id} className="flex items-center justify-between rounded-lg border border-black/[.06] px-3 py-2 dark:border-white/[.06]">
                  <div><p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{mov.descricao}</p><p className="text-xs text-zinc-500 dark:text-zinc-400">{mov.data}</p></div>
                  <span className={`text-sm font-semibold ${mov.valor.startsWith("+") ? "text-emerald-600" : "text-red-500"}`}>{mov.valor}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-black/[.08] bg-white p-5 dark:border-white/[.08] dark:bg-zinc-900">
            <h2 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">Saldo ao longo do tempo</h2>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">Cor da conta refletida no gráfico</p>
            <div className="mt-6 grid h-44 grid-cols-4 items-end gap-3">
              {contaAtiva.saldoTimeline.map((ponto) => {
                const height = Math.max(20, (ponto.valor / maxTimeline) * 100);
                return (
                  <div key={ponto.label} className="flex flex-col items-center gap-2">
                    <div className="w-full rounded-lg bg-zinc-100 p-1 dark:bg-zinc-800">
                      <div className="w-full rounded-md" style={{ height: `${height}px`, backgroundColor: contaAtiva.cor }} />
                    </div>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">{ponto.label}</span>
                  </div>
                );
              })}
            </div>
          </article>
        </section>
      </div>

      {drawer && drawer !== "details" ? (
        <>
          <div className="fixed inset-0 z-40 bg-black/40" onClick={() => !loading && setDrawer(null)} />
          <aside className="fixed inset-y-0 right-0 z-50 w-full max-w-lg border-l border-black/[.08] bg-white p-6 dark:border-white/[.08] dark:bg-zinc-900">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">{drawer === "new" ? "Nova Conta" : "Editar Conta"}</h3>
              <button className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800" onClick={() => setDrawer(null)}><X className="h-4 w-4" /></button>
            </div>
            <div className="mt-5 grid gap-3">
              <label className="text-sm">
                <span className="mb-1 block">Nome</span>
                <input
                  className={`h-10 w-full rounded-lg border px-3 bg-transparent ${errors.nome ? "border-red-500 bg-red-50 dark:bg-red-900/20" : "border-black/[.08] dark:border-white/[.08]"}`}
                  value={nome}
                  onChange={(e) => { setNome(e.target.value); setErrors((p) => ({ ...p, nome: false })); }}
                />
              </label>
              <label className="text-sm"><span className="mb-1 block">Tipo</span><select className="h-10 w-full rounded-lg border border-black/[.08] bg-transparent px-3 dark:border-white/[.08]" value={tipo} onChange={(e) => setTipo(e.target.value)}><option>Conta Corrente</option><option>Carteira</option><option>Poupança</option><option>Carteira Digital</option></select></label>
              <label className="text-sm">
                <span className="mb-1 block">Saldo Inicial</span>
                <input
                  className={`h-10 w-full rounded-lg border px-3 bg-transparent ${errors.saldoInicial ? "border-red-500 bg-red-50 dark:bg-red-900/20" : "border-black/[.08] dark:border-white/[.08]"}`}
                  value={saldoInicial}
                  placeholder="1200,00"
                  onChange={(e) => { setSaldoInicial(e.target.value); setErrors((p) => ({ ...p, saldoInicial: false })); }}
                />
              </label>
              <label className="text-sm"><span className="mb-1 block">Cor</span><input type="color" className="h-10 w-full rounded-lg border border-black/[.08] px-2 dark:border-white/[.08]" value={cor} onChange={(e) => setCor(e.target.value)} /></label>
              <label className="text-sm"><span className="mb-1 block">Ícone</span><select className="h-10 w-full rounded-lg border border-black/[.08] bg-transparent px-3 dark:border-white/[.08]" value={icone} onChange={(e) => setIcone(e.target.value)}><option>Banco</option><option>Carteira</option><option>Cartao</option><option>Cofre</option></select></label>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button className="h-10 rounded-lg border border-black/[.08] px-4 text-sm dark:border-white/[.08]" onClick={() => setDrawer(null)} disabled={loading}>Cancelar</button>
              <button className="h-10 rounded-lg bg-zinc-950 px-4 text-sm text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900" onClick={salvarConta} disabled={loading}>{loading ? "Salvando..." : "Salvar"}</button>
            </div>
          </aside>
        </>
      ) : null}

      {drawer === "details" && contaAtiva ? (
        <>
          <div className="fixed inset-0 z-40 bg-black/40" onClick={() => setDrawer(null)} />
          <aside className="fixed inset-y-0 right-0 z-50 w-full max-w-lg overflow-y-auto border-l border-black/[.08] bg-white p-6 dark:border-white/[.08] dark:bg-zinc-900">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: contaAtiva.cor }} />
                  <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">{contaAtiva.nome}</h3>
                </div>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{contaAtiva.tipo}</p>
              </div>
              <button className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800" onClick={() => setDrawer(null)}>
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-5 space-y-5">
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div className="rounded-xl border border-black/[.08] p-3 dark:border-white/[.08]">
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Saldo Atual</p>
                  <p className="mt-1 text-lg font-semibold text-zinc-950 dark:text-zinc-50">{formatBRL(contaAtiva.saldoAtual)}</p>
                </div>
                <div className="rounded-xl border border-black/[.08] p-3 dark:border-white/[.08]">
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Entradas</p>
                  <p className="mt-1 font-semibold text-emerald-600">{formatBRL(contaAtiva.entradasMes)}</p>
                </div>
                <div className="rounded-xl border border-black/[.08] p-3 dark:border-white/[.08]">
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Saídas</p>
                  <p className="mt-1 font-semibold text-red-500">{formatBRL(contaAtiva.saidasMes)}</p>
                </div>
              </div>

              <div>
                <h4 className="mb-2 text-sm font-semibold text-zinc-950 dark:text-zinc-50">Linha temporal do saldo</h4>
                <div className="grid h-32 grid-cols-4 items-end gap-3">
                  {contaAtiva.saldoTimeline.map((ponto) => {
                    const maxVal = Math.max(...contaAtiva.saldoTimeline.map((p) => p.valor), 1);
                    const height = Math.max(12, (ponto.valor / maxVal) * 80);
                    return (
                      <div key={ponto.label} className="flex flex-col items-center gap-1">
                        <span className="text-[10px] text-zinc-500">{formatBRL(ponto.valor)}</span>
                        <div className="w-full rounded-lg bg-zinc-100 p-1 dark:bg-zinc-800">
                          <div className="w-full rounded-md" style={{ height: `${height}px`, backgroundColor: contaAtiva.cor }} />
                        </div>
                        <span className="text-[10px] text-zinc-500 dark:text-zinc-400">{ponto.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">Últimas movimentações</h4>
                  <button
                    className="text-xs text-zinc-500 underline hover:text-zinc-700 dark:hover:text-zinc-300"
                    onClick={() => { setDrawer(null); abrirNovoEventoConta(); }}
                  >
                    + Novo evento
                  </button>
                </div>
                <ul className="space-y-2">
                  {contaAtiva.historico.map((mov) => (
                    <li key={mov.id} className="flex items-center justify-between rounded-lg border border-black/[.06] px-3 py-2 text-sm dark:border-white/[.06]">
                      <div>
                        <p className="font-medium text-zinc-900 dark:text-zinc-100">{mov.descricao}</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">{mov.data}</p>
                      </div>
                      <span className={`font-semibold ${mov.valor.startsWith("+") ? "text-emerald-600" : "text-red-500"}`}>{mov.valor}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-end gap-2">
                <button className="h-10 rounded-lg border border-black/[.08] px-3 text-sm dark:border-white/[.08]" onClick={() => abrirEdicao(contaAtiva)}>Editar conta</button>
                <button className="h-10 rounded-lg border border-red-200 px-3 text-sm text-red-600 dark:border-red-800" onClick={() => { arquivarConta(contaAtiva); setDrawer(null); }}>Arquivar</button>
              </div>
            </div>
          </aside>
        </>
      ) : null}

      {novoEventoDrawer ? (
        <>
          <div className="fixed inset-0 z-40 bg-black/40" onClick={() => !loading && setNovoEventoDrawer(false)} />
          <aside className="fixed inset-y-0 right-0 z-50 w-full max-w-lg border-l border-black/[.08] bg-white p-6 dark:border-white/[.08] dark:bg-zinc-900">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">Novo Evento</h3>
              <button className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800" onClick={() => setNovoEventoDrawer(false)}><X className="h-4 w-4" /></button>
            </div>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Conta vinculada: {contaAtiva.nome}</p>
            <div className="mt-5 grid gap-3">
              <label className="text-sm"><span className="mb-1 block">Tipo</span><select className="h-10 w-full rounded-lg border border-black/[.08] bg-transparent px-3 dark:border-white/[.08]" value={eventoTipo} onChange={(e) => setEventoTipo(e.target.value as "Entrada" | "Saída")}><option>Entrada</option><option>Saída</option></select></label>
              <label className="text-sm"><span className="mb-1 block">Título</span><input className="h-10 w-full rounded-lg border border-black/[.08] bg-transparent px-3 dark:border-white/[.08]" value={eventoTitulo} onChange={(e) => setEventoTitulo(e.target.value)} /></label>
              <label className="text-sm"><span className="mb-1 block">Valor</span><input className="h-10 w-full rounded-lg border border-black/[.08] bg-transparent px-3 dark:border-white/[.08]" value={eventoValor} onChange={(e) => setEventoValor(e.target.value)} placeholder="120,00" /></label>
              <label className="text-sm"><span className="mb-1 block">Data</span><input type="date" className="h-10 w-full rounded-lg border border-black/[.08] bg-transparent px-3 dark:border-white/[.08]" value={eventoData} onChange={(e) => setEventoData(e.target.value)} /></label>
              <label className="text-sm"><span className="mb-1 block">Categoria</span><select className="h-10 w-full rounded-lg border border-black/[.08] bg-transparent px-3 dark:border-white/[.08]" value={eventoCategoria} onChange={(e) => setEventoCategoria(e.target.value)}><option>Alimentação</option><option>Transporte</option><option>Moradia</option><option>Saúde</option><option>Renda</option></select></label>
              <label className="text-sm"><span className="mb-1 block">Descrição</span><textarea className="min-h-20 w-full rounded-lg border border-black/[.08] bg-transparent px-3 py-2 dark:border-white/[.08]" value={eventoDescricao} onChange={(e) => setEventoDescricao(e.target.value)} /></label>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button className="h-10 rounded-lg border border-black/[.08] px-4 text-sm dark:border-white/[.08]" onClick={() => setNovoEventoDrawer(false)} disabled={loading}>Cancelar</button>
              <button className="h-10 rounded-lg bg-zinc-950 px-4 text-sm text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900" onClick={salvarEventoConta} disabled={loading}>{loading ? "Salvando..." : "Salvar"}</button>
            </div>
          </aside>
        </>
      ) : null}
    </>
  );
}
