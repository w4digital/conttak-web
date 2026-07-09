import { Brain, Compass, Target, Users, Wallet } from 'lucide-react';
import { SectionHeading } from './section-heading';

const features = [
	{
		icon: Wallet,
		title: 'Controle Financeiro',
		description:
			'Entenda para onde seu dinheiro vai, com clareza e sem esforço manual.',
	},
	{
		icon: Compass,
		title: 'Planejamento de Vida',
		description:
			'Transforme desejos em metas executáveis, conectadas ao seu futuro.',
	},
	{
		icon: Target,
		title: 'Metas Financeiras',
		description: 'Acompanhe sua evolução e veja cada objetivo ganhar forma.',
	},
	{
		icon: Users,
		title: 'Família e Colaboração',
		description: 'Construa objetivos juntos, com quem faz parte do seu futuro.',
	},
	{
		icon: Brain,
		title: 'Inteligência Financeira',
		description: 'Receba insights para tomar melhores decisões todos os meses.',
	},
];

export function FeaturesSection() {
	return (
		<section
			id="recursos"
			className="mx-auto w-full max-w-6xl px-5 py-20 sm:py-28"
		>
			<SectionHeading
				eyebrow="Recursos"
				title="Tudo o que você precisa para planejar o futuro."
				description="Uma plataforma completa que conecta o hoje ao que você quer construir."
			/>

			<div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{features.map((f, i) => (
					<div
						key={f.title}
						className={
							'group rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40 ' +
							(i === 0
								? 'lg:row-span-2 lg:flex lg:flex-col lg:justify-between'
								: '')
						}
					>
						<div>
							<span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary transition-transform group-hover:scale-105">
								<f.icon className="h-5 w-5" />
							</span>
							<h3 className="mt-5 text-lg font-medium">{f.title}</h3>
							<p className="mt-2 text-sm leading-relaxed text-muted-foreground">
								{f.description}
							</p>
						</div>
						{i === 0 && (
							<div className="mt-6 hidden rounded-xl border border-border bg-background/60 p-4 lg:block">
								<div className="flex items-end justify-between gap-1.5">
									{[40, 55, 48, 70, 62, 84].map((h) => (
										<div
											key={`${h}-bar`}
											className="w-full rounded-t bg-primary/60"
											style={{ height: `${h}px` }}
										/>
									))}
								</div>
								<p className="mt-3 text-xs text-muted-foreground">
									Seus gastos por categoria, sempre organizados.
								</p>
							</div>
						)}
					</div>
				))}
			</div>
		</section>
	);
}
