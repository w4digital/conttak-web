import { Link, useNavigate } from '@tanstack/react-router';
import { Button } from '#/components/ui/button';
import { Input } from '#/components/ui/input';
import { Label } from '#/components/ui/label';

function LoginPage() {
	const navigate = useNavigate({
		from: '/login',
	});

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		navigate({ to: '/dashboard', replace: true });
	}

	return (
		<div className="w-full max-w-md rounded-3xl border border-[var(--line)] bg-[var(--surface-strong)] p-8 text-[var(--sea-ink)] shadow-xl backdrop-blur">
			<h1 className="mb-2 text-center text-2xl font-bold text-[var(--sea-ink)]">
				Login
			</h1>
			<p className="mb-6 text-center text-sm text-[var(--sea-ink-soft)]">
				Entre para acessar seu painel.
			</p>

			<form className="space-y-5" onSubmit={handleSubmit}>
				<div className="space-y-2">
					<Label htmlFor="login-email">Email</Label>
					<Input
						id="login-email"
						name="email"
						placeholder="voce@email.com"
						required
						type="email"
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="login-password">Senha</Label>
					<Input
						id="login-password"
						name="password"
						placeholder="Sua senha"
						required
						type="password"
					/>
				</div>

				<Button className="w-full" type="submit">
					Entrar
				</Button>
			</form>

			<p className="mt-5 text-center text-sm text-[var(--sea-ink-soft)]">
				Nao tem conta?{' '}
				<Link
					className="font-semibold text-[var(--lagoon-deep)]"
					to="/register"
				>
					Criar conta
				</Link>
			</p>
		</div>
	);
}

export { LoginPage };
