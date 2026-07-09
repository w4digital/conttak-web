export function SectionHeading({
	eyebrow,
	title,
	description,
}: {
	eyebrow?: string;
	title: string;
	description?: string;
}) {
	return (
		<div className="mx-auto max-w-2xl text-center">
			{eyebrow && (
				<p className="text-sm font-medium uppercase tracking-widest text-primary">
					{eyebrow}
				</p>
			)}
			<h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
				{title}
			</h2>
			{description && (
				<p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
					{description}
				</p>
			)}
		</div>
	);
}
