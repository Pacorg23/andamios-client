import { Routes } from "@angular/router";
import { LandingComponent } from "./landing.component";
import { InicioComponent } from "./rutas/inicio/inicio.component";
import { AboutComponent } from "./rutas/about/about.component";
import { ProveeedoresComponent } from "./rutas/proveeedores/proveeedores.component";
import { ClientesComponent } from "./rutas/clientes/clientes.component";
import { JoinComponent } from "./rutas/join/join.component";
import { PrivacidadComponent } from "./rutas/privacidad/privacidad.component";
import { AnticorrupcionComponent } from "./rutas/anticorrupcion/anticorrupcion.component";
import { ContactanosComponent} from "./rutas/contactanos/contactanos.component";

export const routes : Routes = [
  { path: '', component: LandingComponent, children: [
    { path: '', component: InicioComponent },
    { path: 'quienes-somos', component: AboutComponent},
    { path: 'proveedores/:seccion', component: ProveeedoresComponent },
    { path: 'clientes', component: ClientesComponent},
    { path: 'unete-al-equipo', component: JoinComponent },
    { path: 'politicas-privacidad', component: PrivacidadComponent },
    { path: 'aviso-anticorrupcion', component: AnticorrupcionComponent },
    { path: 'contactanos/:division?', component: ContactanosComponent }
  ]}
]

