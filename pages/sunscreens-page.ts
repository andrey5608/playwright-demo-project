import { Page } from '@playwright/test';
import { SpfTypesEnum } from '../enums/spf-types-enum';
import { ListItem } from '../models/list-item';
import { ItemsSelectionBase } from './items-selection-base';

export class SunscreensPage extends ItemsSelectionBase {
    readonly page: Page;
    readonly expectedTitle = 'Sunscreens';

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    async addCheapestSunscreenWithSpf(spfType: SpfTypesEnum): Promise<ListItem> {
        const items = await this.getOrderedByAscItems();

        const cheapestSpf = items.find((x) => x.spfType === spfType);

        if (cheapestSpf === undefined) {
            throw new Error(
                `Can not find cheapest SPF by spfType - ${SpfTypesEnum[spfType]}`
            );
        }

        await cheapestSpf.addToCart();
        return cheapestSpf;
    }
}
