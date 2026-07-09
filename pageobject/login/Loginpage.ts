import { Locator, Page } from "@playwright/test"

export class Loginpage {

private readonly usernameTextbox: Locator
private readonly passwordTextbox: Locator
private readonly loginButton: Locator

constructor(page: Page){
this.usernameTextbox=page.locator('input#username')
this.passwordTextbox=page.locator('input#password')
this.loginButton=page.locator('//button[@type=\'submit\']')

}

async fillusername(){
    await this.usernameTextbox.fill('user')    
}

async fillpassword(){
    await this.passwordTextbox.fill('pass')    
}

async OnclickButton(){
    await this.loginButton.click()
}

}