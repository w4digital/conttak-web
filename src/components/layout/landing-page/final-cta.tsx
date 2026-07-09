import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { Button } from '#/components/ui/button';

export function FinalCta() {
	return (
		<section className="mx-auto w-full max-w-6xl px-5 pb-24 pt-8">
			<div className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-16 text-center sm:px-12 sm:py-20">
				<div
					aria-hidden="true"
					className="pointer-events-none absolute left-1/2 top-0 h-[280px] w-[560px] -translate-x-1/2 rounded-full bg-primary/15 blur-[100px]"
				/>
				<div className="relative mx-auto max-w-2xl">
					<h2 className="text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
						Dinheiro é uma ferramenta. O futuro que você constrói depende das
						decisões de hoje.
					</h2>
					<div className="mt-8">
						<Button asChild size="lg" className="rounded-full">
							<Link to="/register">
								Comece seu planejamento
								<ArrowRight className="h-4 w-4" />
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
