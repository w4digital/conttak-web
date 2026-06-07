interface StatCardProps {
  label: string;
  value: string;
  change: string;
  positive: boolean;
}

export default function StatCard({
  label,
  value,
  change,
  positive,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-black/[.08] bg-white p-5 dark:border-white/[.08] dark:bg-zinc-900">
      <p className="text-sm text-zinc-500 dark:text-zinc-400">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
        {value}
      </p>
      <p
        className={`mt-1 text-xs font-medium ${
          positive
            ? "text-emerald-600 dark:text-emerald-400"
            : "text-red-500 dark:text-red-400"
        }`}
      >
        {change} este mês
      </p>
    </div>
  );
}
