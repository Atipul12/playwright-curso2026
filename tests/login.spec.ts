import { test, expect } from '@playwright/test';
import { Loginpage } from '../pageobject/login/Loginpage';

test('login', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/login.html');

  const loginpage =new Loginpage(page)
  await loginpage.fillusername()
  await loginpage.fillpassword()
  await loginpage.OnclickButton()


  //  await page.locator('input#username').fill('user');
  //await page.locator('input#password').fill('pass');
  //await page.locator('//button[@type=\'submit\']').click();

  await page.locator('//button[contains(text(),\'Añadir transacción\')]').click();
  await page.locator('id=date').fill('2026-06-24');
  await page.locator('id=amount').fill('600');
  await page.locator('id=description').fill('test');

  await page.locator('//button[contains(text(),\'Guardar\')]').click();

  const actualDate=await page.locator("//tbody[@id='transactions-list']//tr[1]//td[1]").textContent();
  const actualAmount=await page.locator("//tbody[@id='transactions-list']//tr[1]//td[2]").textContent();
  const actualDescription=await page.locator("//tbody[@id='transactions-list']//tr[1]//td[3]").textContent();

  expect(actualDate).toEqual('2026-06-24');
  expect(actualAmount).toEqual('600');
  expect(actualDescription).toEqual('test')

  await page.pause()
});


test('login failed', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/login.html');


  const loginpage =new Loginpage(page)
  await loginpage.fillusername()
  await loginpage.fillpassword()
  await loginpage.OnclickButton()

  await page.locator('//button[contains(text(),\'Añadir transacción\')]').click();
  await page.locator('id=date').fill('2026-06-24');
  await page.locator('id=amount').fill('600');
  await page.locator('id=description').fill('test');

  await page.locator('//button[contains(text(),\'Guardar\')]').click();

  const actualDate=await page.locator("//tbody[@id='transactions-list']//tr[1]//td[1]").textContent();
  const actualAmount=await page.locator("//tbody[@id='transactions-list']//tr[1]//td[2]").textContent();
  const actualDescription=await page.locator("//tbody[@id='transactions-list']//tr[1]//td[3]").textContent();

  expect(actualDate).toEqual('2026-06-24');
  expect(actualAmount).toEqual('600');
  expect(actualDescription).toEqual('test')

  await page.pause()
});
