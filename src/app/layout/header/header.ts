import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'c-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  mainNav = signal([
    {
      label: 'Home',
      routerLink: '/',
    },
    {
      label: 'About',
      routerLink: '/about',
    },
  ]);
}
