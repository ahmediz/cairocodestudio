import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SocialIcons } from "../../shared/components/social-icons/social-icons";

@Component({
  selector: 'c-header',
  imports: [RouterLink, ButtonModule, RouterLinkActive, SocialIcons],
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
    {
      label: 'Services',
      routerLink: '/services',
    },
    {
      label: 'Portfolio',
      routerLink: '/portfolio',
    },
    {
      label: 'Contact',
      routerLink: '/contact',
    },
  ]);
}
