import { ArrowUpRight, TrendingUp } from 'lucide-react';
import { SectionHeading } from './section-heading';

const insights = [
	{
		icon: ArrowUpRight,
		text: 'Você consegue atingir sua meta 3 meses antes aumentando seu aporte em R$ 200.',
	},
	{
		icon: TrendingUp,
		text: 'Seus gastos aumentaram 15% nesta categoria neste mês.',
	},
];

export function AiSection() {
	return (
		<section id="ia" className="relative overflow-hidden">
			<div
				aria-hidden="true"
				className="pointer-events-none absolute left-1/2 top-1/2 h-[360px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]"
			/>
			<div className="relative mx-auto w-full max-w-6xl px-5 py-20 sm:py-28">
				<SectionHeading
					eyebrow="Visão de futuro"
					title="Seu assistente financeiro inteligente."
					description="Em breve, o Conttak vai antecipar oportunidades e ajudar você a decidir melhor."
				/>

				<div className="mx-auto mt-14 max-w-2xl space-y-4">
					{insights.map((ins) => (
						<div
							key={ins.text}
							className="flex items-start gap-4 rounded-2xl border border-primary/25 bg-primary/[0.06] p-5"
						>
							<span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
								<ins.icon className="h-5 w-5" />
							</span>
							<p className="text-base leading-relaxed text-foreground">
								{ins.text}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
