import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'c-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {

}
