import { FolderKanban, Heart, Home } from 'lucide-react';
import { SectionHeading } from './section-heading';

const cards = [
	{
		icon: Heart,
		title: 'Casal',
		description:
			'Alinhem sonhos e decisões financeiras e caminhem na mesma direção.',
	},
	{
		icon: Home,
		title: 'Família',
		description:
			'Organizem objetivos compartilhados e o futuro de todos em um só lugar.',
	},
	{
		icon: FolderKanban,
		title: 'Projetos compartilhados',
		description:
			'Uma viagem, uma reforma, um sonho grande — planejados em conjunto.',
	},
];

export function FamilySection() {
	return (
		<section id="familia" className="border-y border-border bg-card/40">
			<div className="mx-auto w-full max-w-6xl px-5 py-20 sm:py-28">
				<SectionHeading
					eyebrow="Família"
					title="Planeje o futuro com quem faz parte dele."
					description="O Conttak foi feito para ser vivido em conjunto. Convide quem importa e construam juntos."
				/>

				<div className="mt-14 grid gap-4 md:grid-cols-3">
					{cards.map((c) => (
						<div
							key={c.title}
							className="rounded-2xl border border-border bg-card p-6"
						>
							<span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
								<c.icon className="h-5 w-5" />
							</span>
							<h3 className="mt-5 text-lg font-medium">{c.title}</h3>
							<p className="mt-2 text-sm leading-relaxed text-muted-foreground">
								{c.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
