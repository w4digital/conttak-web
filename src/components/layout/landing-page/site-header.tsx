'use client';

import { Link } from '@tanstack/react-router';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '#/components/ui/button';
import { Logo } from './logo';

const navLinks = [
	{ label: 'Problema', href: '#problema' },
	{ label: 'Solução', href: '#solucao' },
	{ label: 'Recursos', href: '#recursos' },
	{ label: 'Família', href: '#familia' },
	{ label: 'Inteligência', href: '#ia' },
];

export function SiteHeader() {
	const [open, setOpen] = useState(false);

	return (
		<header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
			<div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5">
				<a
					href="/"
					className="flex items-center gap-2"
					aria-label="Conttak, página inicial"
				>
					<Logo />
					<span className="text-lg font-semibold tracking-tight">Conttak</span>
				</a>

				<nav
					className="hidden items-center gap-8 md:flex"
					aria-label="Navegação principal"
				>
					{navLinks.map((link) => (
						<a
							key={link.href}
							href={link.href}
							className="text-sm text-muted-foreground transition-colors hover:text-foreground"
						>
							{link.label}
						</a>
					))}
				</nav>

				<div className="hidden items-center gap-3 md:flex">
					<Button
						asChild
						variant="ghost"
						className="text-sm text-muted-foreground hover:text-foreground"
					>
						<Link to="/login">Entrar</Link>
					</Button>
					<Button asChild className="rounded-full">
						<Link to="/register">Começar grátis</Link>
					</Button>
				</div>

				<button
					type="button"
					className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground md:hidden"
					onClick={() => setOpen((v) => !v)}
					aria-label={open ? 'Fechar menu' : 'Abrir menu'}
					aria-expanded={open}
				>
					{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
				</button>
			</div>

			{open && (
				<div className="border-t border-border/60 bg-background md:hidden">
					<nav
						aria-label="Navegação mobile"
						className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-5 py-4"
					>
						{navLinks.map((link) => (
							<a
								className="rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
								href={link.href}
								key={link.href}
								onClick={() => setOpen(false)}
							>
								{link.label}
							</a>
						))}
						<div className="mt-3 flex flex-col gap-2">
							<Button asChild variant="outline" className="w-full">
								<Link to="/login">Entrar</Link>
							</Button>
							<Button asChild className="w-full rounded-full">
								<Link to="/register">Começar grátis</Link>
							</Button>
						</div>
					</nav>
				</div>
			)}
		</header>
	);
}
