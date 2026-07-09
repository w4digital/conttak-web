import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/(public)')({
	component: RouteComponent,
	beforeLoad: ({ context }) => {
		if (context.auth.isAuthenticated) {
			throw redirect({
				to: '/dashboard',
			});
		}
	},
});

function RouteComponent() {
	return (
		<div className="relative min-h-screen w-full overflow-hidden px-4 py-8">
			<div className="pointer-events-none absolute inset-0 -z-10">
				<div className="absolute inset-0 bg-linear-to-br from-sidebar-primary/20 via-transparent to-transparent opacity-40 blur-3xl" />
			</div>

			<div className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-5xl items-center gap-8 lg:grid-cols-2">
				<section className="space-y-4 text-center lg:text-left">
					<p className="text-xs font-semibold tracking-[0.22em] text-[var(--kicker)] uppercase">
						Conttak Platform
					</p>
					<h1 className="font-heading text-4xl leading-tight font-semibold text-[var(--sea-ink)] md:text-5xl">
						Acesso rapido e seguro ao seu workspace
					</h1>
					<p className="max-w-xl text-sm text-[var(--sea-ink-soft)] md:text-base">
						Entre na sua conta para continuar ou crie seu cadastro em poucos
						segundos.
					</p>
				</section>

				<Outlet />
			</div>
		</div>
	);
}
