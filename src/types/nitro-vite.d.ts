declare module 'nitro/vite' {
	export function nitro(...args: unknown[]): import('vite').PluginOption;
}
