import { Locator, Page } from '@playwright/test';
import { email, testCard } from '../data/customer-data';

export class StipePaymentWidget {
    readonly page: Page;
    readonly email: Locator;
    readonly cardNumber: Locator;
    readonly expDate: Locator;
    readonly cvv: Locator;
    readonly payButton: Locator;

    constructor(page: Page) {
        this.page = page;
        const stripeIframeLocator = page.frameLocator('.stripe_checkout_app');
        this.email = stripeIframeLocator.locator('#email');
        this.cardNumber = stripeIframeLocator.locator('#card_number');
        this.expDate = stripeIframeLocator.locator('#cc-exp');
        this.cvv = stripeIframeLocator.locator('#cc-csc');
        this.payButton = stripeIframeLocator.locator('#submitButton');
    }

    async waitForConfirmation() {
        // wait for the confirmation request
        await this.page.waitForResponse(
            (response) =>
                response.url().includes('/confirmation') &&
                response.request().method() === 'POST'
        );
    }

    async payByCard() {
        await this.email.fill(email);
        await this.cardNumber.fill(testCard.number);
        await this.expDate.fill(testCard.exp);
        await this.cvv.fill(testCard.cvv);
        await this.payButton.click();
        await this.waitForConfirmation();
    }
}
