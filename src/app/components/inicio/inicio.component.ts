import { Component,AfterViewInit, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import "jquery";
import "select2";

declare var $: any; 
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

 

constructor(private appC:AppComponent){}

 



  ngOnInit(): void {
   this.appC.ngAfterViewInit();
   this.appC.slider();
   
    $("#cboTallas").select2({
      dropdownParent: $("#cboTallas").next('.dropDownSelect2')    
      })
      $("#cboColor").select2({
        dropdownParent: $("#cboColor").next('.dropDownSelect2')    
      })
      }
 

}
