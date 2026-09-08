import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { PortfolioService } from '../../shared/services/portfolio';
import { PortfolioItem } from "../../shared/components/portfolio-item/portfolio-item";

@Component({
  selector: 'c-portfolio',
  imports: [PortfolioItem],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Portfolio {
  portfolioService = inject(PortfolioService);
  portfolio = computed(() => this.portfolioService.portfolio());
}
