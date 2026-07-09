import { Check, X } from 'lucide-react';
import { SectionHeading } from './section-heading';

const rows = [
	{ traditional: 'Quanto eu gastei?', conttak: 'O que eu quero construir?' },
	{ traditional: 'Olha para o passado', conttak: 'Planeja o futuro' },
	{ traditional: 'Números soltos', conttak: 'Objetivos com direção' },
	{ traditional: 'Uso individual', conttak: 'Planejamento em família' },
	{ traditional: 'Registra gastos', conttak: 'Transforma sonhos em metas' },
];

export function DifferentiatorSection() {
	return (
		<section className="mx-auto w-full max-w-6xl px-5 py-20 sm:py-28">
			<SectionHeading
				eyebrow="O diferencial"
				title="Não é sobre o que passou. É sobre o que vem pela frente."
			/>

			<div className="mx-auto mt-14 grid max-w-3xl gap-4 sm:grid-cols-2">
				{/* traditional */}
				<div className="rounded-2xl border border-border bg-card p-6">
					<p className="text-sm font-medium text-muted-foreground">
						Apps tradicionais
					</p>
					<ul className="mt-5 space-y-4">
						{rows.map((r) => (
							<li key={r.traditional} className="flex items-start gap-3">
								<span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
									<X className="h-3 w-3" />
								</span>
								<span className="text-sm text-muted-foreground">
									{r.traditional}
								</span>
							</li>
						))}
					</ul>
				</div>

				{/* conttak */}
				<div className="rounded-2xl border border-primary/40 bg-primary/[0.06] p-6 shadow-[0_0_0_1px_var(--color-primary)]/0">
					<p className="text-sm font-semibold text-primary">Conttak</p>
					<ul className="mt-5 space-y-4">
						{rows.map((r) => (
							<li key={r.conttak} className="flex items-start gap-3">
								<span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
									<Check className="h-3 w-3" />
								</span>
								<span className="text-sm font-medium text-foreground">
									{r.conttak}
								</span>
							</li>
						))}
					</ul>
				</div>
			</div>
		</section>
	);
}
