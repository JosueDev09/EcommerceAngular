import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private url: string = environment.apiUrl;
  constructor(private https:HttpClient) { }

  getProductosDestacados(){
    return this.https.get(this.url + 'Ecommerce/ProductosDestacados');
  }

  getCategorias(){
    return this.https.get(this.url + 'Ecommerce/Categorias');
  }

  // Método para obtener el producto por su nombre o ID
  getProductoDetalle(strNombreCategoria:string,strNombreProducto: string): Observable<any> {
    let params = new HttpParams();
    if (strNombreCategoria) {
      params = params.set('strNombreCategoria', strNombreCategoria);
    }
    if (strNombreProducto) {
      params = params.set('strNombreProducto', strNombreProducto);
    }

    return this.https.get(this.url + 'Ecommerce/Producto-Detalle', { params });
  }


}
