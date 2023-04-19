import { Locator } from 'playwright-core';
import { SpfTypesEnum } from '../enums/spf-types-enum';

export class Item {
    readonly title: Locator;
    readonly priceInfo: Locator;
    readonly buyButton: Locator;
    spfType: SpfTypesEnum;
    price: number;

    constructor(itemLocator: Locator) {
        this.title = itemLocator.locator('p').first();
        this.priceInfo = itemLocator.locator('//p[not(@class)]');
        this.buyButton = itemLocator.locator('button');
    }

    async fillTypeAndPrice() {
        this.spfType = await this.getSpfType();
        this.price = await this.getPrice();
    }

    async getPrice() {
        const priceAndCurrency = await this.priceInfo.innerText();
        return Number(priceAndCurrency.match(/\d+/)[0]);
    }

    async getSpfType() {
        const priceAndCurrency = await this.title.innerText();

        let spfType: SpfTypesEnum;
        const match = priceAndCurrency.match(/.*(SPF|spf)-(\d+).*/);

        if (match === null || match.length < 3) {
            return SpfTypesEnum.Unknown;
        }

        switch (match[2]) {
            case '30':
                spfType = SpfTypesEnum.SPF30;
                break;
            case '40':
                spfType = SpfTypesEnum.SPF40;
                break;
            case '50':
                spfType = SpfTypesEnum.SPF50;
                break;
            default:
                spfType = SpfTypesEnum.Unknown;
                break;
        }

        return spfType;
    }

    async addToCart() {
        await this.buyButton.click();
    }
}
