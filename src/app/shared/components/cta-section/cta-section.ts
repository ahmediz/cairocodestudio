import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HomeSection } from "../home-section/home-section";
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { ContactFormDialog } from '../contact-form-dialog/contact-form-dialog';

@Component({
  selector: 'c-cta-section',
  imports: [HomeSection, ButtonModule],
  templateUrl: './cta-section.html',
  styleUrl: './cta-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CtaSection {
  dialogService = inject(DialogService);
  showDialog() {
    this.dialogService.open(ContactFormDialog, {
      header: "Let's Talk",
      closable: true,
      modal: true,
    });
  }
}
