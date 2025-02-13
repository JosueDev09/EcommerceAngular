import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

   menuItems = [
      { name: 'Inicio', path: '/' },
      { name: 'Productos', path: '/productos' },
      { name: 'Carrito', path: '/carrito' },
      { name: 'Sobre nosotros', path: '/sobre-nosotros' },
      { name: 'Contacto', path: '/contacto' }
    ];

   
    
     
    

}
