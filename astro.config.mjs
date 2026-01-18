// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import cloudflare from '@astrojs/cloudflare';
import { readFileSync } from 'node:fs';

const siteConfig = JSON.parse(readFileSync('./site.config.json', 'utf-8'));
const siteUrl = `https://${siteConfig.subdomain}.xiyo.dev`;

export default defineConfig({
	site: siteUrl,
	output: 'static',
	adapter: cloudflare(),
	prefetch: {
		prefetchAll: true,
		defaultStrategy: 'hover',
	},
	experimental: {
		clientPrerender: true,
	},
	integrations: [
		starlight({
			title: siteConfig.title,
			customCss: ['./src/styles/custom.css'],
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: `https://github.com/${siteConfig.githubRepo}`,
				},
			],
			sidebar: [
				{ label: '개요', autogenerate: { directory: 'overview' } },
				{ label: '핵심 기술', autogenerate: { directory: 'core-technologies' } },
				{ label: '미래 전망', autogenerate: { directory: 'future-outlook' } },
			],
		}),
	],
});
