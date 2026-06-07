"use client";

import { ChevronLeft, ChevronRight, MoreHorizontal, Plus, X } from "lucide-react";
import { useMemo, useState } from "react";

type TipoEvento = "Entrada" | "Saída" | "Transferência";

type Evento = {
  id: string;
  nome: string;
  categoria: string;
  conta: string;
  data: string;
  valor: string;
  status: string;
  tipo: TipoEvento;
  descricao: string;
  origem: "Manual" | "Parcelamento" | "Recorrência";
};

const seed: Evento[] = [
  { id: "e01", nome: "Academia", categoria: "Saúde", conta: "Nubank", data: "2026-05-29", valor: "-R$ 119,90", status: "Agendado", tipo: "Saída", descricao: "Plano mensal", origem: "Recorrência" },
  { id: "e02", nome: "Internet fibra", categoria: "Moradia", conta: "Nubank", data: "2026-05-30", valor: "-R$ 120,00", status: "A vencer", tipo: "Saída", descricao: "Vencimento do mês", origem: "Recorrência" },
  { id: "e03", nome: "Parcela notebook", categoria: "Parcelamento", conta: "Caixa", data: "2026-05-30", valor: "-R$ 200,00", status: "A vencer", tipo: "Saída", descricao: "Parcela 4/12", origem: "Parcelamento" },
  { id: "e04", nome: "Aluguel", categoria: "Moradia", conta: "Inter", data: "2026-06-03", valor: "-R$ 1.850,00", status: "Programado", tipo: "Saída", descricao: "Contrato principal", origem: "Manual" },
  { id: "e05", nome: "Salário", categoria: "Renda", conta: "Caixa", data: "2026-06-05", valor: "+R$ 6.800,00", status: "Programado", tipo: "Entrada", descricao: "Folha mensal", origem: "Recorrência" },
  { id: "e06", nome: "Netflix", categoria: "Lazer", conta: "Nubank", data: "2026-06-08", valor: "-R$ 39,90", status: "Recorrente", tipo: "Saída", descricao: "Plano premium", origem: "Recorrência" },
  { id: "e07", nome: "Freela UX", categoria: "Renda extra", conta: "Inter", data: "2026-06-22", valor: "+R$ 1.900,00", status: "Previsto", tipo: "Entrada", descricao: "Projeto de interface", origem: "Manual" },
];

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}

export function EventosClient() {
  const [eventos, setEventos] = useState<Evento[]>(seed);
  const [busca, setBusca] = useState("");
  const [periodo, setPeriodo] = useState("30d");
  const [contaFiltro, setContaFiltro] = useState("todas");
  const [categoriaFiltro, setCategoriaFiltro] = useState("todas");
  const [statusFiltro, setStatusFiltro] = useState("todos");

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const [drawerMode, setDrawerMode] = useState<"create" | "edit" | "details" | null>(null);
  const [selected, setSelected] = useState<Evento | null>(null);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const [tipo, setTipo] = useState<TipoEvento>("Saída");
  const [nome, setNome] = useState("");
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

  const eventosFiltrados = useMemo(() => {
    const limiteDias = periodo === "7d" ? 7 : periodo === "mes" ? 31 : 30;
    const hoje = new Date("2026-05-29T00:00:00");

    return eventos
      .filter((evento) => {
        const dataEvento = new Date(evento.data + "T00:00:00");
        const delta = Math.floor((dataEvento.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));
        const passouPeriodo = delta <= limiteDias;
        const passouBusca = `${evento.nome} ${evento.categoria}`.toLowerCase().includes(busca.toLowerCase());
        const passouConta = contaFiltro === "todas" || evento.conta.includes(contaFiltro);
        const passouCategoria = categoriaFiltro === "todas" || evento.categoria === categoriaFiltro;
        const passouStatus = statusFiltro === "todos" || evento.status === statusFiltro;
        return passouPeriodo && passouBusca && passouConta && passouCategoria && passouStatus;
      })
      .sort((a, b) => a.data.localeCompare(b.data));
  }, [eventos, busca, periodo, contaFiltro, categoriaFiltro, statusFiltro]);

  const totalPages = Math.max(1, Math.ceil(eventosFiltrados.length / pageSize));
  const pageSafe = Math.min(page, totalPages);
  const eventosPaginados = useMemo(() => {
    const start = (pageSafe - 1) * pageSize;
    return eventosFiltrados.slice(start, start + pageSize);
  }, [eventosFiltrados, pageSafe, pageSize]);

  function abrirCadastro() {
    setDrawerMode("create");
    setSelected(null);
    setTipo("Saída");
    setNome("");
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
    setErrors({});
  }

  function abrirEdicao(evento: Evento) {
    setSelected(evento);
    setDrawerMode("edit");
    setTipo(evento.tipo);
    setNome(evento.nome);
    setValor(evento.valor.replace("+R$", "").replace("-R$", "").trim());
    setData(evento.data);
    setContaOrigem(evento.conta.replace(/\s->.*/, ""));
    setCategoria(evento.categoria);
    setDescricao(evento.descricao);
    setRecorrente(evento.origem === "Recorrência");
    setParcelado(evento.origem === "Parcelamento");
    setErrors({});
  }

  function abrirDetalhes(evento: Evento) {
    setSelected(evento);
    setDrawerMode("details");
  }

  function salvarEvento() {
    const errs: Record<string, boolean> = {};
    if (!nome.trim()) errs.nome = true;
    if (!valor.trim()) errs.valor = true;
    if (!data) errs.data = true;
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setToast("Preencha Nome, Valor e Data.");
      setTimeout(() => setToast(null), 1500);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const sinal = tipo === "Entrada" ? "+" : "-";
      const novo: Evento = {
        id: selected?.id ?? crypto.randomUUID(),
        nome,
        categoria,
        conta: tipo === "Transferência" ? `${contaOrigem} -> ${contaDestino}` : contaOrigem,
        data,
        valor: `${sinal}R$ ${valor}`,
        status: recorrente ? "Recorrente" : "Programado",
        tipo,
        descricao,
        origem: parcelado ? "Parcelamento" : recorrente ? "Recorrência" : "Manual",
      };

      setEventos((prev) => {
        if (drawerMode === "edit" && selected) {
          return prev.map((item) => (item.id === selected.id ? novo : item));
        }
        return [novo, ...prev];
      });

      setLoading(false);
      setDrawerMode(null);
      setSelected(null);
      setToast(drawerMode === "edit" ? "Evento atualizado." : "Evento criado com sucesso.");
      setTimeout(() => setToast(null), 1700);
    }, 700);
  }

  function excluirEvento(id: string) {
    setEventos((prev) => prev.filter((item) => item.id !== id));
    setDrawerMode(null);
    setSelected(null);
    setToast("Evento excluído.");
    setTimeout(() => setToast(null), 1700);
  }

  return (
    <>
      {toast ? <div className="fixed right-4 top-20 z-[80] rounded-lg bg-zinc-900 px-3 py-2 text-sm text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900">{toast}</div> : null}

      <div className="flex flex-col gap-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-950 dark:text-zinc-50">Eventos</h1>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Visualização cronológica dos próximos movimentos financeiros.</p>
          </div>
          <button onClick={abrirCadastro} className="inline-flex h-10 items-center gap-2 rounded-full bg-zinc-950 px-4 text-sm font-medium text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900">
            <Plus className="h-4 w-4" /> Novo Evento
          </button>
        </div>

        <section className="rounded-2xl border border-black/[.08] bg-white p-4 dark:border-white/[.08] dark:bg-zinc-900">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
            <input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar evento" className="h-10 rounded-lg border border-black/[.08] bg-transparent px-3 text-sm" />
            <select value={periodo} onChange={(e) => setPeriodo(e.target.value)} className="h-10 rounded-lg border border-black/[.08] bg-transparent px-3 text-sm">
              <option value="30d">Período: próximos 30 dias</option>
              <option value="7d">Período: próximos 7 dias</option>
              <option value="mes">Período: este mês</option>
            </select>
            <select value={contaFiltro} onChange={(e) => setContaFiltro(e.target.value)} className="h-10 rounded-lg border border-black/[.08] bg-transparent px-3 text-sm">
              <option value="todas">Todas as contas</option><option value="Nubank">Nubank</option><option value="Inter">Inter</option><option value="Caixa">Caixa</option>
            </select>
            <select value={categoriaFiltro} onChange={(e) => setCategoriaFiltro(e.target.value)} className="h-10 rounded-lg border border-black/[.08] bg-transparent px-3 text-sm">
              <option value="todas">Todas as categorias</option><option value="Moradia">Moradia</option><option value="Renda">Renda</option><option value="Lazer">Lazer</option><option value="Saúde">Saúde</option>
            </select>
            <select value={statusFiltro} onChange={(e) => setStatusFiltro(e.target.value)} className="h-10 rounded-lg border border-black/[.08] bg-transparent px-3 text-sm">
              <option value="todos">Todos os status</option><option value="A vencer">A vencer</option><option value="Programado">Programado</option><option value="Recorrente">Recorrente</option><option value="Agendado">Agendado</option>
            </select>
          </div>
        </section>

        <section className="rounded-2xl border border-black/[.08] bg-white dark:border-white/[.08] dark:bg-zinc-900">
          <div className="overflow-x-auto">
            <div className="min-w-[960px]">
              <div className="grid grid-cols-[1.1fr_0.8fr_0.8fr_0.7fr_0.8fr_0.7fr_0.3fr] border-b border-black/[.06] px-4 py-3 text-xs font-medium uppercase tracking-wide text-zinc-500 dark:border-white/[.06] dark:text-zinc-400 sm:px-5">
                <span>Nome</span><span>Categoria</span><span>Conta</span><span>Data</span><span className="text-right">Valor</span><span className="text-right">Status</span><span className="text-right">Ações</span>
              </div>

              <ul className="divide-y divide-black/[.04] dark:divide-white/[.04]">
                {eventosPaginados.map((evento) => (
                  <li key={evento.id} className="grid grid-cols-[1.1fr_0.8fr_0.8fr_0.7fr_0.8fr_0.7fr_0.3fr] items-center px-4 py-3 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800/60">
                    <button className="text-left font-medium text-zinc-900 dark:text-zinc-100" onClick={() => abrirDetalhes(evento)}>{evento.nome}</button>
                    <span className="text-zinc-600 dark:text-zinc-400">{evento.categoria}</span>
                    <span className="text-zinc-600 dark:text-zinc-400">{evento.conta}</span>
                    <span className="text-zinc-500 dark:text-zinc-400">{formatDate(evento.data)}</span>
                    <span className={`text-right font-semibold ${evento.valor.startsWith("+") ? "text-emerald-600" : "text-red-500"}`}>{evento.valor}</span>
                    <span className="text-right text-xs font-medium text-zinc-500 dark:text-zinc-300">{evento.status}</span>
                    <div className="relative flex justify-end">
                      <button className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800" onClick={() => setMenuOpenId((prev) => prev === evento.id ? null : evento.id)}>
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                      {menuOpenId === evento.id ? (
                        <div className="absolute right-0 top-9 z-20 w-36 rounded-lg border border-black/[.08] bg-white p-1 shadow-lg dark:border-white/[.08] dark:bg-zinc-900">
                          <button className="block w-full rounded px-2 py-1 text-left text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800" onClick={() => { abrirEdicao(evento); setMenuOpenId(null); }}>Editar</button>
                          <button className="block w-full rounded px-2 py-1 text-left text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800" onClick={() => { abrirDetalhes(evento); setMenuOpenId(null); }}>Detalhes</button>
                          <button className="block w-full rounded px-2 py-1 text-left text-sm text-red-600 hover:bg-zinc-100 dark:hover:bg-zinc-800" onClick={() => { excluirEvento(evento.id); setMenuOpenId(null); }}>Excluir</button>
                        </div>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-black/[.06] px-4 py-3 dark:border-white/[.06] sm:px-5">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Mostrando {(pageSafe - 1) * pageSize + 1} a {Math.min(pageSafe * pageSize, eventosFiltrados.length)} de {eventosFiltrados.length}</p>
            <div className="flex items-center gap-2">
              <select value={String(pageSize)} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }} className="h-8 rounded border border-black/[.08] px-2 text-xs">
                <option value="5">5</option><option value="10">10</option>
              </select>
              <button className="inline-flex h-8 w-8 items-center justify-center rounded border border-black/[.08]" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={pageSafe === 1}><ChevronLeft className="h-4 w-4" /></button>
              <span className="text-xs text-zinc-600 dark:text-zinc-300">{pageSafe}/{totalPages}</span>
              <button className="inline-flex h-8 w-8 items-center justify-center rounded border border-black/[.08]" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={pageSafe === totalPages}><ChevronRight className="h-4 w-4" /></button>
            </div>
          </div>
        </section>
      </div>

      {(drawerMode === "create" || drawerMode === "edit" || drawerMode === "details") ? (
        <>
          <div className="fixed inset-0 z-40 bg-black/40" onClick={() => !loading && setDrawerMode(null)} />
          <aside className="fixed inset-y-0 right-0 z-50 w-full max-w-xl overflow-y-auto border-l border-black/[.08] bg-white p-6 dark:border-white/[.08] dark:bg-zinc-900">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                {drawerMode === "details" ? "Detalhes do Evento" : drawerMode === "edit" ? "Editar Evento" : "Novo Evento Financeiro"}
              </h3>
              <button className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800" onClick={() => !loading && setDrawerMode(null)}>
                <X className="h-4 w-4" />
              </button>
            </div>

            {drawerMode === "details" && selected ? (
              <div className="mt-5 space-y-3 text-sm">
                <div className="rounded-lg border border-black/[.08] p-3 dark:border-white/[.08]"><strong>Título:</strong> {selected.nome}</div>
                <div className="rounded-lg border border-black/[.08] p-3 dark:border-white/[.08]"><strong>Valor:</strong> {selected.valor}</div>
                <div className="rounded-lg border border-black/[.08] p-3 dark:border-white/[.08]"><strong>Data:</strong> {formatDate(selected.data)}</div>
                <div className="rounded-lg border border-black/[.08] p-3 dark:border-white/[.08]"><strong>Conta:</strong> {selected.conta}</div>
                <div className="rounded-lg border border-black/[.08] p-3 dark:border-white/[.08]"><strong>Categoria:</strong> {selected.categoria}</div>
                <div className="rounded-lg border border-black/[.08] p-3 dark:border-white/[.08]"><strong>Descrição:</strong> {selected.descricao || "Sem descrição"}</div>
                <div className="rounded-lg border border-black/[.08] p-3 dark:border-white/[.08]"><strong>Origem:</strong> {selected.origem}</div>
                <div className="mt-4 flex justify-end gap-2">
                  <button className="h-10 rounded-lg border border-black/[.08] px-3 text-sm" onClick={() => abrirEdicao(selected)}>Editar</button>
                  <button className="h-10 rounded-lg border border-red-200 px-3 text-sm text-red-600" onClick={() => excluirEvento(selected.id)}>Excluir</button>
                  <button className="h-10 rounded-lg border border-black/[.08] px-3 text-sm" onClick={() => {
                    const clone = { ...selected, id: crypto.randomUUID(), nome: `${selected.nome} (cópia)` };
                    setEventos((prev) => [clone, ...prev]);
                    setToast("Evento duplicado.");
                    setTimeout(() => setToast(null), 1400);
                  }}>Duplicar</button>
                </div>
              </div>
            ) : (
              <div className="mt-5 grid grid-cols-1 gap-3">
                <label className="text-sm"><span className="mb-1 block">Tipo</span><select className="h-10 w-full rounded-lg border border-black/[.08] bg-transparent px-3 dark:border-white/[.08]" value={tipo} onChange={(e) => setTipo(e.target.value as TipoEvento)}><option>Entrada</option><option>Saída</option><option>Transferência</option></select></label>
                <label className="text-sm">
                  <span className="mb-1 block">Título</span>
                  <input className={`h-10 w-full rounded-lg border px-3 bg-transparent ${errors.nome ? "border-red-500 bg-red-50 dark:bg-red-900/20" : "border-black/[.08] dark:border-white/[.08]"}`} value={nome} onChange={(e) => { setNome(e.target.value); setErrors((p) => ({ ...p, nome: false })); }} />
                </label>
                <label className="text-sm">
                  <span className="mb-1 block">Valor</span>
                  <input className={`h-10 w-full rounded-lg border px-3 bg-transparent ${errors.valor ? "border-red-500 bg-red-50 dark:bg-red-900/20" : "border-black/[.08] dark:border-white/[.08]"}`} value={valor} onChange={(e) => { setValor(e.target.value); setErrors((p) => ({ ...p, valor: false })); }} placeholder="200,00" />
                </label>
                <label className="text-sm">
                  <span className="mb-1 block">Data</span>
                  <input type="date" className={`h-10 w-full rounded-lg border px-3 bg-transparent ${errors.data ? "border-red-500 bg-red-50 dark:bg-red-900/20" : "border-black/[.08] dark:border-white/[.08]"}`} value={data} onChange={(e) => { setData(e.target.value); setErrors((p) => ({ ...p, data: false })); }} />
                </label>
                <label className="text-sm"><span className="mb-1 block">Conta origem</span><select className="h-10 w-full rounded-lg border border-black/[.08] bg-transparent px-3 dark:border-white/[.08]" value={contaOrigem} onChange={(e) => setContaOrigem(e.target.value)}><option>Carteira</option><option>Nubank</option><option>Inter</option><option>Caixa</option></select></label>
                {tipo === "Transferência" ? <label className="text-sm"><span className="mb-1 block">Conta destino</span><select className="h-10 w-full rounded-lg border border-black/[.08] bg-transparent px-3 dark:border-white/[.08]" value={contaDestino} onChange={(e) => setContaDestino(e.target.value)}><option>Carteira</option><option>Nubank</option><option>Inter</option><option>Caixa</option></select></label> : null}
                <label className="text-sm"><span className="mb-1 block">Categoria</span><select className="h-10 w-full rounded-lg border border-black/[.08] bg-transparent px-3 dark:border-white/[.08]" value={categoria} onChange={(e) => setCategoria(e.target.value)}><option>Alimentação</option><option>Transporte</option><option>Moradia</option><option>Saúde</option><option>Renda</option></select></label>
                <label className="text-sm"><span className="mb-1 block">Descrição</span><textarea className="min-h-20 w-full rounded-lg border border-black/[.08] bg-transparent px-3 py-2 dark:border-white/[.08]" value={descricao} onChange={(e) => setDescricao(e.target.value)} /></label>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={recorrente} onChange={(e) => setRecorrente(e.target.checked)} /> Evento recorrente</label>
                {recorrente ? (
                  <div className="grid grid-cols-2 gap-3">
                    <label className="text-sm"><span className="mb-1 block">Frequência</span><select className="h-10 w-full rounded-lg border border-black/[.08] bg-transparent px-3 dark:border-white/[.08]" value={frequencia} onChange={(e) => setFrequencia(e.target.value)}><option>Diário</option><option>Semanal</option><option>Mensal</option><option>Anual</option></select></label>
                    <label className="text-sm"><span className="mb-1 block">Data final</span><input type="date" className="h-10 w-full rounded-lg border border-black/[.08] bg-transparent px-3 dark:border-white/[.08]" value={termino} onChange={(e) => setTermino(e.target.value)} /></label>
                  </div>
                ) : null}
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={parcelado} onChange={(e) => setParcelado(e.target.checked)} /> Compra parcelada</label>
                {parcelado ? <label className="text-sm"><span className="mb-1 block">Quantidade de parcelas</span><input type="number" min={2} className="h-10 w-full rounded-lg border border-black/[.08] bg-transparent px-3 dark:border-white/[.08]" value={parcelas} onChange={(e) => setParcelas(e.target.value)} /></label> : null}

                <div className="mt-3 flex justify-end gap-2">
                  <button className="h-10 rounded-lg border border-black/[.08] px-4 text-sm dark:border-white/[.08]" onClick={() => setDrawerMode(null)} disabled={loading}>Cancelar</button>
                  <button className="h-10 rounded-lg bg-zinc-950 px-4 text-sm text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900" onClick={salvarEvento} disabled={loading}>{loading ? "Salvando..." : "Salvar"}</button>
                </div>
              </div>
            )}
          </aside>
        </>
      ) : null}
    </>
  );
}
