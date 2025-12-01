import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { fromEvent, tap } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'c-scroll-container',
  imports: [ButtonModule],
  templateUrl: './scroll-container.html',
  styleUrl: './scroll-container.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollContainer {
  scrollContainer = viewChild<ElementRef<HTMLElement>>('scrollContainer');
  scrollValue = input<number>(200);
  destroyRef = inject(DestroyRef);
  showLeftButton = signal(false);
  showRightButton = signal(false);

  constructor() {
    afterNextRender(() => {
      if (this.scrollContainer()) {
        const element = this.scrollContainer()?.nativeElement;
        if (element) {
          this.checkScroll(element);

          // Use fromEvent for reactive event handling
          fromEvent(element, 'scroll')
            .pipe(
              tap(() => this.checkScroll(element)),
              takeUntilDestroyed(this.destroyRef)
            )
            .subscribe();

          fromEvent(window, 'resize')
            .pipe(
              tap(() => this.checkScroll(element)),
              takeUntilDestroyed(this.destroyRef)
            )
            .subscribe();
        }
      }
    });
  }

  private checkScroll(element: HTMLElement): void {
    this.showLeftButton.set(element.scrollLeft > 0);
    this.showRightButton.set(
      Math.round(element.scrollLeft) < element.scrollWidth - element.clientWidth
    );
  }

  scrollLeft(): void {
    if (this.scrollContainer()) {
      this.scrollContainer()?.nativeElement.scrollBy({
        left: -this.scrollValue(),
        behavior: 'smooth',
      });
    }
  }

  scrollRight(): void {
    if (this.scrollContainer()) {
      this.scrollContainer()?.nativeElement.scrollBy({
        left: this.scrollValue(),
        behavior: 'smooth',
      });
    }
  }
}
