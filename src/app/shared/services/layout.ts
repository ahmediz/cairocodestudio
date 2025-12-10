import { Injectable, signal } from '@angular/core';

interface LayoutDTO {
  isMenuOpen: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  layout = signal<LayoutDTO>({
    isMenuOpen: false,
  });

  updateLayout(layout: Partial<LayoutDTO>) {
    this.layout.set({ ...this.layout(), ...layout });
  }
}
