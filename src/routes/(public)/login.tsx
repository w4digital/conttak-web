import { createFileRoute } from '@tanstack/react-router';

import { LoginPage } from '#/features/auth/login/page';

export const Route = createFileRoute('/(public)/login')({
	component: LoginPage,
});
