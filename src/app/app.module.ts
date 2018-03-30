import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpModule } from '@angular/http';
import localeDe from '@angular/common/locales/de';

import { BookResolver } from './shared/book-resolver.service';
import { BookStoreService } from './shared/book-store.service';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

registerLocaleData(localeDe);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'de' },
    BookResolver,
    BookStoreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
