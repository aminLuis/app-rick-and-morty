import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { PersonajesComponent } from './pages/personajes/personajes.component';
import { HomeComponent } from './pages/home/home.component';
import { DetailsComponent } from './pages/personajes/details.component';

const routes:Routes = [
      {path: '', component:PersonajesComponent},
      {path: 'personajes-component', component:PersonajesComponent},
      {path: 'details-component/:id', component:DetailsComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    PersonajesComponent,
    HomeComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
