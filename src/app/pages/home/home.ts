import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'c-home',
  standalone: true,
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {

}
