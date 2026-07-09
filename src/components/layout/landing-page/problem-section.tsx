import { BellOff, FileSpreadsheet, Landmark, Users } from 'lucide-react';
import { SectionHeading } from './section-heading';

const problems = [
	{
		icon: FileSpreadsheet,
		title: 'Planilhas separadas',
		description:
			'Informações espalhadas em arquivos que ninguém mais entende — e que ninguém atualiza.',
	},
	{
		icon: Landmark,
		title: 'O banco mostra gastos, não objetivos',
		description:
			'Você vê para onde o dinheiro foi, mas nunca para onde ele deveria estar indo.',
	},
	{
		icon: BellOff,
		title: 'Metas ficam esquecidas',
		description:
			'Sonhos viram promessas vagas sem um plano concreto para chegar lá.',
	},
	{
		icon: Users,
		title: 'Famílias não planejam juntas',
		description:
			'Cada um cuida do seu, e o futuro em comum nunca ganha uma direção clara.',
	},
];

export function ProblemSection() {
	return (
		<section
			id="problema"
			className="mx-auto w-full max-w-6xl px-5 py-20 sm:py-28"
		>
			<SectionHeading
				eyebrow="O problema"
				title="As pessoas têm dinheiro em vários lugares, mas nenhuma visão do futuro."
			/>

			<div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{problems.map((p) => (
					<div
						key={p.title}
						className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-border/80"
					>
						<span className="flex h-11 w-11 items-center justify-center rounded-xl bg-muted text-muted-foreground">
							<p.icon className="h-5 w-5" />
						</span>
						<h3 className="mt-5 text-base font-medium">{p.title}</h3>
						<p className="mt-2 text-sm leading-relaxed text-muted-foreground">
							{p.description}
						</p>
					</div>
				))}
			</div>
		</section>
	);
}
