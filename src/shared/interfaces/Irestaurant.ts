import type {Origines} from "@/shared/enum/origines";
import type {Regimes} from "@/shared/enum/regimes";

export interface Irestaurant {
    id: number;
    name: string;
    address: string;
    price: string;
    origines: Origines;
    regime: Regimes;
    image?: string;
}
