import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookResolver } from '../shared/book-resolver.service';
import { BookFormComponent } from './book-form/book-form.component';

const routes: Routes = [
  {
    path: '',
    component: BookFormComponent
  },
  {
    path: ':isbn',
    component: BookFormComponent,
    resolve: {
      book: BookResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
