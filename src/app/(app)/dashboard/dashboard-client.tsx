"use client";

import { ChevronDown, ChevronUp, Plus, X } from "lucide-react";
import { useMemo, useState } from "react";

type Evento = {
  id: string;
  icone: string;
  titulo: string;
  data: string;
  valor: string;
  conta: string;
  apoio: string;
};

type GrupoTimeline = {
  periodo: string;
  saldoProjetado: string;
  eventos: Evento[];
};

const indicadoresBase = [
  { titulo: "Saldo Atual", valor: "R$ 12.480,00", apoio: "Hoje, 29 de maio" },
  { titulo: "Saldo Previsto", valor: "R$ 9.320,00", apoio: "Projeção para 30 dias" },
  { titulo: "Dinheiro Disponível", valor: "R$ 7.190,00", apoio: "Após despesas essenciais" },
  { titulo: "Comprometimento Financeiro", valor: "37%", apoio: "Renda futura já alocada" },
];

const timelineBase: GrupoTimeline[] = [
  {
    periodo: "Hoje",
    saldoProjetado: "R$ 12.120,00",
    eventos: [
      { id: "h1", icone: "●", titulo: "Academia", data: "29 mai", valor: "-R$ 119,90", conta: "Nubank", apoio: "Debita hoje" },
      { id: "h2", icone: "●", titulo: "Pix recebido - Lucas", data: "29 mai", valor: "+R$ 540,00", conta: "Inter", apoio: "Entrou às 09:14" },
    ],
  },
  {
    periodo: "Amanhã",
    saldoProjetado: "R$ 11.960,00",
    eventos: [
      { id: "a1", icone: "●", titulo: "Internet fibra", data: "30 mai", valor: "-R$ 120,00", conta: "Nubank", apoio: "Vence amanhã" },
      { id: "a2", icone: "●", titulo: "Parcela notebook", data: "30 mai", valor: "-R$ 200,00", conta: "Caixa", apoio: "4/12" },
    ],
  },
  {
    periodo: "Próximos 7 dias",
    saldoProjetado: "R$ 10.840,00",
    eventos: [
      { id: "s1", icone: "●", titulo: "Aluguel", data: "03 jun", valor: "-R$ 1.850,00", conta: "Inter", apoio: "Compromisso fixo" },
      { id: "s2", icone: "●", titulo: "Salário", data: "05 jun", valor: "+R$ 6.800,00", conta: "Caixa", apoio: "Recorrência mensal" },
    ],
  },
  {
    periodo: "Próximos 30 dias",
    saldoProjetado: "R$ 9.320,00",
    eventos: [
      { id: "m1", icone: "●", titulo: "Seguro do carro", data: "18 jun", valor: "-R$ 430,00", conta: "Nubank", apoio: "Última semana do ciclo" },
      { id: "m2", icone: "●", titulo: "Freela UX", data: "22 jun", valor: "+R$ 1.900,00", conta: "Inter", apoio: "Pagamento previsto" },
    ],
  },
];

const alertasBase = [
  "Internet vence amanhã",
  "Parcela do notebook termina este mês",
  "Comprometimento acima de 35%",
];

export function DashboardClient() {
  const [timeline, setTimeline] = useState<GrupoTimeline[]>(timelineBase);
  const [aberto, setAberto] = useState<string[]>(timelineBase.map((t) => t.periodo));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const [tipo, setTipo] = useState("Saída");
  const [titulo, setTitulo] = useState("");
  const [valor, setValor] = useState("");
  const [data, setData] = useState("");
  const [contaOrigem, setContaOrigem] = useState("Nubank");
  const [contaDestino, setContaDestino] = useState("Inter");
  const [categoria, setCategoria] = useState("Moradia");
  const [descricao, setDescricao] = useState("");
  const [recorrente, setRecorrente] = useState(false);
  const [frequencia, setFrequencia] = useState("Mensal");
  const [termino, setTermino] = useState("");
  const [parcelado, setParcelado] = useState(false);
  const [parcelas, setParcelas] = useState("2");

  const alertas = useMemo(() => alertasBase, []);

  function toggleAccordion(periodo: string) {
    setAberto((prev) => (prev.includes(periodo) ? prev.filter((item) => item !== periodo) : [...prev, periodo]));
  }

  function limparFormulario() {
    setTipo("Saída");
    setTitulo("");
    setValor("");
    setData("");
    setContaOrigem("Nubank");
    setContaDestino("Inter");
    setCategoria("Moradia");
    setDescricao("");
    setRecorrente(false);
    setFrequencia("Mensal");
    setTermino("");
    setParcelado(false);
    setParcelas("2");
  }

  function salvarEvento() {
    if (!titulo.trim() || !valor.trim() || !data) {
      setToast("Preencha Título, Valor e Data.");
      setTimeout(() => setToast(null), 1800);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const sinal = tipo === "Entrada" ? "+" : "-";
      const novoEvento: Evento = {
        id: crypto.randomUUID(),
        icone: "●",
        titulo,
        data: new Date(data + "T00:00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "short" }),
        valor: `${sinal}R$ ${valor}`,
        conta: tipo === "Transferência" ? `${contaOrigem} -> ${contaDestino}` : contaOrigem,
        apoio: descricao.trim() || (recorrente ? `Recorrente ${frequencia.toLowerCase()}` : "Cadastro manual"),
      };

      setTimeline((prev) => {
        const next = [...prev];
        next[0] = { ...next[0], eventos: [novoEvento, ...next[0].eventos] };
        return next;
      });

      setLoading(false);
      setDrawerOpen(false);
      limparFormulario();
      setToast("Evento criado com sucesso.");
      setTimeout(() => setToast(null), 1800);
    }, 700);
  }

  return (
    <>
      {toast ? (
        <div className="fixed right-4 top-20 z-[70] rounded-lg bg-zinc-900 px-3 py-2 text-sm text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900">
          {toast}
        </div>
      ) : null}

      <div className="flex flex-col gap-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-950 dark:text-zinc-50">Clareza do seu fluxo financeiro</h1>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Entenda rapidamente o agora, o disponível e os próximos impactos no seu saldo.</p>
          </div>
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="inline-flex h-10 items-center gap-2 rounded-full bg-zinc-950 px-4 text-sm font-medium text-zinc-50 transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            <Plus className="h-4 w-4" />
            Novo Evento
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {indicadoresBase.map((item) => (
            <article key={item.titulo} className="rounded-2xl border border-black/[.08] bg-white p-5 dark:border-white/[.08] dark:bg-zinc-900">
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">{item.titulo}</p>
              <p className="mt-2 text-2xl font-semibold text-zinc-950 dark:text-zinc-50">{item.valor}</p>
              <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">{item.apoio}</p>
            </article>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_320px]">
          <section className="rounded-2xl border border-black/[.08] bg-white p-5 dark:border-white/[.08] dark:bg-zinc-900">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">Timeline Financeira</h2>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">Visão temporal dos próximos compromissos</span>
            </div>

            <div className="space-y-3">
              {timeline.map((grupo) => {
                const isOpen = aberto.includes(grupo.periodo);
                return (
                  <article key={grupo.periodo} className="rounded-xl border border-black/[.06] dark:border-white/[.06]">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between gap-3 p-4 text-left"
                      onClick={() => toggleAccordion(grupo.periodo)}
                    >
                      <div>
                        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{grupo.periodo}</h3>
                        <p className="mt-1 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                          Saldo projetado: <strong className="text-zinc-800 dark:text-zinc-100">{grupo.saldoProjetado}</strong>
                        </p>
                      </div>
                      {isOpen ? <ChevronUp className="h-4 w-4 text-zinc-500" /> : <ChevronDown className="h-4 w-4 text-zinc-500" />}
                    </button>

                    {isOpen ? (
                      <ul className="space-y-2 px-4 pb-4">
                        {grupo.eventos.map((evento) => (
                          <li
                            key={evento.id}
                            className="grid grid-cols-[20px_1fr] gap-3 rounded-lg border border-transparent px-2 py-2 hover:border-black/[.08] hover:bg-zinc-50 dark:hover:border-white/[.08] dark:hover:bg-zinc-800/60"
                          >
                            <span className="pt-1 text-xs text-zinc-400">{evento.icone}</span>
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <div>
                                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{evento.titulo}</p>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400">{evento.data} · {evento.conta} · {evento.apoio}</p>
                              </div>
                              <span className={`text-sm font-semibold ${evento.valor.startsWith("+") ? "text-emerald-600 dark:text-emerald-400" : "text-red-500 dark:text-red-400"}`}>
                                {evento.valor}
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </article>
                );
              })}
            </div>
          </section>

          <aside className="h-fit rounded-2xl border border-black/[.08] bg-white p-5 dark:border-white/[.08] dark:bg-zinc-900">
            <h2 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">Alertas</h2>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">Pontos que merecem atenção imediata.</p>
            <ul className="mt-4 space-y-3">
              {alertas.map((alerta) => (
                <li key={alerta} className="rounded-lg border border-amber-200/60 bg-amber-50 px-3 py-2 text-sm text-amber-900 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
                  {alerta}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity ${drawerOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => !loading && setDrawerOpen(false)}
      />
      <aside
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-xl border-l border-black/[.08] bg-white p-6 shadow-xl transition-transform dark:border-white/[.08] dark:bg-zinc-900 ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">Novo Evento Financeiro</h3>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Cadastro simulado para validação de UX.</p>
          </div>
          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            onClick={() => !loading && setDrawerOpen(false)}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3">
          <label className="text-sm">
            <span className="mb-1 block text-zinc-600 dark:text-zinc-300">Tipo</span>
            <select className="h-10 w-full rounded-lg border border-black/[.08] bg-transparent px-3" value={tipo} onChange={(e) => setTipo(e.target.value)}>
              <option>Entrada</option>
              <option>Saída</option>
              <option>Transferência</option>
            </select>
          </label>
          <label className="text-sm">
            <span className="mb-1 block text-zinc-600 dark:text-zinc-300">Título</span>
            <input className="h-10 w-full rounded-lg border border-black/[.08] bg-transparent px-3" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
          </label>
          <label className="text-sm">
            <span className="mb-1 block text-zinc-600 dark:text-zinc-300">Valor</span>
            <input className="h-10 w-full rounded-lg border border-black/[.08] bg-transparent px-3" placeholder="200,00" value={valor} onChange={(e) => setValor(e.target.value)} />
          </label>
          <label className="text-sm">
            <span className="mb-1 block text-zinc-600 dark:text-zinc-300">Data</span>
            <input type="date" className="h-10 w-full rounded-lg border border-black/[.08] bg-transparent px-3" value={data} onChange={(e) => setData(e.target.value)} />
          </label>
          <label className="text-sm">
            <span className="mb-1 block text-zinc-600 dark:text-zinc-300">Conta Origem</span>
            <select className="h-10 w-full rounded-lg border border-black/[.08] bg-transparent px-3" value={contaOrigem} onChange={(e) => setContaOrigem(e.target.value)}>
              <option>Carteira</option><option>Nubank</option><option>Inter</option><option>Caixa</option>
            </select>
          </label>
          {tipo === "Transferência" ? (
            <label className="text-sm">
              <span className="mb-1 block text-zinc-600 dark:text-zinc-300">Conta Destino</span>
              <select className="h-10 w-full rounded-lg border border-black/[.08] bg-transparent px-3" value={contaDestino} onChange={(e) => setContaDestino(e.target.value)}>
                <option>Carteira</option><option>Nubank</option><option>Inter</option><option>Caixa</option>
              </select>
            </label>
          ) : null}
          <label className="text-sm">
            <span className="mb-1 block text-zinc-600 dark:text-zinc-300">Categoria</span>
            <select className="h-10 w-full rounded-lg border border-black/[.08] bg-transparent px-3" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
              <option>Alimentação</option><option>Transporte</option><option>Moradia</option><option>Saúde</option>
            </select>
          </label>
          <label className="text-sm">
            <span className="mb-1 block text-zinc-600 dark:text-zinc-300">Descrição</span>
            <textarea className="min-h-20 w-full rounded-lg border border-black/[.08] bg-transparent px-3 py-2" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
          </label>

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={recorrente} onChange={(e) => setRecorrente(e.target.checked)} /> Evento recorrente
          </label>
          {recorrente ? (
            <div className="grid grid-cols-2 gap-3">
              <label className="text-sm">
                <span className="mb-1 block text-zinc-600 dark:text-zinc-300">Frequência</span>
                <select className="h-10 w-full rounded-lg border border-black/[.08] bg-transparent px-3" value={frequencia} onChange={(e) => setFrequencia(e.target.value)}>
                  <option>Diário</option><option>Semanal</option><option>Mensal</option><option>Anual</option>
                </select>
              </label>
              <label className="text-sm">
                <span className="mb-1 block text-zinc-600 dark:text-zinc-300">Data de término</span>
                <input type="date" className="h-10 w-full rounded-lg border border-black/[.08] bg-transparent px-3" value={termino} onChange={(e) => setTermino(e.target.value)} />
              </label>
            </div>
          ) : null}

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={parcelado} onChange={(e) => setParcelado(e.target.checked)} /> Compra parcelada
          </label>
          {parcelado ? (
            <label className="text-sm">
              <span className="mb-1 block text-zinc-600 dark:text-zinc-300">Quantidade de parcelas</span>
              <input type="number" min={2} className="h-10 w-full rounded-lg border border-black/[.08] bg-transparent px-3" value={parcelas} onChange={(e) => setParcelas(e.target.value)} />
            </label>
          ) : null}
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button className="h-10 rounded-lg border border-black/[.08] px-4 text-sm" onClick={() => !loading && setDrawerOpen(false)} disabled={loading}>Cancelar</button>
          <button className="h-10 rounded-lg bg-zinc-950 px-4 text-sm font-medium text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900" onClick={salvarEvento} disabled={loading}>
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </aside>
    </>
  );
}
