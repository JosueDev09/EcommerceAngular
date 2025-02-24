import { Component, OnInit } from '@angular/core';
import "jquery";
import "select2";
import { CarritoService } from 'src/app/services/carrito.service';
declare var $: any; 

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {

  intQuantity:number = 1;
  envioData= {
    intPais: '',
    intCP: '',
    intCiudad: ''
  };
  dblCostoEnvio: number | null = null;

  constructor(private carritoService: CarritoService) {}

  // Método para agregar el producto al carrito
  
  ngOnInit(): void {
   
  }

  
  fnIncrmentarProducto(){
    this.intQuantity += 1; // Aumentamos en 1
  }
  fnDecrementarProducto(){
    if (this.intQuantity > 1) {
      this.intQuantity -= 1; // Disminuimos en 1, pero no dejamos que sea menor a 1
    }
  }

  fnCalcularPrecioEnvio(){
    if (this.envioData.intPais && this.envioData.intCP && this.envioData.intCiudad) {
      this.carritoService.calcularCostEnvio(this.envioData).subscribe(
          (response:any) => {   
            this.dblCostoEnvio = response.dblCosto;                
        })// Maneja el error adecuadamente
      }
    }

  

 

}
