import { Locator, Page } from '@playwright/test';
import { Item } from '../models/item';

export class ItemsSelectionBase {
    readonly page: Page;
    readonly title: Locator;
    readonly cartInfo: Locator;
    readonly cartButton: Locator;
    readonly items: Locator;

    constructor(page: Page) {
        this.page = page;
        this.title = page.locator('h2');
        this.cartInfo = page.locator('ul.navbar-nav');
        this.cartButton = this.cartInfo.locator('button');
        this.items = page.locator('div.container > div.top-space-50 > div');
    }

    async getItems(): Promise<Item[]> {
        const items = await this.items.all();
        return items.map((x) => new Item(x));
    }

    async goToCart() {
        await this.cartButton.click();
    }
}
