export interface Product {
  id: string; // assuming the id is a string, adjust this if it's a different type
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[]; // assuming images is an array of strings (URLs)
  inventory: number;
}
