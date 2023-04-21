import { SkinLiquidsEnum } from '../enums/skin-liquids-enum';

export class LiquidSelectionResult {
    readonly skinLiquidsEnum?: SkinLiquidsEnum;
    isPossibleToChooseTheLiquidType: boolean;

    constructor(
        isPossibleToChooseTheLiquidType: boolean,
        skinLiquidsEnum?: SkinLiquidsEnum
    ) {
        this.skinLiquidsEnum = skinLiquidsEnum;
        this.isPossibleToChooseTheLiquidType = isPossibleToChooseTheLiquidType;
    }
}
