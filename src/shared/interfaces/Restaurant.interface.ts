
export interface RestaurantInterface {
    id: number;
    userId ?: number;
    name: string;
    address: string;
    description: string;
    price : PriceInterface;
    n_siret?: string;
    phone?: string;
    code_postal: string;
    city : string;
    email: string;
    // images: string[];
    createAt: Date;
    updateAt: Date;
}

export enum PriceInterface {
    ECO = "€",
    MODERATE = "€€",
    EXPENSIVE = "€€€",
    VERY_EXPENSIVE = "€€€€"
} 



export interface popularRestaurantCardInterface extends Partial<RestaurantInterface>{
    id: number;
    name: string;
    address: string;
    images: string[];
    description: string;
    code_postal: string;
    city : string;
}

export interface restaurantSearchForm {
    name: string;
}



