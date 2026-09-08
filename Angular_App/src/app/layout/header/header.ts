import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SocialIcons } from '../../shared/components/social-icons/social-icons';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ContactFormDialog } from '../../shared/components/contact-form-dialog/contact-form-dialog';
import { LayoutService } from '../../shared/services/layout';

@Component({
  selector: 'c-header',
  imports: [RouterLink, ButtonModule, RouterLinkActive, SocialIcons, DynamicDialogModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  dialogService = inject(DialogService);
  layoutService = inject(LayoutService);
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

  showDialog() {
    this.dialogService.open(ContactFormDialog, {
      header: "Let's Talk",
      closable: true,
      modal: true,
    });
  }

  openMenu() {
    this.layoutService.updateLayout({ isMenuOpen: true });
  }

  closeMenu() {
    this.layoutService.updateLayout({ isMenuOpen: false });
  }
}
