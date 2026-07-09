import {
	ArrowUpRight,
	GraduationCap,
	Home,
	Plane,
	Sparkles,
	TrendingUp,
} from 'lucide-react';

const goals = [
	{
		icon: Home,
		label: 'Casa própria',
		value: 'R$ 42.300',
		target: 'R$ 80.000',
		pct: 53,
	},
	{
		icon: Plane,
		label: 'Viagem em família',
		value: 'R$ 6.800',
		target: 'R$ 12.000',
		pct: 57,
	},
	{
		icon: GraduationCap,
		label: 'Faculdade dos filhos',
		value: 'R$ 18.500',
		target: 'R$ 60.000',
		pct: 31,
	},
];

export function DashboardMockup() {
	return (
		<div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
			{/* top bar */}
			<div className="flex items-center gap-2 border-b border-border px-4 py-3">
				<span className="h-3 w-3 rounded-full bg-muted-foreground/30" />
				<span className="h-3 w-3 rounded-full bg-muted-foreground/30" />
				<span className="h-3 w-3 rounded-full bg-muted-foreground/30" />
				<div className="ml-3 flex-1 rounded-md bg-muted px-3 py-1 text-center text-xs text-muted-foreground">
					app.conttak.com/painel
				</div>
			</div>

			<div className="grid gap-4 p-4 sm:grid-cols-3 sm:p-5">
				{/* balance card */}
				<div className="sm:col-span-2 rounded-xl border border-border bg-background/60 p-5">
					<div className="flex items-start justify-between">
						<div>
							<p className="text-sm text-muted-foreground">Patrimônio total</p>
							<p className="mt-1 text-3xl font-semibold tracking-tight">
								R$ 148.920
							</p>
						</div>
						<span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2.5 py-1 text-xs font-medium text-primary">
							<TrendingUp className="h-3.5 w-3.5" /> +8,2%
						</span>
					</div>
					{/* chart */}
					<div className="mt-5 flex h-24 items-end gap-1.5">
						{[38, 46, 42, 55, 51, 63, 60, 72, 68, 80, 84, 96].map((h) => (
							<div
								key={`chart-bar-${h}`}
								className="flex-1 rounded-t bg-primary/70"
								style={{ height: `${h}%` }}
							/>
						))}
					</div>
				</div>

				{/* insight card */}
				<div className="rounded-xl border border-primary/30 bg-primary/10 p-4">
					<div className="flex items-center gap-2 text-primary">
						<Sparkles className="h-4 w-4" />
						<span className="text-xs font-semibold uppercase tracking-wide">
							Insight
						</span>
					</div>
					<p className="mt-2 text-sm leading-relaxed text-foreground">
						Aumentando seu aporte em{' '}
						<span className="font-semibold text-primary">R$ 200/mês</span>, você
						atinge a meta da casa{' '}
						<span className="font-semibold text-primary">3 meses antes</span>.
					</p>
				</div>

				{/* goals */}
				<div className="sm:col-span-3 rounded-xl border border-border bg-background/60 p-4">
					<div className="mb-3 flex items-center justify-between">
						<p className="text-sm font-medium">Seus objetivos</p>
						<span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
							Ver plano de vida <ArrowUpRight className="h-3.5 w-3.5" />
						</span>
					</div>
					<div className="grid gap-3 sm:grid-cols-3">
						{goals.map((g) => (
							<div
								key={g.label}
								className="rounded-lg border border-border bg-card p-3"
							>
								<div className="flex items-center gap-2">
									<span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/15 text-primary">
										<g.icon className="h-4 w-4" />
									</span>
									<span className="text-xs font-medium">{g.label}</span>
								</div>
								<div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
									<div
										className="h-full rounded-full bg-primary"
										style={{ width: `${g.pct}%` }}
									/>
								</div>
								<div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
									<span className="text-foreground">{g.value}</span>
									<span>{g.target}</span>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
