import { test, expect } from '@playwright/test';

test('registration', async ({ page},testinfo) => {
  await page.goto('http://127.0.0.1:5501/register.html');


  const name='Juan';
  const lastname='Perez';
  const age='10';
  const country='Mexico';
  const email='Lupis.lia@gmail';
  const sex='F';

  await page.locator("id=name").fill(name);
  await page.locator("id=last-name").fill(lastname);
  //Localizador con una label, el following-siblig indica busca en el siguiente inputo la Edad
//label[contains(.,'Edad')]/following-sibling::input
  await page.locator("xpath=//label[contains(.,'Edad')]/following-sibling::input").fill(age);
  await page.locator("id=country").selectOption(country);
  await page.locator(`input[value='${sex}']`).click();
  await page.locator("id=email").fill(email);
  await page.locator("id=wednesday").click();
  await page.locator("id=picture").setInputFiles('images/logo.JPEG');


  await testinfo.attach('imagen1.png',{
    body:await page.screenshot(),
    contentType:'image.png'
  })




        //como generar una captura de pantalla
        //generar una carpeta en la raiz para que se vaya guardando
  await page.screenshot({path: 'screenshots/imagen1.png',fullPage:true});

  const[summaryPage]= await Promise.all(
    [
    page.waitForEvent('popup'),
    page.locator("id=save-btn").click()
    ]
  )

  await summaryPage.waitForLoadState();
  await expect(summaryPage).toHaveTitle('Summary');

  //hace una comparacion de lo que mandas y de lo que recibe en la vntana de Resumen 
  const currentName=await summaryPage.locator("//strong[contains(.,'Nombre')]//ancestor::p").textContent();
  const currentLastname=await summaryPage.locator("//strong[contains(.,'Apellido')]//ancestor::p").textContent();
  const currentAge=await summaryPage.locator("//strong[contains(.,'Edad')]//ancestor::p").textContent();

  expect(currentName).toContain(name);
  expect(currentLastname).toContain(lastname);
  expect(currentAge).toContain(age);
  //await page.pause();


  await testinfo.attach('imagen2',{
    body:await summaryPage.screenshot(),
    contentType:'image.png'
  })
    //await summaryPage.screenshot({path: 'screenshots/imagen2.png', fullPage:true});
});


test('registration failure', async ({ page }) => {
  await page.goto('http://127.0.0.1:5501/register.html');


  const name='Juan';
  const lastname='Perez';
  const age='10';
  const country='Mexico';
  const email='Lupis.lia@gmail';
  const sex='F';

  await page.locator("id=name").fill(name);
  expect (true).toEqual(false);
});