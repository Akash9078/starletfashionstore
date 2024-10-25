export interface Product {
  title: string;
  platform: string;
  price: string;
  productlink: string;
  image1?: string;
  image2?: string;
  image?: string;
  [key: string]: string | undefined;
}