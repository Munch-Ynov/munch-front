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
                return state.filteredRestaurants;
            }
        },
        actions: {
            async fetchRestaurants() {
                try {
                    this.restaurants = await getAllRestaurants();  
                    this.filteredRestaurants = [...this.restaurants];  
                } catch (e) {
                    console.log(e);                
                }
            },
            async filterSearch(searchInput: string) {
                
                try {
                    console.log(this.filteredRestaurants);
                    this.filteredRestaurants  = this.restaurants.filter((restaurant) => {
                        return restaurant.name.toLowerCase().includes(searchInput.toLowerCase());
                    });
                    console.log(this.filteredRestaurants);
                    

                } catch (e) {
                    console.log(e);                
                }
            },
            resetFilter() {
                    this.filteredRestaurants = [...this.restaurants];
            }

        }
    })

