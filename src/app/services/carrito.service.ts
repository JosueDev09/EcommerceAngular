import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private carrito: any[] = [];
  private cartSubject = new BehaviorSubject<number>(0); 
  private cartSub = new BehaviorSubject<any[]>(this.carrito);// Almacenamos los productos del carrito

  constructor() {
    // Cargar carrito desde el localStorage (si existe)
    const savedCart = localStorage.getItem('carrito');
    if (savedCart) {
      this.carrito = JSON.parse(savedCart);
    }
    this.cartSubject.next(this.carrito.length);
    this.cartSub  .next(this.carrito); 
  }

    // Obtener productos del carrito
    getProductosCarrito() {
      return [...this.carrito]; // Devolvemos una copia del carrito
    }
  
   

    // Método para agregar un producto al carrito
    agregarCarrito(product: any, quantity: number, size: string, color: string) {
      const productWithDetails = {
        ...product,          // Mantener las propiedades básicas del producto
        quantity: quantity,  // Agregar cantidad
        size: size,          // Agregar talla
        color: color         // Agregar color
      };

    // Si el producto ya existe en el carrito, actualizamos su cantidad
      const existingProductIndex = this.carrito.findIndex(item => item.id === productWithDetails.id && item.size === size && item.color === color);
      
      if (existingProductIndex !== -1) {
        this.carrito[existingProductIndex].quantity += quantity;
      } else {
        this.carrito.push(productWithDetails);
      }

      this.saveCart();
      this.cartSubject.next(this.carrito.length);
      this.cartSub.next(this.carrito);  // Emitir el carrito actualizado
    }
  
    // Eliminar producto del carrito
    removeFromCart(productId: string) {
      this.carrito = this.carrito.filter(item => item.id !== productId);
      this.saveCart();
      this.cartSubject.next(this.carrito.length); // Emitir el nuevo número de productos
    }

    // Obtener la cantidad total de productos
    getTotalItems() {
      return this.carrito.length;
    }

    // Obtener el precio total de todos los productos
    getTotalPrice() {
      return this.carrito.reduce((total, item) => total + item.price, 0);
    }

    // Obtener el BehaviorSubject que emite la cantidad de productos
    getCartItemCount() {
      return this.cartSubject.asObservable();
    }

    private saveCart() {
      localStorage.setItem('cart', JSON.stringify(this.carrito));
    }

      // Método para obtener los productos del carrito
    getCartItems() {
      return this.cartSub.asObservable();
    }
}
