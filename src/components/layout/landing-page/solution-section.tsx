import {
	ArrowDown,
	CalendarCheck,
	LineChart,
	Sparkles,
	Target,
	Trophy,
} from 'lucide-react';
import { SectionHeading } from './section-heading';

const journey = [
	{ icon: Sparkles, label: 'Sonho', value: 'Comprar uma casa' },
	{ icon: Target, label: 'Objetivo', value: 'Entrada de R$ 80.000' },
	{ icon: LineChart, label: 'Meta', value: 'Guardar R$ 1.500 / mês' },
	{
		icon: CalendarCheck,
		label: 'Planejamento',
		value: 'Ações mensais para alcançar',
	},
	{ icon: Trophy, label: 'Resultado', value: 'Casa conquistada em 2028' },
];

export function SolutionSection() {
	return (
		<section
			id="solucao"
			className="relative overflow-hidden border-y border-border bg-card/40"
		>
			<div className="mx-auto w-full max-w-6xl px-5 py-20 sm:py-28">
				<SectionHeading
					eyebrow="A solução"
					title="O Conttak transforma dinheiro em direção."
					description="Cada sonho vira um caminho claro, com metas e ações concretas para chegar lá."
				/>

				<div className="mx-auto mt-14 max-w-lg">
					{journey.map((step, i) => (
						<div key={step.label}>
							<div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
								<span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
									<step.icon className="h-5 w-5" />
								</span>
								<div>
									<p className="text-xs font-medium uppercase tracking-widest text-primary">
										{step.label}
									</p>
									<p className="mt-1 text-base font-medium text-foreground">
										{step.value}
									</p>
								</div>
							</div>
							{i < journey.length - 1 && (
								<div className="flex justify-center py-2" aria-hidden="true">
									<ArrowDown className="h-5 w-5 text-muted-foreground" />
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
