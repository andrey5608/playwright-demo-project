import { Locator, Page } from '@playwright/test';
import { SkinLiquidsEnum } from '../enums/skin-liquids-enum';
import { LiquidSelectionResult } from '../models/liquid-selection-result';

export class CurrentTemperaturePage {
    readonly page: Page;
    readonly currentTemperature: Locator;
    readonly moisturizersButton: Locator;
    readonly sunscreensButton: Locator;
    readonly title = 'Current Temperature';

    constructor(page: Page) {
        this.page = page;
        this.currentTemperature = page.locator('#temperature');
        this.moisturizersButton = page.locator(
            '//a[@href="/moisturizer"]/button'
        );
        this.sunscreensButton = page.locator('//a[@href="/sunscreen"]/button');
    }

    async goto() {
        await this.page.goto('http://weathershopper.pythonanywhere.com/');
    }

    async getTemperature() {
        const sup = await this.currentTemperature.locator('sup').innerText();
        const temperature = (await this.currentTemperature.innerText()).replace(
            sup,
            ''
        );
        return Number(temperature);
    }

    async tryToSelectProperLiquid(): Promise<LiquidSelectionResult> {
        const temperature = await this.getTemperature();
        if (temperature < 19) {
            await this.moisturizersButton.click();
            return new LiquidSelectionResult(
                true,
                SkinLiquidsEnum.Moisturizers
            );
        } else if (temperature > 34) {
            await this.sunscreensButton.click();
            return new LiquidSelectionResult(true, SkinLiquidsEnum.Sunscreens);
        } else {
            return new LiquidSelectionResult(false);
        }
    }
}
