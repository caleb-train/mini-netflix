import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'
import { AppComponent } from './app.component';
import { AuthComponent } from './views';
import { NavBarComponent } from './components';

import { appRoutes } from './routes/app.route';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
