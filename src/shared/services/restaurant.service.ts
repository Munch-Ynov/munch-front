import type { RestaurantInterface, restaurantSearchForm } from "../interfaces";

export async function getAllRestaurants(): Promise<RestaurantInterface[] > {
  return await (await fetch("http://localhost:3000/restaurants", {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
  })).json();
  
}

export async function filterRestaurants(searchForm: restaurantSearchForm ): Promise<RestaurantInterface[] > {
  return await (await fetch("http://localhost:3000/restaurants", {
    method: 'GET',
    body: JSON.stringify(searchForm),
    headers: {
        'Content-Type': 'application/json'
    }
  })).json();
  
}