import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private carrito: any[] = [];
  private cartSubject = new BehaviorSubject<number>(0); 
  private cartSub = new BehaviorSubject<any[]>(this.carrito);// Almacenamos los productos del carrito
   private url: string = environment.apiUrl;
  constructor(private https:HttpClient) {
    // Cargar carrito desde el localStorage (si existe)
    this.loadCart();
    const savedCart = localStorage.getItem('carrito');
    if (savedCart) {
      this.carrito = JSON.parse(savedCart);
    }
    this.cartSubject.next(this.carrito.length);
    this.cartSub  .next(this.carrito); 
  }

      // Método para cargar el carrito desde localStorage
    private loadCart() {
      const cart = localStorage.getItem('cart');  // Leemos el carrito guardado
      if (cart) {
        this.carrito = JSON.parse(cart);  // Convertimos el JSON a un array de productos
        this.cartSubject.next(this.carrito.length);  // Emitimos la cantidad de productos
        this.cartSub.next(this.carrito);  // Emitimos el carrito actualizado
      }
    }

    // Obtener productos del carrito
    getProductosCarrito() {
      return [...this.carrito]; // Devolvemos una copia del carrito
    }
  
   

    // Método para agregar un producto al carrito
    agregarCarrito(product: any, intQuantity: number, intSize: string, strColor: string) {
      const productWithDetails = {
        ...product,          // Mantener las propiedades básicas del producto
        intQuantity: intQuantity,  // Agregar cantidad
        intSize: intSize,          // Agregar talla
        strColor: strColor         // Agregar color
      };

    // Si el producto ya existe en el carrito, actualizamos su cantidad
      const existingProductIndex = this.carrito.findIndex(item => item.id === productWithDetails.id && item.intSize === intSize && item.strColor === strColor);
      
      if (existingProductIndex !== -1) {
        this.carrito[existingProductIndex].intQuantity += intQuantity;
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

    calcularCostEnvio(data:any): Observable<any> {
       return this.https.post<any>(this.url + 'Ecommerce/Ship', data);
    }
}
