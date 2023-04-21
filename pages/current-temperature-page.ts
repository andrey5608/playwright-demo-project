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
        const temperatureWithCelsiusSign =
            await this.currentTemperature.innerText();
        const celsiusSign = await this.currentTemperature
            .locator('sup')
            .innerText();
        const temperature = temperatureWithCelsiusSign.replace(celsiusSign, '');
        return Number(temperature);
    }

    async tryToSelectProperLiquid(): Promise<LiquidSelectionResult> {
        const temperature = await this.getTemperature();
        // Shop for moisturizers if the weather is below 19 degrees.
        if (temperature < 19) {
            await this.moisturizersButton.click();
            return new LiquidSelectionResult(
                true,
                SkinLiquidsEnum.Moisturizers
            );
        }
        // Shop for suncreens if the weather is above 34 degrees.
        else if (temperature > 34) {
            await this.sunscreensButton.click();
            return new LiquidSelectionResult(true, SkinLiquidsEnum.Sunscreens);
        }
        // Otherwise, indicate that the test cannot be continued
        else {
            return new LiquidSelectionResult(false);
        }
    }
}
