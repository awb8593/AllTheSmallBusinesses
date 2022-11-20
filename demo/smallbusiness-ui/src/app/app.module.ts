import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutPageComponent,
    ContactUsComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
