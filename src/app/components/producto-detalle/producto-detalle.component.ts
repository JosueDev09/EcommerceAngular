import { Component,OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import "jquery";
import "select2";
import { ActivatedRoute } from '@angular/router';
declare var $: any; 


@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.scss']
})
export class ProductoDetalleComponent implements OnInit{

  nombreCategoria: string | null = null;
  nombreProducto: string | null = null;
  

  constructor(private appC:AppComponent,private route: ActivatedRoute){}
  
   
  
  
  
    ngOnInit(): void {
     this.appC.ngAfterViewInit();
     this.appC.slider();
     this.nombreCategoria= this.route.snapshot.paramMap.get('nombreCategoria') || '';;
     this.nombreProducto= this.route.snapshot.paramMap.get('nombreProducto') || '';;
      $("#cboTallas").select2({
        dropdownParent: $("#cboTallas").next('.dropDownSelect2')    
        })
        $("#cboColor").select2({
          dropdownParent: $("#cboColor").next('.dropDownSelect2')    
        })
        }
   
  
  }
