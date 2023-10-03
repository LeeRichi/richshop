export type Category = 'Footwear' | 'Apparel' | 'Accessories';

export interface Product
{
  id?: string;
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[]; 
  inventory: number;
  quantity?: number;
}
