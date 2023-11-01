export type Category = 'Footwear' | 'Apparel' | 'Accessories';

export interface Product
{
  id?: string;
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[]; 
  inventory: {
    S: number;
    M: number;
    L: number;
    XL: number;
  };
  quantity?: number;
  color: string;
  isOnSale: boolean;
  brand: string;
}
