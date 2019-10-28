import { Route } from '@angular/router';
import {
  AuthComponent,
  HomeComponent
} from '../views';

export const appRoutes:Route[] = [
  {path: '', component: AuthComponent },
  {path: 'home', component: HomeComponent }
]
