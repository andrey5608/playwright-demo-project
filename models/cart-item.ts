import { Locator } from 'playwright-core';
import { ItemBase } from './item-base';

export class CartItem extends ItemBase {
    readonly itemLocator: Locator;

    constructor(itemLocator: Locator) {
        super();
        this.itemLocator = itemLocator;
    }

    async fillItemProps() {
        this.price = Number(
            await this.itemLocator.locator('td').nth(1).innerText()
        );
        this.title = await this.itemLocator.locator('td').nth(0).innerText();
    }
}
