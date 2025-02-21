import { Component } from '@angular/core';
import { fadeAnimation, fadeInAnimation } from '../../../fadeIn';
import { MobileService } from '../../../mobile.service';

@Component({
  selector: 'app-nosotros',
  standalone: true,
  imports: [],
  templateUrl: './nosotros.component.html',
  styleUrl: './nosotros.component.css',
  animations:[fadeAnimation, fadeInAnimation]
})
export class NosotrosComponent {

  isMobile: boolean;
  isTablet: boolean;

  constructor(private mobile: MobileService) { }

  ngOnInit() {
    this.mobile.getWidth().subscribe(width => {
      this.isMobile = width < 768;
      this.isTablet = width >= 768 && width < 1279;
    });
  }

  slides = [
    {
      img: 'assets/imagenes/carrusel/ca01.jpg', //base64 image
      imgResponsive: 'assets/imagenes/cA.jpg',
      title: 'Slide 1',
      description: 'Slide 1 description',
      button: false
    },
    {
      img: 'assets/imagenes/carrusel/ca02.jpg',
      imgResponsive: 'assets/imagenes/cB.jpg',
      title: 'Slide 2',
      description: 'Slide 2 description',
      button: true
    },
    {
      img: 'assets/imagenes/carrusel/ca03.jpg',
      imgResponsive: 'assets/imagenes/cC.jpg',
      title: 'Slide 3',
      description: 'Slide 3 description',
      button: false
    },
    {
      img: 'assets/imagenes/carrusel/ca04.jpg',
      imgResponsive: 'assets/imagenes/cD.jpg',
      title: 'Slide 4',
      description: 'Slide 4 description',
      button: true
    },
    {
      img: 'assets/imagenes/carrusel/ca05.jpg',
      imgResponsive: 'assets/imagenes/cE.jpg',
      title: 'Slide 5',
      description: 'Slide 5 description',
      button: false
    }
  ]

  plantas = [
    {
      img: 'assets/imagenes/planta1.jpg',
      size: '7,000 m2',
      location: 'Planta San Luis Potosí'
    },
    {
      img: 'assets/imagenes/planta2.jpg',
      size: '10,000 m2',
      location: 'Planta Tlanepantla de Baz'
    }
  ]

  scrollToElement(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
