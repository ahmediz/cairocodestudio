import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'c-home-section',
  imports: [],
  templateUrl: './home-section.html',
  styleUrl: './home-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeSection {
  title = input<string>('');
  subtitle = input<string>('');
  containerClass = input<string>('');
  isCenter = input<boolean>(false);
}
