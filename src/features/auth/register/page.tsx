import { Link, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { Button } from '#/components/ui/button';
import { Input } from '#/components/ui/input';
import { Label } from '#/components/ui/label';

function RegisterPage() {
	const navigate = useNavigate({
		from: '/register',
	});
	const [formValues, setFormValues] = useState({
		name: 'Ludriano',
		email: 'ludriano@gmail.com',
		password: '12345678',
		username: 'ludriano',
	});

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = event.currentTarget;
		setFormValues((previousValues) => ({
			...previousValues,
			[name]: value,
		}));
	}

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		console.log('Register payload', formValues);
		navigate({ to: '/login', replace: true });
	}

	return (
		<div className="w-full max-w-md rounded-3xl border border-[var(--line)] bg-[var(--surface-strong)] p-8 text-[var(--sea-ink)] shadow-xl backdrop-blur">
			<h1 className="mb-2 text-center text-2xl font-bold text-[var(--sea-ink)]">
				Criar conta
			</h1>
			<p className="mb-6 text-center text-sm text-[var(--sea-ink-soft)]">
				Preencha seus dados para cadastrar.
			</p>

			<form className="space-y-5" onSubmit={handleSubmit}>
				<div className="space-y-2">
					<Label htmlFor="register-name">Nome</Label>
					<Input
						id="register-name"
						name="name"
						onChange={handleChange}
						required
						value={formValues.name}
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="register-email">Email</Label>
					<Input
						id="register-email"
						name="email"
						onChange={handleChange}
						required
						type="email"
						value={formValues.email}
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="register-password">Senha</Label>
					<Input
						id="register-password"
						minLength={8}
						name="password"
						onChange={handleChange}
						required
						type="password"
						value={formValues.password}
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="register-username">Username</Label>
					<Input
						id="register-username"
						name="username"
						onChange={handleChange}
						required
						value={formValues.username}
					/>
				</div>

				<Button className="w-full" type="submit">
					Cadastrar
				</Button>
			</form>

			<p className="mt-5 text-center text-sm text-[var(--sea-ink-soft)]">
				Ja tem conta?{' '}
				<Link className="font-semibold text-[var(--lagoon-deep)]" to="/login">
					Entrar
				</Link>
			</p>

			<pre className="mt-6 overflow-x-auto rounded-xl border border-[var(--line)] bg-[var(--surface)] p-3 text-xs text-[var(--sea-ink-soft)]">
				{JSON.stringify(formValues, null, 2)}
			</pre>
		</div>
	);
}

export { RegisterPage };
