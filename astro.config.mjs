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
	integrations: [
		starlight({
			title: siteConfig.title,
			defaultLocale: 'root',
			locales: {
				root: { label: '한국어', lang: 'ko-KR' }
			},
			customCss: ['./src/styles/custom.css'],
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: `https://github.com/${siteConfig.githubRepo}`,
				},
			],
			sidebar: [
				{ label: '세계관 및 기본 설정', autogenerate: { directory: 'world-setting' } },
				{ label: '주요 인물 및 가문 분석', autogenerate: { directory: 'characters-and-clans' } },
			],
		}),
	],
});
