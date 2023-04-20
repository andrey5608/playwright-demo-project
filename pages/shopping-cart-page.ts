import { Locator, Page, expect } from '@playwright/test';
import { CartItem } from '../models/cart-item';
import { ItemBase } from '../models/item-base';
import { ListItem } from '../models/list-item';

export class ShoppingCartPage {
    readonly page: Page;
    readonly itemElements: Locator;
    readonly total: Locator;
    readonly payWithCardButton: Locator;
    readonly title = 'Checkout';

    constructor(page: Page) {
        this.page = page;
        this.itemElements = page.locator('tbody > tr');
        this.total = page.locator('#total');
        this.payWithCardButton = page.locator('.stripe-button-el');
    }

    async getOrderedByAscItems(): Promise<CartItem[]> {
        const items = (await this.itemElements.all()).map((x) => new CartItem(x));
        for (const item of items) {
            await item.fillItemProps();
        }
        items.sort((a, b) => a.price - b.price);
        return items;
    }

    async verifyItems(listItems: ListItem[]){
        let cartItems = await this.getOrderedByAscItems();//sort cart items
        listItems = listItems.sort((a,b) => a.price - b.price);//sort list items
        expect(cartItems.length).toBe(listItems.length);
        for (let index = 0; index < cartItems.length; index++) {
            const cartItem = cartItems[index];
            const listItem = listItems[index];
            expect(cartItem.price).toBe(listItem.price);
            expect(cartItem.title).toBe(cartItem.title);
        }
    }

    async pressPayWithCard(){
        await this.payWithCardButton.click();
    }
}
