import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import _ from 'lodash';

const ANDAMIOS = 'andamios';
const CONTEN = 'conten';

@Component({
  selector: 'app-no-content',
  standalone: true,
  imports: [],
  templateUrl: './no-content.component.html',
  styleUrl: './no-content.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoContentComponent {
  urlSegments: string[] = [];
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.url.subscribe(segments => {
      this.urlSegments = segments.map(segment => segment.path);
      const page = this.urlSegments[0];

      if (_.isEqual(page, ANDAMIOS)){
        this.router.navigate(['/andamios']);
      } else if (_.isEqual(page, CONTEN)){
        this.router.navigate(['/conten']);
      } else {
        this.router.navigate(['/']);
      }
    });
  }
}
