import { Link, useRouterState } from '@tanstack/react-router';
import {
	CheckIcon,
	ChevronsUpDownIcon,
	GaugeIcon,
	SettingsIcon,
	UsersIcon,
} from 'lucide-react';
import * as React from 'react';
import { Logo as LandingLogo } from '#/components/layout/landing-page/logo';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
	SidebarSeparator,
	useSidebar,
} from '#/components/ui/sidebar';

type Workspace = {
	id: string;
	name: string;
	plan: string;
	logo?: string;
};

const WORKSPACES: Workspace[] = [
	{ id: 'ws-1', name: 'Acme Corp', plan: 'Pro' },
	{ id: 'ws-2', name: 'Globex Inc', plan: 'Free' },
	{ id: 'ws-3', name: 'Initech', plan: 'Enterprise' },
];

function WorkspaceAvatar({
	workspace,
	size = 'md',
}: {
	workspace: Workspace;
	size?: 'sm' | 'md';
}) {
	const dim = size === 'sm' ? 'size-6' : 'size-7';
	const text = size === 'sm' ? 'text-[10px]' : 'text-xs';

	if (workspace.logo) {
		return (
			<img
				alt={workspace.name}
				className={`${dim} shrink-0 rounded-md object-cover`}
				src={workspace.logo}
			/>
		);
	}

	return (
		<div
			className={`${dim} ${text} flex shrink-0 items-center justify-center rounded-md bg-sidebar-primary/10 font-bold text-sidebar-primary`}
		>
			{workspace.name[0]}
		</div>
	);
}

const NAV_ITEMS = [
	{ label: 'Dashboard', icon: GaugeIcon, to: '/dashboard', hash: '' },
	{ label: 'Members', icon: UsersIcon, to: '/dashboard', hash: 'members' },
	{ label: 'Settings', icon: SettingsIcon, to: '/dashboard', hash: 'settings' },
];

function Logo() {
	const { state } = useSidebar();
	const collapsed = state === 'collapsed';

	return (
		<div
			className={`flex items-center transition-all duration-200 ${
				collapsed ? 'justify-center py-1' : 'h-10 gap-2 px-2'
			}`}
		>
			<LandingLogo className={collapsed ? 'size-8' : 'size-7'} />
			{!collapsed && (
				<span className="truncate font-semibold tracking-tight text-sidebar-foreground">
					Conttak
				</span>
			)}
		</div>
	);
}

function WorkspaceSwitcher() {
	const { state } = useSidebar();
	const collapsed = state === 'collapsed';

	const [open, setOpen] = React.useState(false);
	const [active, setActive] = React.useState<Workspace>(WORKSPACES[0]);
	const ref = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		if (collapsed) setOpen(false);
	}, [collapsed]);

	React.useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setOpen(false);
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	if (collapsed) {
		return (
			<div className="flex justify-center py-1">
				<WorkspaceAvatar workspace={active} />
			</div>
		);
	}

	return (
		<div className="relative" ref={ref}>
			<button
				className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
				onClick={() => setOpen((o) => !o)}
				type="button"
			>
				<WorkspaceAvatar workspace={active} />
				<div className="flex min-w-0 flex-1 flex-col text-left leading-tight">
					<span className="truncate font-semibold">{active.name}</span>
					<span className="truncate text-xs text-muted-foreground">
						{active.plan}
					</span>
				</div>
				<ChevronsUpDownIcon className="ml-auto size-4 shrink-0 opacity-50" />
			</button>

			{open && (
				<div className="absolute left-0 top-full z-50 mt-1 w-52 rounded-lg border border-sidebar-border bg-sidebar shadow-md">
					<p className="px-3 py-2 text-xs font-medium text-muted-foreground">
						Workspaces
					</p>
					{WORKSPACES.map((ws) => (
						<button
							className="flex w-full items-center gap-2 px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
							key={ws.id}
							onClick={() => {
								setActive(ws);
								setOpen(false);
							}}
							type="button"
						>
							<WorkspaceAvatar workspace={ws} size="sm" />
							<div className="flex flex-1 flex-col text-left leading-tight">
								<span className="font-medium">{ws.name}</span>
								<span className="text-xs text-muted-foreground">{ws.plan}</span>
							</div>
							{active.id === ws.id && (
								<CheckIcon className="ml-auto size-4 text-sidebar-primary" />
							)}
						</button>
					))}
				</div>
			)}
		</div>
	);
}

function AppSidebar() {
	const { location } = useRouterState();

	return (
		<Sidebar collapsible="icon" variant="inset">
			<SidebarHeader className="gap-0 p-3">
				<Logo />
				<SidebarSeparator className="my-2 group-data-[collapsible=icon]:hidden" />
				<WorkspaceSwitcher />
			</SidebarHeader>

			<SidebarSeparator />

			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Navigation</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu className="gap-2">
							{NAV_ITEMS.map((item) => {
								const currentHash = location.hash.replace('#', '');
								const isActive =
									location.pathname === item.to && currentHash === item.hash;
								return (
									<SidebarMenuItem key={item.label}>
										<SidebarMenuButton
											asChild
											isActive={isActive}
											tooltip={item.label}
											variant="ghost"
										>
											<Link
												className="no-underline text-sidebar-foreground! hover:text-sidebar-foreground!"
												hash={item.hash}
												to={item.to}
											>
												<item.icon />
												<span>{item.label}</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								);
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter className="p-3">
				<div className="flex items-center gap-2 rounded-lg px-2 py-2 text-xs text-muted-foreground group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
					<div className="size-2 shrink-0 rounded-full bg-green-500" />
					<span className="group-data-[collapsible=icon]:hidden">
						Connected
					</span>
				</div>
			</SidebarFooter>

			<SidebarRail />
		</Sidebar>
	);
}

export { AppSidebar };
