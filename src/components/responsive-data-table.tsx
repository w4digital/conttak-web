"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Plus, MoreHorizontal, Pencil, Trash2, X } from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";

type Visibility = "always" | "sm" | "md" | "lg";

type Column<T> = {
  key: string;
  label: string;
  cell: (row: T) => ReactNode;
  visibility?: Visibility;
  align?: "left" | "right";
};

type DetailField<T> = {
  label: string;
  value: (row: T) => ReactNode;
};

type RowAction<T> = {
  label: string;
  tone?: "default" | "danger";
  onClick?: (row: T) => void;
};

type FormField<T> = {
  key: keyof T & string;
  label: string;
  type?: "text" | "number" | "date" | "select";
  required?: boolean;
  placeholder?: string;
  options?: { label: string; value: string }[];
  parse?: (raw: string) => unknown;
  format?: (value: unknown) => string;
};

type ResponsiveDataTableProps<T extends { id: string | number }> = {
  data: T[];
  columns: Column<T>[];
  details: DetailField<T>[];
  formFields?: FormField<T>[];
  title?: string;
  createButtonLabel?: string;
  emptyMessage?: string;
  initialPageSize?: number;
  pageSizeOptions?: number[];
  rowActions?: RowAction<T>[];
  onCreate?: (payload: Partial<T>) => void;
  onUpdate?: (row: T, payload: Partial<T>) => void;
  onDelete?: (row: T) => void;
};

function visibilityClass(visibility: Visibility = "always") {
  if (visibility === "sm") return "hidden sm:table-cell";
  if (visibility === "md") return "hidden md:table-cell";
  if (visibility === "lg") return "hidden lg:table-cell";
  return "";
}

export function ResponsiveDataTable<T extends { id: string | number }>({
  data,
  columns,
  details,
  formFields = [],
  title = "Registro",
  createButtonLabel,
  emptyMessage = "Nenhum registro encontrado.",
  initialPageSize = 5,
  pageSizeOptions = [5, 10, 20],
  rowActions,
  onCreate,
  onUpdate,
  onDelete,
}: ResponsiveDataTableProps<T>) {
  type DrawerMode = "view" | "edit" | "create";

  const [pageSize, setPageSize] = useState(initialPageSize);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRow, setSelectedRow] = useState<T | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | number | null>(null);
  const [drawerMode, setDrawerMode] = useState<DrawerMode>("view");
  const [formState, setFormState] = useState<Record<string, string>>({});

  const safePageSize = pageSize > 0 ? pageSize : 5;
  const totalPages = Math.max(1, Math.ceil(data.length / safePageSize));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const pagedData = useMemo(() => {
    const start = (currentPage - 1) * safePageSize;
    const end = start + safePageSize;
    return data.slice(start, end);
  }, [currentPage, data, safePageSize]);

  const startItem = data.length === 0 ? 0 : (currentPage - 1) * safePageSize + 1;
  const endItem = Math.min(currentPage * safePageSize, data.length);

  const defaultActions: RowAction<T>[] = [
    {
      label: "Alterar",
      onClick: (row) => {
        setSelectedRow(row);
        setDrawerMode("edit");
      },
    },
    {
      label: "Excluir",
      tone: "danger",
      onClick: (row) => {
        onDelete?.(row);
      },
    },
  ];

  const actions = rowActions && rowActions.length > 0 ? rowActions : defaultActions;

  function openCreateDrawer() {
    const initialState = formFields.reduce<Record<string, string>>((acc, field) => {
      acc[field.key] = "";
      return acc;
    }, {});

    setFormState(initialState);
    setDrawerMode("create");
    setSelectedRow(null);
    setOpenMenuId(null);
  }

  function openEditDrawer(row: T) {
    const initialState = formFields.reduce<Record<string, string>>((acc, field) => {
      const value = row[field.key];
      if (value === null || value === undefined) {
        acc[field.key] = "";
        return acc;
      }

      if (field.format) {
        acc[field.key] = field.format(value);
        return acc;
      }

      acc[field.key] = String(value);
      return acc;
    }, {});

    setFormState(initialState);
    setSelectedRow(row);
    setDrawerMode("edit");
    setOpenMenuId(null);
  }

  function closeDrawer() {
    setSelectedRow(null);
    setDrawerMode("view");
  }

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const payload = formFields.reduce<Partial<T>>((acc, field) => {
      const rawValue = formState[field.key] ?? "";
      const parsedValue = field.parse
        ? field.parse(rawValue)
        : field.type === "number"
        ? Number(rawValue || 0)
        : rawValue;

      return {
        ...acc,
        [field.key]: parsedValue,
      };
    }, {});

    if (drawerMode === "create") {
      onCreate?.(payload);
      closeDrawer();
      return;
    }

    if (selectedRow) {
      onUpdate?.(selectedRow, payload);
    }
    closeDrawer();
  }

  const drawerOpen = drawerMode === "create" || !!selectedRow;
  const isFormMode = drawerMode === "create" || drawerMode === "edit";

  return (
    <>
      <div className="flex items-center justify-end">
        <button
          type="button"
          className="inline-flex h-10 items-center gap-2 rounded-full bg-zinc-950 px-5 text-sm font-medium text-zinc-50 transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
          onClick={openCreateDrawer}
        >
          <Plus className="h-4 w-4" />
          {createButtonLabel ?? `Novo ${title}`}
        </button>
      </div>

      <div className="rounded-2xl border border-black/[.08] bg-white dark:border-white/[.08] dark:bg-zinc-900">
        <div className="min-h-[300px] max-h-[56vh] overflow-auto lg:max-h-[62vh]">
          {pagedData.length > 0 ? (
            <table className="w-full text-sm">
              <thead className="sticky top-0 z-10 bg-white dark:bg-zinc-900">
                <tr className="border-b border-black/[.06] dark:border-white/[.06]">
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      className={cn(
                        "px-4 py-3 text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400 sm:px-6",
                        column.align === "right" ? "text-right" : "text-left",
                        visibilityClass(column.visibility)
                      )}
                    >
                      {column.label}
                    </th>
                  ))}
                  <th className="w-14 px-4 py-3 text-right text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400 sm:px-6">
                    Opções
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[.04] dark:divide-white/[.04]">
                {pagedData.map((row) => (
                  <tr
                    key={row.id}
                    className="cursor-pointer transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                    onClick={() => {
                      setSelectedRow(row);
                      setDrawerMode("view");
                      setOpenMenuId(null);
                    }}
                  >
                    {columns.map((column) => (
                      <td
                        key={`${row.id}-${column.key}`}
                        className={cn(
                          "px-4 py-4 sm:px-6",
                          column.align === "right" ? "text-right" : "text-left",
                          visibilityClass(column.visibility)
                        )}
                      >
                        {column.cell(row)}
                      </td>
                    ))}
                    <td className="px-4 py-4 text-right sm:px-6">
                      <div className="relative inline-flex">
                        <button
                          type="button"
                          aria-label="Abrir opções"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                          onClick={(event) => {
                            event.stopPropagation();
                            setOpenMenuId((current) => (current === row.id ? null : row.id));
                          }}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </button>

                        {openMenuId === row.id ? (
                          <div
                            className="absolute right-0 top-9 z-20 w-40 overflow-hidden rounded-xl border border-black/[.08] bg-white p-1 shadow-lg dark:border-white/[.08] dark:bg-zinc-900"
                            onClick={(event) => event.stopPropagation()}
                          >
                            {actions.map((action) => (
                              <button
                                key={action.label}
                                type="button"
                                className={cn(
                                  "flex w-full items-center rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800",
                                  action.tone === "danger"
                                    ? "text-red-600 dark:text-red-400"
                                    : "text-zinc-700 dark:text-zinc-200"
                                )}
                                onClick={() => {
                                  if (action.label.toLowerCase().includes("alter")) {
                                    openEditDrawer(row);
                                  }
                                  action.onClick?.(row);
                                  setOpenMenuId(null);
                                }}
                              >
                                {action.label}
                              </button>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex min-h-[300px] flex-col items-center justify-center gap-3 p-8 text-center">
              <div className="rounded-full bg-zinc-100 p-3 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-300">
                <Plus className="h-5 w-5" />
              </div>
              <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
                {emptyMessage}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Cadastre um novo item para começar.
              </p>
              <button
                type="button"
                className="mt-1 inline-flex h-9 items-center gap-2 rounded-lg border border-black/[.08] bg-white px-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-white/[.08] dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
                onClick={openCreateDrawer}
              >
                <Plus className="h-4 w-4" />
                {createButtonLabel ?? `Novo ${title}`}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Mostrando {startItem} a {endItem} de {data.length}
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <label className="text-sm text-zinc-500 dark:text-zinc-400" htmlFor="page-size">
            Itens por página
          </label>
          <select
            id="page-size"
            className="h-9 rounded-lg border border-black/[.08] bg-white px-2 text-sm text-zinc-700 dark:border-white/[.08] dark:bg-zinc-900 dark:text-zinc-200"
            value={pageSize}
            onChange={(event) => {
              setPageSize(Number(event.target.value));
              setCurrentPage(1);
            }}
          >
            {pageSizeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-black/[.08] text-zinc-600 transition-colors hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/[.08] dark:text-zinc-300 dark:hover:bg-zinc-800"
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            disabled={currentPage === 1}
            aria-label="Página anterior"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <span className="min-w-16 text-center text-sm text-zinc-700 dark:text-zinc-200">
            {currentPage}/{totalPages}
          </span>

          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-black/[.08] text-zinc-600 transition-colors hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/[.08] dark:text-zinc-300 dark:hover:bg-zinc-800"
            onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
            disabled={currentPage === totalPages}
            aria-label="Próxima página"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/40 transition-opacity",
          drawerOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={closeDrawer}
      />

      <aside
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-full max-w-md border-l border-black/[.08] bg-white p-6 shadow-xl transition-transform dark:border-white/[.08] dark:bg-zinc-900",
          drawerOpen ? "translate-x-0" : "translate-x-full"
        )}
        aria-hidden={!drawerOpen}
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
              {drawerMode === "create"
                ? `Novo ${title}`
                : drawerMode === "edit"
                ? `Editar ${title}`
                : `Detalhes do ${title}`}
            </h2>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              {drawerMode === "create"
                ? "Cadastro rápido"
                : drawerMode === "edit"
                ? "Atualize os campos do registro"
                : "Visualização da linha selecionada"}
            </p>
          </div>
          <button
            type="button"
            aria-label="Fechar detalhes"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
            onClick={closeDrawer}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {isFormMode ? (
          <form className="mt-6 space-y-4" onSubmit={handleFormSubmit}>
            {formFields.map((field) => (
              <div key={field.key} className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
                  {field.label}
                </label>
                {field.type === "select" ? (
                  <select
                    className="h-10 w-full rounded-lg border border-black/[.08] bg-white px-3 text-sm text-zinc-700 outline-none transition-colors focus:border-zinc-400 dark:border-white/[.08] dark:bg-zinc-900 dark:text-zinc-200 dark:focus:border-zinc-500"
                    value={formState[field.key] ?? ""}
                    onChange={(event) =>
                      setFormState((current) => ({
                        ...current,
                        [field.key]: event.target.value,
                      }))
                    }
                    required={field.required}
                  >
                    <option value="">Selecione</option>
                    {field.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type ?? "text"}
                    className="h-10 w-full rounded-lg border border-black/[.08] bg-white px-3 text-sm text-zinc-700 outline-none transition-colors focus:border-zinc-400 dark:border-white/[.08] dark:bg-zinc-900 dark:text-zinc-200 dark:focus:border-zinc-500"
                    value={formState[field.key] ?? ""}
                    onChange={(event) =>
                      setFormState((current) => ({
                        ...current,
                        [field.key]: event.target.value,
                      }))
                    }
                    placeholder={field.placeholder}
                    required={field.required}
                  />
                )}
              </div>
            ))}

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                className="inline-flex h-10 items-center rounded-lg border border-black/[.08] px-4 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-white/[.08] dark:text-zinc-200 dark:hover:bg-zinc-800"
                onClick={closeDrawer}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="inline-flex h-10 items-center rounded-lg bg-zinc-950 px-4 text-sm font-medium text-zinc-50 transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
              >
                {drawerMode === "create" ? "Cadastrar" : "Salvar alterações"}
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="mt-6 space-y-4">
              {selectedRow
                ? details.map((field) => (
                    <div
                      key={`${selectedRow.id}-${field.label}`}
                      className="rounded-xl border border-black/[.06] bg-zinc-50 px-4 py-3 dark:border-white/[.06] dark:bg-zinc-800/60"
                    >
                      <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                        {field.label}
                      </p>
                      <div className="mt-1 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                        {field.value(selectedRow)}
                      </div>
                    </div>
                  ))
                : null}
            </div>

            <div className="mt-6 flex items-center justify-end gap-2">
              {selectedRow ? (
                <>
                  <button
                    type="button"
                    className="inline-flex h-10 items-center gap-2 rounded-lg border border-black/[.08] px-4 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-white/[.08] dark:text-zinc-200 dark:hover:bg-zinc-800"
                    onClick={() => openEditDrawer(selectedRow)}
                  >
                    <Pencil className="h-4 w-4" />
                    Editar
                  </button>
                  <button
                    type="button"
                    className="inline-flex h-10 items-center gap-2 rounded-lg bg-red-600 px-4 text-sm font-medium text-white transition-colors hover:bg-red-500"
                    onClick={() => {
                      onDelete?.(selectedRow);
                      closeDrawer();
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                    Excluir
                  </button>
                </>
              ) : null}
            </div>
          </>
        )}
      </aside>
    </>
  );
}
