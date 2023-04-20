import { Page } from '@playwright/test';
import { ItemsSelectionBase } from './items-selection-base';

export class MoisturizersPage extends ItemsSelectionBase {
    readonly page: Page;
    readonly expectedTitle = 'Moisturizers';

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    async addCheapestMoisturizerWithIngredient(ingredient: string) {
        const items = await this.getOrderedByAscItems();

        const cheapestMoisturizer = items.find((x) =>
            x.title.toLowerCase().includes(ingredient.toLowerCase())
        );

        if (cheapestMoisturizer === undefined) {
            throw new Error(
                `Can not find cheapest Moisturize by ingredient - ${ingredient}`
            );
        }

        await cheapestMoisturizer.addToCart();
    }
}