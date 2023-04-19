import { Page } from '@playwright/test';
import { SpfTypesEnum } from '../enums/spf-types-enum';
import { ItemsSelectionBase } from './items-selection-base';

export class SunscreensPage extends ItemsSelectionBase {
    readonly page: Page;
    readonly expectedTitle = 'Sunscreens';

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    async addCheapestSunscreenWithSpf(spfType: SpfTypesEnum) {
        const items = await this.getItems();

        for (const item of items) {
            await item.fillTypeAndPrice();
        }

        items.sort((a, b) => a.price - b.price);
        const cheapestSpf = items.find((x) => x.spfType === spfType);

        if (cheapestSpf === undefined) {
            throw new Error(
                `Can not find cheapest SPF by spfType - ${spfType}`
            );
        }

        await cheapestSpf.addToCart();
    }
}
