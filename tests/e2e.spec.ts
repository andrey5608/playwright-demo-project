import { test, expect } from '@playwright/test';
import { SkinLiquidsEnum } from '../enums/skin-liquids-enum';
import { SpfTypesEnum } from '../enums/spf-types-enum';
import { LiquidSelectionResult } from '../models/liquid-selection-result';
import { CurrentTemperaturePage } from '../pages/current-temperature-page';
import { SunscreensPage } from '../pages/sunscreens-page';
import { MoisturizersPage } from '../pages/moisturizers-page';

test.describe('Test Weather Shopper', () => {
    let liquidSelectionResult: LiquidSelectionResult;
    test.beforeEach(async ({ page }) => {
        const currentTemperaturePage = new CurrentTemperaturePage(page);
        await currentTemperaturePage.goto();
        liquidSelectionResult =
            await currentTemperaturePage.tryToSelectProperLiquid();
        test.fail(
            !liquidSelectionResult.isPossible,
            'Can not select any liquid basing on current temperature. Failing...'
        );
    });

    test('Shop for suncreens if the weather is above 34 degrees', async ({
        page,
    }) => {
        test.fail(
            liquidSelectionResult.skinLiquidsEnum !==
                SkinLiquidsEnum.Sunscreens,
            'Temperature is not compatible to test sunscreens'
        );

        const sunscreensPage = new SunscreensPage(page);
        await sunscreensPage.addCheapestSunscreenWithSpf(SpfTypesEnum.SPF50);
        await sunscreensPage.addCheapestSunscreenWithSpf(SpfTypesEnum.SPF30);
        await sunscreensPage.goToCart();

        console.log('buy sunscreens works');

        expect(true).toBeTruthy();
    });

    test('Shop for moisturizers if the weather is below 19 degrees', async ({
        page,
    }) => {
        test.fail(
            liquidSelectionResult.skinLiquidsEnum !==
                SkinLiquidsEnum.Moisturizers,
            'Temperature is not compatible to test moisturizers'
        );

        const moisturizersPage = new MoisturizersPage(page);
        await moisturizersPage.addCheapestMoisturizerWithIngredient('Aloe');
        await moisturizersPage.addCheapestMoisturizerWithIngredient('almond');
        await moisturizersPage.goToCart();

        console.log('buy moisturizers works');
        expect(true).toBeTruthy();
    });
});
