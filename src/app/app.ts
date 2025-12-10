import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';
import { ToastModule } from 'primeng/toast';
import { Meta } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';
import { firstValueFrom, Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, ToastModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  router = inject(Router);
  route = inject(ActivatedRoute);
  metaService = inject(Meta);
  titleService = inject(Title);
  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(async (event) => {
        const data = await firstValueFrom(this.route.firstChild?.data as Observable<any>);
        this.titleService.setTitle(data['title']);
        this.metaService.updateTag({ name: 'description', content: data['description'] });
      });
  }
}
