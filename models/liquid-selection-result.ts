import { SkinLiquidsEnum } from '../enums/skin-liquids-enum';

export class LiquidSelectionResult {
    readonly skinLiquidsEnum?: SkinLiquidsEnum;
    isPossible: boolean;

    constructor(isPossible: boolean, skinLiquidsEnum?: SkinLiquidsEnum) {
        this.skinLiquidsEnum = skinLiquidsEnum;
        this.isPossible = isPossible;
    }
}
