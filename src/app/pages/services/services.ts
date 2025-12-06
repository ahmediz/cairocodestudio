import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ServicesService } from '../../shared/services/services';
import { ServiceItem } from "../../shared/components/service-item/service-item";

@Component({
  selector: 'c-services',
  imports: [ServiceItem],
  templateUrl: './services.html',
  styleUrl: './services.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Services {
  servicesService = inject(ServicesService);
  services = computed(() => this.servicesService.services());
}
