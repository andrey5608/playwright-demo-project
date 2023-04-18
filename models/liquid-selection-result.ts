import { SkinLiquidsEnum } from '../enums/skin-liquids-enum';

export class LiquidSelectionResult {
    readonly skinLiquidsEnum?: SkinLiquidsEnum;
    success: boolean;

    constructor(success: boolean, skinLiquidsEnum?: SkinLiquidsEnum) {
        this.skinLiquidsEnum = skinLiquidsEnum;
        this.success = success;
    }
}
