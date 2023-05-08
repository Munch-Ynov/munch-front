import { PriceInterface } from "@/shared/interfaces";

const enumValues = Object.keys(PriceInterface);

export function convertPrice(price: string): string{
  if(enumValues.includes(price as PriceInterface)){
    return PriceInterface[price as keyof typeof PriceInterface];
  }else{
    return "inconnus"
  }
}