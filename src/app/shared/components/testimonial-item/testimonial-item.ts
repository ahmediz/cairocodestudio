import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'c-testimonial-item',
  imports: [],
  templateUrl: './testimonial-item.html',
  styleUrl: './testimonial-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestmonialItem {
  testimonial = input.required<{ id: string; name: string; logo: string; logoAlt: string; company: string; description: string }>();
}
