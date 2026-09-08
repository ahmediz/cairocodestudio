import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'c-service-item',
  imports: [],
  templateUrl: './service-item.html',
  styleUrl: './service-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceItem {
  service = input.required<{ title: string; description: string; icon: string }>();
}
