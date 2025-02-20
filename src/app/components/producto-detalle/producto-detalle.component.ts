import { Component,OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import "jquery";
import "select2";
import { ActivatedRoute } from '@angular/router';
import { Productos } from 'src/app/models/productosModels';
import { ProductosService } from 'src/app/services/productos.service';
declare var $: any; 


@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.scss']
})
export class ProductoDetalleComponent implements OnInit{

  nombreCategoria: string | null = null;
  nombreProducto: string | null = null;
  productosDes:Productos[] = [];
  productoDes:Productos[] = [];
  idCategoria: string | null = null;
  idProducto: string | null = null;
  productoDetalles: any = {}; 
  getProductosColores:any []=  [];
  getProductosTallas:any []=[];
  selectedColor: string ='0';


  constructor(private appC:AppComponent,private route: ActivatedRoute, private productosService:ProductosService){}
  
  
    ngOnInit(): void {
     this.appC.ngAfterViewInit();
     this.appC.slider();

     this.nombreCategoria= this.route.snapshot.paramMap.get('nombreCategoria') || '';
     this.nombreProducto= this.route.snapshot.paramMap.get('nombreProducto') || '';

      this.getProductDetails(this.nombreCategoria,this.nombreProducto);   
     this.fnGetProductosDestacados();
     this.getColoresProductos(this.nombreProducto);
     
    
     $("#cboColor").change((event:any) => {
      let strNombreColor = $("#cboColor").val();
          this.nombreProducto = this.nombreProducto || ''
      this.getTallasProductos(this.nombreProducto, strNombreColor);
    }); 
              
     
        }
      

        fnGetProductosDestacados(){
          this.productosService.getProductosDestacados().subscribe(
            (res:any) => {         
              if (Array.isArray(res)) {
                this.productosDes = res[0]; // Asegúrate de que response sea un array
            } else {
                console.error('Respuesta no válida:', res);
                this.productosDes = []; // Maneja el error adecuadamente
            }
          }
            );
  
        }

        // Obtener detalles del producto por ID
      getProductDetails(strNombreCategoria:string,strNombreProducto: string): void {
        this.productosService.getProductoDetalle(strNombreCategoria,strNombreProducto).subscribe(
          (data:any) => {
            if (Array.isArray(data)) {
            this.productoDetalles = data[0][0];
            console.log('Detalles del producto:', this.productoDetalles);
            } else {
              console.error('Respuesta no válida:', data);
              this.productoDetalles = {}; // Maneja el error adecuadamente
            }
          }
        );
      }

      getColoresProductos(strNombreProducto:string):void
      {
        this.productosService.getColoresProducto(strNombreProducto).subscribe(
          (data:any) => {
            if(Array.isArray(data)){
              this.getProductosColores = data[0];

              $("#cboTallas").select2({
                dropdownParent: $("#cboTallas").next('.dropDownSelect2')    
                })
                $("#cboColor").select2({
                  dropdownParent: $("#cboColor").next('.dropDownSelect2')    
                })
             
            } else{
              console.error('Respuesta no válida:', data);
              this.getProductosColores = []; // Maneja el error adecuadamente
            }
          }
        )
      }

      getTallasProductos(strNombreProducto:string, strNombreColor: string){
        this.productosService.getTallasProducto(strNombreProducto,strNombreColor).subscribe(
          (data:any) => {
            if(Array.isArray(data)){
              this.getProductosTallas = data[0];
             
            } else{
              console.error('Respuesta no válida:', data);
              this.getProductosTallas = []; // Maneja el error adecuadamente
            }
          }
        )
      }

       // Cambiar el color y actualizar las tallas disponibles
      

     
  
  }
