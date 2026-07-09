import { Outlet } from '@tanstack/react-router';
import { SidebarInset, SidebarProvider } from '#/components/ui/sidebar';
import { TooltipProvider } from '#/components/ui/tooltip';
import { Header } from './Header';
import { AppSidebar } from './SidebarLayout';

function RootLayout() {
	return (
		<TooltipProvider>
			<div className="min-h-svh bg-background text-foreground">
				<SidebarProvider>
					<AppSidebar />
					<SidebarInset className="bg-background">
						<Header />
						<main className="flex-1 p-4 sm:p-6">
							<Outlet />
						</main>
					</SidebarInset>
				</SidebarProvider>
			</div>
		</TooltipProvider>
	);
}

export { RootLayout };
