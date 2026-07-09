import { Logo } from './logo';

const columns = [
	{
		title: 'Produto',
		links: ['Recursos', 'Planejamento', 'Família', 'Inteligência'],
	},
	{
		title: 'Empresa',
		links: ['Sobre', 'Blog', 'Carreiras', 'Contato'],
	},
	{
		title: 'Legal',
		links: ['Privacidade', 'Termos', 'Segurança'],
	},
];

export function SiteFooter() {
	return (
		<footer className="border-t border-border">
			<div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
				<div>
					<div className="flex items-center gap-2">
						<Logo />
						<span className="text-lg font-semibold tracking-tight">
							Conttak
						</span>
					</div>
					<p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
						Transforme sonhos em planos financeiros reais.
					</p>
				</div>

				{columns.map((col) => (
					<div key={col.title}>
						<p className="text-sm font-medium">{col.title}</p>
						<ul className="mt-4 space-y-3">
							{col.links.map((link) => (
								<li key={link}>
									<a
										className="text-sm text-muted-foreground transition-colors hover:text-foreground"
										href="/"
									>
										{link}
									</a>
								</li>
							))}
						</ul>
					</div>
				))}
			</div>

			<div className="border-t border-border">
				<div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-5 py-6 text-sm text-muted-foreground sm:flex-row">
					<p>
						© {new Date().getFullYear()} Conttak. Todos os direitos reservados.
					</p>
					<p>Feito para quem planeja o futuro.</p>
				</div>
			</div>
		</footer>
	);
}
