import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HomeSection } from "../home-section/home-section";
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'c-cta-section',
  imports: [HomeSection, ButtonModule],
  templateUrl: './cta-section.html',
  styleUrl: './cta-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CtaSection {

}
