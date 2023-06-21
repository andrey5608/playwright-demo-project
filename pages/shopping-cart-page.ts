import { Locator, Page, expect } from '@playwright/test';
import { getItemArraySumAsString } from '../helpers/array-helper';
import { CartItem } from '../models/cart-item';
import { ListItem } from '../models/list-item';

export class ShoppingCartPage {
    readonly page: Page;
    readonly itemElements: Locator;
    readonly total: Locator;
    readonly payWithCardButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.itemElements = page.locator('tbody > tr');
        this.total = page.locator('#total');
        this.payWithCardButton = page.locator('.stripe-button-el');
    }

    async getOrderedByAscItems(): Promise<CartItem[]> {
        const items = (await this.itemElements.all()).map(
            (x) => new CartItem(x)
        );
        for (const item of items) {
            await item.fillItemProps();
        }
        items.sort((a, b) => a.price - b.price);
        return items;
    }

    async getTotalAmount(): Promise<string> {
        const totalText = await this.total.innerText();
        const totalAmountMatch = totalText.match(/Total:.*\s(\d+)/);
        if (totalAmountMatch === null || totalAmountMatch.length < 2) {
            throw new Error('Can not extract total amount');
        }
        return totalAmountMatch[1].toString(); // return the number only
    }

    async verifyItems(listItems: ListItem[]) {
        const cartItems = await this.getOrderedByAscItems(); //sort cart items
        listItems = listItems.sort((a, b) => a.price - b.price); //sort list items
        const cartItemsSum = getItemArraySumAsString(cartItems);
        const listItemsSum = getItemArraySumAsString(listItems);
        const totalAmount = await this.getTotalAmount();

        // check that we have the same number of items
        expect(cartItems.length).toBe(listItems.length);

        // check that we have the same items we selected before
        for (let index = 0; index < cartItems.length; index++) {
            expect(cartItems[index].price).toBe(listItems[index].price);
            expect(cartItems[index].title).toBe(listItems[index].title);
        }

        // check amounts
        expect(listItemsSum).toBe(totalAmount);
        expect(cartItemsSum).toBe(totalAmount);
    }

    async pressPayWithCard() {
        await this.payWithCardButton.click();
    }
}
