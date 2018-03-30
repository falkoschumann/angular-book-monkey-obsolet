import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DelayDirective } from './shared/delay.directive';
import { IsbnPipe } from './shared/isbn.pipe';
import { ZoomDirective } from './shared/zoom.directive';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookListItemComponent } from './book-list-item/book-list-item.component';
import { BookRoutingModule } from './book-routing.module';

@NgModule({
  imports: [
    CommonModule,
    BookRoutingModule
  ],
  declarations: [
    BookDetailsComponent,
    BookListComponent,
    BookListItemComponent,
    DelayDirective,
    IsbnPipe,
    ZoomDirective
  ]
})
export class BookModule { }
