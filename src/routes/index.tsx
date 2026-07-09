import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { AiSection } from '#/components/layout/landing-page/ai-section';
import { AuroraBackground } from '#/components/layout/landing-page/aurora-background';
import { DashboardMockup } from '#/components/layout/landing-page/dashboard-mockup';
import { DifferentiatorSection } from '#/components/layout/landing-page/differentiator-section';
import { FamilySection } from '#/components/layout/landing-page/family-section';
import { FeaturesSection } from '#/components/layout/landing-page/features-section';
import { FinalCta } from '#/components/layout/landing-page/final-cta';
import { ProblemSection } from '#/components/layout/landing-page/problem-section';
import { SiteFooter } from '#/components/layout/landing-page/site-footer';
import { SiteHeader } from '#/components/layout/landing-page/site-header';
import { SolutionSection } from '#/components/layout/landing-page/solution-section';
import { Button } from '#/components/ui/button';

export const Route = createFileRoute('/')({
	component: LandingPage,
});

function HeroSection() {
	return (
		<section className="relative mx-auto w-full max-w-6xl px-5 pb-20 pt-16 sm:pb-24 sm:pt-24">
			<div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
				<div>
					<p className="text-sm font-medium uppercase tracking-widest text-primary">
						Planejamento de vida financeiro
					</p>
					<h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
						Transforme sonhos em planos reais, com direção clara para o seu
						futuro.
					</h1>
					<p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
						O Conttak conecta seu dinheiro, seus objetivos e as pessoas que
						fazem parte da sua jornada em um só lugar.
					</p>

					<div className="mt-8 flex flex-col gap-3 sm:flex-row">
						<Button asChild size="lg" className="rounded-full">
							<Link to="/register">
								Começar gratuitamente
								<ArrowRight className="h-4 w-4" />
							</Link>
						</Button>
						<Button
							asChild
							size="lg"
							variant="outline"
							className="rounded-full"
						>
							<a href="#recursos">Ver recursos</a>
						</Button>
					</div>
				</div>

				<DashboardMockup />
			</div>
		</section>
	);
}

function LandingPage() {
	return (
		<div className="relative min-h-screen bg-background text-foreground">
			<AuroraBackground />
			<div className="relative z-10">
				<SiteHeader />
				<main>
					<HeroSection />
					<ProblemSection />
					<SolutionSection />
					<FeaturesSection />
					<DifferentiatorSection />
					<FamilySection />
					<AiSection />
					<FinalCta />
				</main>
				<SiteFooter />
			</div>
		</div>
	);
}
