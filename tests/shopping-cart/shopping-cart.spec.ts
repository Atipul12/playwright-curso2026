import {test,expect} from '@playwright/test'
import {faker} from '@faker-js/faker'

test('buying new products', async({page})=>{

    await page.goto('http://127.0.0.1:5500/')

    for(let i=0; i<=5; i++){

            await page.locator("//h5[contains(., 'Producto 1')]/ancestor::div[contains(@class, 'card-body')]//button").click();

        }
    
    await page.locator("//h5[contains(., 'Producto 2')]/ancestor::div[contains(@class, 'card-body')]//button").click();
    await page.locator("//h5[contains(., 'Producto 3')]/ancestor::div[contains(@class, 'card-body')]//button").click();

    await page.locator("button#view-cart-btn").click();

    const product1Qantity=await page.locator("//tbody[@id='cart-items']//td[contains(., 'Producto 1')]//ancestor::tr//td[3]").textContent();
    const product2Qantity=await page.locator("//tbody[@id='cart-items']//td[contains(., 'Producto 2')]//ancestor::tr//td[3]").textContent();
    const product3Qantity=await page.locator("//tbody[@id='cart-items']//td[contains(., 'Producto 3')]//ancestor::tr//td[3]").textContent();

    expect(product1Qantity).toEqual('6');
    expect(product2Qantity).toEqual('1');
    expect(product3Qantity).toEqual('1');

    await page.locator("id=checkout-btn").click();

    await page.locator("id=name").fill(faker.person.fullName())
    await page.locator("id=email").fill(faker.internet.email())
    await page.locator("id=address").fill(faker.location.streetAddress())

    await page.waitForTimeout(2000)
    await page.locator("//a[@href='#paymentInfo']").click();

    await page.locator("id=card-number").fill(faker.finance.accountNumber())
    await page.locator("id=card-expiry").fill(faker.date.timeZone())
    await page.locator("id=card-cvc").fill(faker.finance.creditCardCVV())

    await page.locator("id=place-order-btn").click();


})