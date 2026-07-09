import { createFileRoute, redirect } from '@tanstack/react-router';
import { RootLayout } from '#/app/layouts/RootLayout';

export const Route = createFileRoute('/(private)')({
	beforeLoad: ({ context }) => {
		if (!context.auth.isAuthenticated) {
			throw redirect({
				to: '/login',
			});
		}
	},
	component: RootLayout,
});
