const { test, expect } = require('@playwright/test');

const fakeUserData = {
	name: 'Ирианна Васильева',
	phone: '+79998887766',
	mark: 'Mitsubishi',
	model: 'Lancer',
	carYear: '1994',
	carNumber: 'A666AA666',
	carMileage: '666666',
	comment: 'Перезвоните мне по моему лансерику',
}

test('Main booking scenario', async ({ page }) => {
  await page.goto('/');
  await page.locator('.introduction__button > .button').click();
	await expect(page).toHaveURL('/dc');
  await page.locator('.ui-accordion').first().click();
  await page.locator('.dc-accordion__content').first().click();
	await expect(page).toHaveURL(/\/services\?dealer_id=\d/);
  await page.locator('.type-list > .type-list__item').first().click();
  await page.locator('.ui-accordion').first().click();
  await page.locator('.services-accordion__content > .checkbox > label').click();
  await page.locator('.services__button > .button').click();
	await expect(page).toHaveURL(/\/calendar\?dealer_id=\d&services=\d/);

	// TODO: Надо как-то заставить его рандомайзить дату, и выбирать из свободных дат
	await page.getByRole('button', { name: 'вторник, 28 марта 2023 г.' }).click();
  await page.locator('.calendar__button').click();
	await expect(page).toHaveURL(/\/slots\?dealer_id=\d&services=\d&date=\d{4}-\d{2}-\d{2}/);
  await page.locator('.slots__next-page').click();
	await expect(page).toHaveURL(/\/order\?dealer_id=\d&services=\d&date=\d{4}-\d{2}-\d{2}/);
  await page.locator('.form__user-data #name').fill(fakeUserData.name);
  await page.locator('.form__user-data #phone').fill(fakeUserData.phone);
  await page.locator('.form__user-data #mark').fill(fakeUserData.mark);
  await page.locator('.form__user-data #model').fill(fakeUserData.model);
  await page.locator('.form__user-data #carYear').fill(fakeUserData.carYear);
  await page.locator('.form__user-data #carNumber').fill(fakeUserData.carNumber);
  await page.locator('.form__user-data #carMileage').fill(fakeUserData.carMileage);
  await page.locator('.form__user-data #comment').fill(fakeUserData.comment);
  await page.locator('.form__check > .button').click();
  await page.locator('.form__submit .button').last().click();
	// TODO: Провалидировать ответ от сервера как-то
	await expect(page).toHaveURL('/success');
	await expect(page.locator('.success__title')).toHaveText('Ваша заявка отправлена!');
});
