export type Category = 'Footwear' | 'Apparel' | 'Accessories';

export interface Product
{
  id?: string;
  title: string;
  description: string;
  price: number;
  category: Category;
  images: string[]; 
  inventory: number;
  quantity?: number;
}
