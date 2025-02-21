import { Routes } from '@angular/router';
import { NoContentComponent } from './no-content/no-content.component';

export const routes: Routes = [
  {path:'' , children:[
    {path: '', loadChildren: () => import('./landing/landing.routes').then(m => m.routes)},
    {path: 'andamios', loadChildren: () => import('./andamios/andamios.routes').then(m => m.routes)},
    {path: 'conten', loadChildren: () => import('./conten/conten.routes').then(m => m.routes)},
    { path: '**', component: NoContentComponent}
  ]}
];

