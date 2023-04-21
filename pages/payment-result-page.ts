import { expect, Locator, Page } from '@playwright/test';
import { Timeouts } from '../enums/timeouts-enum';

export class PaymentResultPage {
    readonly page: Page;
    readonly title: Locator;
    readonly message: Locator;
    readonly successTitle = 'PAYMENT SUCCESS';
    readonly successMessage =
        'Your payment was successful. You should receive a follow-up call from our sales team.';

    constructor(page: Page) {
        this.page = page;
        this.title = page.locator('h2');
        this.message = page.locator('.text-justify');
    }

    async verifySuccessfulPayment() {
        await expect(this.title).toHaveText(this.successTitle, {
            timeout: Timeouts.LongWait,
        }); // it can take some time to wait for the page loading
        await expect(this.message).toHaveText(this.successMessage);
    }
}
