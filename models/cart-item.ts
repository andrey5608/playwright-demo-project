import { Locator } from 'playwright-core';
import { SpfTypesEnum } from '../enums/spf-types-enum';
import { ItemBase } from './item-base';
import { ListItem } from './list-item';

export class CartItem extends ItemBase {
    readonly itemLocator: Locator;

    constructor(itemLocator: Locator) {
        super();
        this.itemLocator = itemLocator;
    }

    async fillItemProps() {
        this.price = Number(await this.itemLocator.locator('td').nth(1).innerText());
        this.title = await this.itemLocator.locator('td').nth(0).innerText();
    }
}
