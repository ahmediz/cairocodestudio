import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContactForm } from '../contact-form/contact-form';

@Component({
  selector: 'c-contact-form-dialog',
  imports: [ContactForm],
  templateUrl: './contact-form-dialog.html',
  styleUrl: './contact-form-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactFormDialog {}
