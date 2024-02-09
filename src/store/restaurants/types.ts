export interface Api {
  loadRestaurants: () => Promise<Restaurant[]>;
}

export interface Restaurant {
  id: number;
  name: string;
}
