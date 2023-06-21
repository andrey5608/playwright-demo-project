import { ItemBase } from '../models/item-base';

export function getItemArraySumAsString(array: ItemBase[]): string {
    return array
        .map((i) => i.price)
        .reduce((a, b) => a + b)
        .toString();
}
