export type BaseProduct = {
    id: number;
    name: string;
    price: number;
    description: string;
  };
  
  export type Electronics = BaseProduct & {
    category: 'electronics';
    warranty: number;
    brand: string;
  };
  
  export type Clothing = BaseProduct & {
    category: 'clothing';
    size: string;
    color: string;
  };
  
  export type Book = BaseProduct & {
    category: 'book';
    author: string;
    pages: number;
  };
  
  export type CartItem<T extends BaseProduct> = {
    product: T;
    quantity: number;
  };