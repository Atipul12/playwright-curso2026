import { test, expect } from '@playwright/test';
import {faker} from '@faker-js/faker';

test('login', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/login.html');

  await page.locator('input#username').fill('user');
  await page.locator('input#password').fill('pass');

  await page.locator('//button[@type=\'submit\']').click();

  for(let i=0; i<=10; i++){

    
  await page.locator('//button[contains(text(),\'Añadir transacción\')]').click();
  await page.locator('id=date').fill('2026-06-24');
  await page.locator('id=amount').fill(faker.number.int({min:100, max:200}).toString());
  await page.locator('id=description').fill(faker.person.firstName());

  await page.locator('//button[contains(text(),\'Guardar\')]').click();

    }

   await page.getByRole('button', { name: 'Editar' }).click();

    await page.pause();

    });