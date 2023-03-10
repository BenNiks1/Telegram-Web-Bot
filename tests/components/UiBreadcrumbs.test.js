import { it, expect, describe, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { UiBreadcrumbs } from '@/components';
import { createWebHistory, createRouter } from 'vue-router';
import appRouter from '@/router';

describe('Test UiBreadcrumbs', () => {
	const routes = appRouter.options.routes;
	let breadcrumbs;
	const router = createRouter({
		history: createWebHistory(),
		routes,
	});

	beforeEach(async () => {
		router.push('/dc');
		await router.isReady();
		breadcrumbs = mount(UiBreadcrumbs, {
			global: {
				plugins: [router],
			},
			propsData: {
				items: [
					{
						name: 'Главная',
						path: '/',
					},
					{
						name: 'Выбор ДЦ',
						path: '/dc',
					},
					{
						name: 'Услуги',
						path: '/dc/services',
					},
				],
			},
		});
	});

	it('Breadcrumbs element is nav element', () => {
		const nav = breadcrumbs.find('nav');
		expect(nav.exists()).toBe(true);
	});

	it('Has all paths and correct names', () => {
		const firstItem = breadcrumbs.get('div:first-child a');
		const secondItem = breadcrumbs.get('div:nth-child(2) a');
		const lastItem = breadcrumbs.get('div:last-child span');
		expect(breadcrumbs.html()).contain('href="/"');
		expect(breadcrumbs.html()).contain('href="/dc"');
		expect(firstItem.text()).toBe('Главная');
		expect(secondItem.text()).toBe('Выбор ДЦ');
		expect(lastItem.text()).toBe('Услуги');
	});

	afterEach(() => {
		breadcrumbs.unmount();
	});
});
