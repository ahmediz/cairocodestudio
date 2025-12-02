import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Portfolio } from './pages/portfolio/portfolio';
import { Contact } from './pages/contact/contact';
import { Services } from './pages/services/services';

export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'about',
    component: About
  },
  {
    path: 'portfolio',
    component: Portfolio
  },
  {
    path: 'contact',
    component: Contact
  },
  {
    path: 'services',
    component: Services
  }
];
