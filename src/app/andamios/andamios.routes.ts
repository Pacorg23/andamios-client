import { Routes } from "@angular/router";
import { AndamiosComponent } from "./andamios.component";
import { InicioComponent } from "./rutas/inicio/inicio.component";
import { CategoriasComponent } from "./rutas/categorias/categorias.component";
import { SucursalesComponent } from "./rutas/sucursales/sucursales.component";
import { SeccionesComponent } from "./rutas/secciones/secciones.component";
import { GeneralComponent } from "./rutas/general/general.component";


export const routes : Routes = [
  { path:'', component: AndamiosComponent, children: [
    { path: '', component: InicioComponent },
    { path: 'categoria/:url', component:CategoriasComponent },
    { path: 'contenido/seccion/:name', component: SeccionesComponent },
    { path: 'contenido/subseccion/:name', component: SeccionesComponent },
    { path: 'general/:opcion', component: GeneralComponent },
    { path: 'sucursales', component: SucursalesComponent }
  ]}
]

