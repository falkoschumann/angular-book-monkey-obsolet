import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookResolver } from '../shared/book-resolver.service';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailsComponent } from './book-details/book-details.component';

const routes: Routes = [
  {
    path: '',
    component: BookListComponent
  },
  {
    path: ':isbn',
    component: BookDetailsComponent,
    resolve: {
      book: BookResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
