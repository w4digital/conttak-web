export function Logo({ className }: { className?: string }) {
	return (
		<span
			className={
				'flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground ' +
				(className ?? '')
			}
			aria-hidden="true"
		>
			<svg
				aria-label="Logo"
				fill="none"
				height="18"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2.4"
				viewBox="0 0 24 24"
				width="18"
			>
				<path d="M4 16l5-5 4 3 6-7" />
				<path d="M15 7h4v4" />
			</svg>
		</span>
	);
}
