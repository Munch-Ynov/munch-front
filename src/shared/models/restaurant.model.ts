import type {Irestaurant} from "@/shared/interfaces/Irestaurant";
import type {Origines} from "@/shared/enum/origines";
import type {Regimes} from "@/shared/enum/regimes";

export class Restaurant implements Irestaurant{
    id !: number;
    name !: string;
    address !: string;
    price !: string;
    origines !: Origines;
    regime !: Regimes;
    image !: string;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }

}
