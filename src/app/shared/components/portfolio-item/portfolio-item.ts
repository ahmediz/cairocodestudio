import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from "@angular/common";

@Component({
  selector: 'c-portfolio-item',
  imports: [ButtonModule, RouterLink, NgOptimizedImage],
  templateUrl: './portfolio-item.html',
  styleUrl: './portfolio-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioItem {
  portfolio = input.required<{
    id: string;
    title: string;
    description: string;
    image: string;
    link?: string;
    routerLink: string;
  }>();
}
