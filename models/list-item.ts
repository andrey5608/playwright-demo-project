import { Locator } from 'playwright-core';
import { SpfTypesEnum } from '../enums/spf-types-enum';
import { ItemBase } from './item-base';

export class ListItem extends ItemBase {
    readonly titleElement: Locator;
    readonly priceInfo: Locator;
    readonly buyButton: Locator;
    spfType: SpfTypesEnum;

    constructor(itemLocator: Locator) {
        super();
        this.titleElement = itemLocator.locator('p').first();
        this.priceInfo = itemLocator.locator('//p[not(@class)]');
        this.buyButton = itemLocator.locator('button');
    }

    async fillItemProps() {
        this.title = await this.titleElement.innerText();
        this.spfType = await this.getSpfType();
        this.price = await this.getPrice();
    }

    async getPrice() {
        const priceAndCurrency = await this.priceInfo.innerText();
        return Number(priceAndCurrency.match(/\d+/)[0]);
    }

    async getSpfType() {
        let spfType: SpfTypesEnum;
        const match = this.title.match(/.*(SPF|spf)-(\d+).*/);

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
