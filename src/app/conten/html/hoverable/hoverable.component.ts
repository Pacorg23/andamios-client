import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-hoverable',
  standalone: true,
  imports: [],
  templateUrl: './hoverable.component.html',
  styleUrl: './hoverable.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HoverableComponent {

  /*item: any = {
    title: 'Rack Automotriz',
    description: 'Fabricados en Acero Estructural <br><br> Nuestros Racks permiten tener diferentes configuraciones que permiten un cuidado seguro de las autopartes y materiales durante su traslado y almacenamiento, como lo son los Racks Automotrices para carga y descarga robótica.<br><br>Nuestra obsesión por la excelencia se refleja en la elección de los materiales de primera calidad que utilizamos para fabricar cada rack.<br><br>Gracias a nuestro personal capacitado y nuestra maquinaria de vanguardia, logramos cálculos precisos para el trabajo eficaz del rack en la línea de producción y ensamble. Mediante procesos automatizados logramos fabricar en serie cualquier volumen de racks.',
    image: '/carousel/1.jpg',
    url: '/carousel/url'
  };*/

  @Input() item: any;
  sanitazedDescription: any;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.sanitazedDescription = this.sanitizer.bypassSecurityTrustHtml(this.item.description);
  }

}
