export class Product {
  _id: string;
  name: string;
  sku: string;
  description: string;
  price: number;
  images: string[];

  constructor(name: string, description: string, price: number, images: string[], _id?: string, sku?: string) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.images = images;
  }
}
