import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { ProductosComponent } from './components/productos/productos.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { SobreNosotrosComponent } from './components/sobre-nosotros/sobre-nosotros.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { ProductoDetalleComponent } from './components/producto-detalle/producto-detalle.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'productos/:nombreCategoria', component: ProductosComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'sobre-nosotros', component: SobreNosotrosComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'producto-detalle/:nombreCategoria/:nombreProducto', component: ProductoDetalleComponent },


];
const routerOptions: ExtraOptions = {
 scrollPositionRestoration: 'disabled', // Prueba deshabilitarlo temporalmente
 anchorScrolling: 'enabled' // Habilita el desplazamiento a los enlaces de anclaje
};

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
