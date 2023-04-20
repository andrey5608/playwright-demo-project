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

    async getOrderedByAscItems(): Promise<Item[]> {
        const items = (await this.items.all()).map((x) => new Item(x));
        for (const item of items) {
            await item.fillItemProps();
        }
        items.sort((a, b) => a.price - b.price);
        return items;
    }

    async goToCart() {
        await this.cartButton.click();
    }
}
