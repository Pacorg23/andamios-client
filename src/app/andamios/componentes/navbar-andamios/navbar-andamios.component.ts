import { afterRender, Component } from '@angular/core';
import { AndamiosService } from '../../andamios.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-navbar-andamios',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatIcon],
  templateUrl: './navbar-andamios.component.html',
  styleUrl: './navbar-andamios.component.css'
})
export class NavbarAndamiosComponent {

  navbar:any
  icon:string = 'menu'

  constructor(private andamiosService:AndamiosService, private router: Router) {
    this.andamiosService.obtenerNavbar().subscribe((res:any) => {
      this.navbar = res;
    })

  }

  ngAfterViewInit(){
    this.icon = 'menu'

  }

  /**
   * @description Navega a la pagina principal
   * @returns {void}
   */
  goBackToMain(){
    this.router.navigate(['/'])
  }

  toggleIcon(){
    if (this.icon == 'close') {
      this.icon = 'menu'
    } else if (this.icon == 'menu') {
      this.icon = 'close'
    }

    document.getElementById('responsive-menu').classList.toggle('openMenu')
  }


}
