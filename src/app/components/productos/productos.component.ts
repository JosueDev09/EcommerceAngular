import { Component,OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Categorias } from 'src/app/models/categoriasModels';
import { Productos } from 'src/app/models/productosModels';
import { ProductosService } from 'src/app/services/productos.service';
import { trigger, transition, style, animate } from '@angular/animations';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
  animations: [
      trigger('pageAnimations', [
        transition('* => *', [
          style({ opacity: 0 }),
          animate('0.5s', style({ opacity: 1 }))
        ])
      ])
    ]
})
export class ProductosComponent implements OnInit {

  productos: Productos[] = [];
  producto: Productos[] = [];
  categorias:Categorias[] = [];
  categoria:Categorias[] = [];
  categoriaActual?: string;

  constructor(private productosService:ProductosService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categoriaActual = params['nombreCategoria']; // Aquí 'categoria' es el nombre del parámetro en la ruta
    });
    this.fnGetProductos();
    this.fnGetCategorias();
  }

  fnGetProductos(){
    this.productosService.getProductos().subscribe(
      (res:any) => {         
        if (Array.isArray(res)) {
          this.productos = res[0]; // Asegúrate de que response sea un array
      } else {
          console.error('Respuesta no válida:', res);
          this.productos = []; // Maneja el error adecuadamente
      }
    }
      );

  }

  fnGetCategorias(){
    this.productosService.getCategorias().subscribe(
      (res:any) => {         
        if (Array.isArray(res)) {
          this.categorias = res[0]; // Asegúrate de que response sea un array
      } else {
          console.error('Respuesta no válida:', res);
          this.categorias = []; // Maneja el error adecuadamente
      }
    }
      );
  }

}
