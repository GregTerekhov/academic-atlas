import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  // Відкриття основної сторінки
  await page.goto('http://localhost:3000/');

  // Перемикання теми
  await page.getByRole('switch', { name: 'Перемкнення теми' }).click();
  await page.getByRole('switch', { name: 'Перемкнення теми' }).click();

  // Відкриття навігаційного бургер-меню
  await page.getByLabel('Кнопка відкриття навігаційного бургер-меню').click();

  // Взаємодія з новими вкладками
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('banner').getByRole('link', { name: 'Open link to @' }).click();
  const page1 = await page1Promise;

  const page2Promise = page.waitForEvent('popup');
  await page.locator('div').filter({ hasText: 'Ваш партнер у світі професійної освітиРозпочніть шлях до успіху з нами — оформіт' }).getByRole('link').click();
  const page2 = await page2Promise;

  // Перехід на інші секції сайту та очікування завантаження
  await page.goto('http://localhost:3000/#services');
  await page.waitForNavigation();
  await page.goto('http://localhost:3000/#about-us');
  await page.waitForNavigation();
  await page.goto('http://localhost:3000/#feedback');
  await page.waitForNavigation();

  // Натискання на кнопку "Скрол доверху"
  const scrollButton = page.locator('button[aria-label="Скрол доверху"]');
  await scrollButton.waitFor({ state: 'visible' });
  await scrollButton.click();
});
