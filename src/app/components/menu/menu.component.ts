import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  totalItems: number = 0;
  cartItems: any[] = [];

   menuItems = [
      { name: 'Inicio', path: '/' },
      { name: 'Productos', path: '/productos/todoslosproductos' },
      { name: 'Carrito', path: '/carrito' },
      { name: 'Sobre nosotros', path: '/sobre-nosotros' },
      { name: 'Contacto', path: '/contacto' }
    ];

    constructor(private carritoService: CarritoService) {}

    ngOnInit() {
     // Suscribirse al Subject del servicio para recibir actualizaciones del número de productos
     this.carritoService.getCartItemCount().subscribe(count => {
      this.totalItems = count;
    });
    this.carritoService.getCartItems().subscribe(items => {
      this.cartItems = items;  // Asignamos los productos del carrito a cartItems
    });
    }


   
    
     
    

}
