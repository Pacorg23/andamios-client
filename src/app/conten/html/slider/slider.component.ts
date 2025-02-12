import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();

/**
 * @Component - SliderComponent
 * @description - This component is used to display the slider with the images and url to your app.
 * @param {any} slides - Array of objects with the image details.
 * @example - slides = [ { id: 1, name: 'Slide 1', image: '/carousel/1.jpg' } ]
 * @param {number} slidesPer - Number of slides to display, default 3.
 * @param {boolean} loop - Loop the slides, default true.
 * @param {boolean} autoplay - Autoplay the slides, default true.
 * @description - TODO - Add the autoplay speed.
 * @param {number} speed - Speed of the slides, default 500.
 * @description - TODO - Add the speed of the slides.
 * @param {any} brakePoints - Breakpoints for the slides.
 * @example - brakePoints = { 640: { slidesPerView: 1 }, 1024: { slidesPerView: 3 } }
 * @param {string} width - Width of the slider, default "80%".
 * @param {string} height - Height of the slider, default auto.
 * @param {string} imgWidth - Width of the image, default 80%.
 * @param {string} imgHeight - Height of the image, default 300px.
 * @param {string} mainUrl - Main URL of the application, default '/'.
 * @param {string} destinyUrl - Destiny URL of the application, default '/'.
 * @example - mainUrl = '/home', destinyUrl = '/details' , result = '/home/details'
 */

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderComponent {

  /* SWIPER CONFIGURATION */
  @Input() slidesPer: number = 3;
  @Input() loop: boolean = true;
  @Input() speed: number = 1000;
  @Input() brakePoints: any = {
    640: {
      slidesPerView: 1,
    },
    1024: {
      slidesPerView: 3,
    },
  };
  @Input() width: string = "80%";
  @Input() height: string = "auto";
  @Input() imgWidth: string = "80%";
  @Input() imgHeight: string = "300px";
  @Input() mainUrl: string = '/';
  @Input() destinyUrl: string = '/';
  /*@Input() slides = [
    { id: 1, name: 'Slide 1 Another title exesive to keep like a name', image: '/carousel/1.jpg', url: '/categoria/name' },
    { id: 2, name: 'Slide 2 Big Large Name', image: '/carousel/2.jpg', url: '/categoria/name' },
    { id: 3, name: 'Slide 3', image: '/carousel/3.jpg', url: '/categoria/name' },
    { id: 4, name: 'Slide 4', image: '/carousel/4.jpg', url: '/categoria/name' },
    { id: 5, name: 'Slide 5 Another title exesive to keep like a name, is so long that is imposible to keep', image: '/carousel/5.jpg', url: '/categoria/name' },
    { id: 6, name: 'Slide 6', image: '/carousel/6.jpg', url: '/categoria/name' },
    { id: 7, name: 'Slide 7', image: '/carousel/7.jpg', url: '/categoria/name' },
    { id: 8, name: 'Slide 8', image: '/carousel/8.jpg', url: '/categoria/name' }
  ];*/
  @Input() slides;
  @Input() autoplay: any = {
    delay: 3000,
    disableOnInteraction: true,
    pauseOnMouseEnter: true
  }

  constructor(private router: Router) { }

  ngOnInit() {
    if (this.slides.length > this.slidesPer) {
      this.loop = false; // Desactiva loop si no hay suficientes diapositivas
    }
  }

  nextView() {
    const carousel = document.querySelector('swiper-container');
    carousel?.swiper.slideNext();
  }

  prevView() {
    const carousel = document.querySelector('swiper-container');
    carousel?.swiper.slidePrev();
  }

  goToDestiny(destiny: string) {
    this.router.navigate([this.mainUrl + destiny]);
  }
}
