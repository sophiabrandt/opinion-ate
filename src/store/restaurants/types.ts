export interface Api {
  loadRestaurants: () => Promise<Restaurant[]>;
  createRestaurant: (name: string) => Promise<Restaurant>;
}

export interface Restaurant {
  id: number;
  name: string;
}
