import { afterRender, Component, OnInit, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Andamios Atlas';

  constructor(private renderer: Renderer2) {
    afterRender(() => {
      //this.loadChatBot();
    });
  }

  ngOnInit(){

  }

  private loadChatBot(): void {
    const script = this.renderer.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://s.cliengo.com/weboptimizer/67afc45762186553038dfb50/67afc45762186553038dfb53.js?platform=onboarding_modular';
    script.async = true;
    this.renderer.appendChild(document.body, script);
  }
}
