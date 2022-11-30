import type {Iuser} from "@/shared/interfaces/Iuser";

export class User implements Iuser{
    id !: number;
    name !: string;
    email !: string;
    phone !: string;
    password !: string;
    description !: string;
    image_id !: string;
    role_id !: number;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }

}
