import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContactForm } from "../../shared/components/contact-form/contact-form";

@Component({
  selector: 'c-contact',
  imports: [ContactForm],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {

}
