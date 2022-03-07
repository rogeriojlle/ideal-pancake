export interface IFood {
  id: number;
  name: string;
  description: string;
  price: number;
  available: boolean;
  image: string;
}

export type IFormAddFoodForm = Omit<IFood, 'id' | 'available'>;
