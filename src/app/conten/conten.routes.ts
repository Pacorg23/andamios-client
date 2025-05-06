import { Routes } from '@angular/router';
import { ContenComponent } from './conten.component';
import { NosotrosComponent } from './ws/nosotros/nosotros.component';
import { ManufcturaComponent } from './ws/manufctura/manufctura.component';
import { IngenieriaComponent } from './ws/ingenieria/ingenieria.component';
import { ProductosComponent } from './ws/productos/productos.component';
import { CertificacionesComponent } from './ws/certificaciones/certificaciones.component';
import { GeneralComponent } from "./ws/general/general.component";

export const routes: Routes = [
    {
        path: '', component: ContenComponent, children: [
            { path: '', component: NosotrosComponent },
            { path: 'manufactura', component: ManufcturaComponent },
            { path: 'manufactura/seccion/:name', component: ManufcturaComponent },
            { path: 'manufactura/subseccion/:name', component: ManufcturaComponent },
            { path: 'ingenieria', component: IngenieriaComponent },
            { path: 'productos', component: ProductosComponent },
            { path: 'certificaciones', component: CertificacionesComponent },
            { path: 'general/:url', component: GeneralComponent },
        ]
    }];
