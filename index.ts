import { BaseProduct, Electronics, Clothing, Book, CartItem } from './types/product-types';
import { electronicsData, clothingData, bookData } from './test-products';

// Пошук товару за ID
const findProduct = <T extends BaseProduct>(products: T[], id: number): T | undefined => {
    const product = products.find((product) => product.id === id);
    if (!product) {
      console.log("Product not found");
    }
    return product;
  };
  
// Фільтрація товарів за ціною
  export const filterByPrice = <T extends BaseProduct>(products: T[], maxPrice: number): T[] => {
    return products.filter((product) => product.price <= maxPrice);
  };

// Додавання товару в кошик
 const addToCart = <T extends BaseProduct>(
    cart: CartItem<T>[],
    product: T,
    quantity: number
  ): CartItem<T>[] => {
    const existingItem = cart.find((item) => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ product, quantity });
    }
    return cart;
  };
  
// Підрахунок загальної вартості
  export const calculateTotal = <T extends BaseProduct>(cart: CartItem<T>[]): number => {
  return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };
  
// Приклад використання
 const phone = findProduct(electronicsData, 1);
 console.log("Знайдений товар:", phone);
 const jeans = findProduct(clothingData, 7);
 console.log("Знайдений товар:", jeans);


 const filteredElectronics = filterByPrice(electronicsData, 20000);
 console.log("Фільтрована електроніка:", filteredElectronics);

 let cart: CartItem<BaseProduct>[] = [];
  if (phone) {
    cart = addToCart(cart, phone, 2);
 }

 console.log("Кошик:", cart);

 const total = calculateTotal(cart);
 console.log("Загальна вартість кошика:", total);