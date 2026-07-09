export function AuroraBackground() {
	return (
		<div
			aria-hidden="true"
			className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
		>
			{/* Emerald glow */}
			<div className="animate-aurora-1 absolute top-[-5%] left-[5%] h-[60vh] w-[60vh] rounded-full bg-primary/60 blur-[90px]" />
			{/* Teal / cyan glow */}
			<div className="animate-aurora-2 absolute top-[10%] right-[0%] h-[55vh] w-[55vh] rounded-full bg-chart-2/50 blur-[100px]" />
			{/* Blue glow */}
			<div className="animate-aurora-3 absolute top-[40%] left-[20%] h-[55vh] w-[55vh] rounded-full bg-chart-3/50 blur-[100px]" />
			{/* Extra emerald accent near bottom */}
			<div className="animate-aurora-2 absolute bottom-[-5%] right-[20%] h-[50vh] w-[50vh] rounded-full bg-primary/40 blur-[100px]" />

			{/* Darkening overlay to keep content readable */}
			<div className="absolute inset-0 bg-background/55" />

			{/* Subtle grid overlay */}
			<div
				className="absolute inset-0 opacity-[0.18]"
				style={{
					backgroundImage:
						'linear-gradient(to right, oklch(1 0 0 / 5%) 1px, transparent 1px), linear-gradient(to bottom, oklch(1 0 0 / 5%) 1px, transparent 1px)',
					backgroundSize: '64px 64px',
					maskImage:
						'radial-gradient(ellipse 90% 70% at 50% 0%, black 40%, transparent 100%)',
				}}
			/>
		</div>
	);
}
