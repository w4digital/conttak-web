import {
	BellIcon,
	LogOutIcon,
	SearchIcon,
	SettingsIcon,
	UserIcon,
	XIcon,
} from 'lucide-react';
import * as React from 'react';
import { Button } from '#/components/ui/button';
import { Input } from '#/components/ui/input';
import { SidebarTrigger } from '#/components/ui/sidebar';

function NotificationsButton() {
	return (
		<Button
			aria-label="Notificações"
			className="relative"
			size="icon"
			variant="ghost"
		>
			<BellIcon className="size-4" />
			<span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-red-500" />
		</Button>
	);
}

function UserMenu() {
	const [open, setOpen] = React.useState(false);
	const ref = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setOpen(false);
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const items = [
		{ icon: UserIcon, label: 'Perfil' },
		{ icon: SettingsIcon, label: 'Configurações' },
		{ icon: LogOutIcon, label: 'Sair', danger: true },
	];

	return (
		<div className="relative" ref={ref}>
			<Button
				aria-label="Menu do usuário"
				onClick={() => setOpen((o) => !o)}
				size="icon"
				variant="ghost"
			>
				<div className="flex size-7 items-center justify-center rounded-full bg-muted text-xs font-semibold">
					U
				</div>
			</Button>

			{open && (
				<div className="absolute right-0 top-full z-50 mt-1 w-44 rounded-lg border bg-popover shadow-md">
					<div className="px-3 py-2 text-sm font-medium">Usuário</div>
					<div className="my-1 h-px bg-border" />
					{items.map(({ icon: Icon, label, danger }) => (
						<button
							className={`flex w-full items-center gap-2 px-3 py-2 text-sm transition-colors hover:bg-accent ${danger ? 'text-destructive hover:text-destructive' : ''}`}
							key={label}
							onClick={() => setOpen(false)}
							type="button"
						>
							<Icon className="size-4" />
							{label}
						</button>
					))}
				</div>
			)}
		</div>
	);
}

function SearchBar() {
	const [expanded, setExpanded] = React.useState(false);
	const inputRef = React.useRef<HTMLInputElement>(null);

	function expand() {
		setExpanded(true);
		setTimeout(() => inputRef.current?.focus(), 0);
	}

	return (
		<>
			{/* Desktop: always visible */}
			<div className="relative hidden w-56 sm:block">
				<SearchIcon className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
				<Input className="h-8 pl-8 text-sm" placeholder="Buscar..." />
			</div>

			{/* Mobile: icon that expands to full-width overlay */}
			<div className="sm:hidden">
				{expanded ? (
					<div className="absolute inset-x-0 top-0 z-20 flex h-12 items-center gap-2 border-b border-sidebar-border bg-sidebar px-4">
						<SearchIcon className="size-4 shrink-0 text-muted-foreground" />
						<Input
							ref={inputRef}
							autoFocus
							className="h-8 flex-1 border-none bg-transparent text-sm shadow-none focus-visible:ring-0"
							placeholder="Buscar..."
						/>
						<Button
							aria-label="Fechar busca"
							size="icon"
							variant="ghost"
							onClick={() => setExpanded(false)}
						>
							<XIcon className="size-4" />
						</Button>
					</div>
				) : (
					<Button
						aria-label="Buscar"
						size="icon"
						variant="ghost"
						onClick={expand}
					>
						<SearchIcon className="size-4" />
					</Button>
				)}
			</div>
		</>
	);
}

function Header() {
	return (
		<header className="sticky top-0 z-40 border-b border-sidebar-border bg-sidebar backdrop-blur-xl">
			<div className="flex h-16 w-full items-center gap-2 px-4 sm:px-5">
				<SidebarTrigger className="-ml-1" />
				<div className="flex flex-1 items-center justify-end gap-1">
					<SearchBar />
					<NotificationsButton />
					<UserMenu />
				</div>
			</div>
		</header>
	);
}

export { Header };
