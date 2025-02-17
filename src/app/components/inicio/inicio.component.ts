import { Component,AfterViewInit, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import "jquery";
import "select2";
import { Productos } from 'src/app/models/productosModels';
import { ProductosService } from 'src/app/services/productos.service';


declare var $: any; 
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  productos: Productos[] = [];
  producto: Productos[] = [];


constructor(private appC:AppComponent, private productosService:ProductosService){}

 



  ngOnInit(): void {
   this.appC.ngAfterViewInit();
   this.appC.slider();
   this.fnGetProductosDestacados();
   
    $("#cboTallas").select2({
      dropdownParent: $("#cboTallas").next('.dropDownSelect2')    
      })
      $("#cboColor").select2({
        dropdownParent: $("#cboColor").next('.dropDownSelect2')    
      })
      }

      fnGetProductosDestacados(){
        this.productosService.getProductosDestacados().subscribe(
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



}
