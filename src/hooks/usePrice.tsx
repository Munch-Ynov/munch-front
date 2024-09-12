// usePriceSymbol.ts
import { PriceCategoryEnum } from "@/models/enum/price-category.enum";

const usePriceSymbol = (price: PriceCategoryEnum) => {
  switch (price) {
    case PriceCategoryEnum.ECO:
      return "€";
    case PriceCategoryEnum.MODERATE:
      return "€€";
    case PriceCategoryEnum.EXPENSIVE:
      return "€€€";
    case PriceCategoryEnum.VERY_EXPENSIVE:
      return "€€€€";
    default:
      return "";
  }
};

export default usePriceSymbol;
