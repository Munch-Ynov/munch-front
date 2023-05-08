import { defineStore } from 'pinia';
import type { RestaurantInterface } from '../interfaces';
import { getAllRestaurants } from '../services';

interface RestaurantState {
    restaurants: RestaurantInterface[] ;
    filteredRestaurants: RestaurantInterface[];
}

    export const useRestaurant = defineStore('restaurant', {
        state: (): RestaurantState => ({
            restaurants: [],
            filteredRestaurants: []
        }),
        getters: {
            getRestaurants(state): RestaurantInterface[] {
                return state.restaurants;
            }
        },
        actions: {
            async fetchRestaurants() {
                try {
                    this.restaurants = await getAllRestaurants();    
                } catch (e) {
                    console.log(e);                
                }
            },
        }
    })

