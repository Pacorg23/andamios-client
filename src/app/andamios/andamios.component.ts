 import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarAndamiosComponent } from './componentes/navbar-andamios/navbar-andamios.component';
import { FooterComponent } from './componentes/footer/footer.component';

@Component({
  selector: 'app-andamios',
  standalone: true,
  imports: [RouterOutlet, NavbarAndamiosComponent, FooterComponent],
  templateUrl: './andamios.component.html',
  styleUrl: './andamios.component.css'
})
export class AndamiosComponent {

}
