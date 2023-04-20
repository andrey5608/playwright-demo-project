import { Locator, Page } from '@playwright/test';

export class ShoppingCartPage {
    readonly page: Page;
    readonly items: Locator;
    readonly total: Locator;
    readonly payWithCardButton: Locator;
    readonly title = 'Checkout';

    constructor(page: Page) {
        this.page = page;
        this.items = page.locator('tbody > tr');
        this.total = page.locator('#total');
        this.payWithCardButton = page.locator('.stripe-button-el');
    }

    // TODO check items
}
