export interface ProductI {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
  price: number;
}

export interface ProductCreateI {
  title: string;
  imageUrl: string;
  description: string;
  price: number | string;
}
