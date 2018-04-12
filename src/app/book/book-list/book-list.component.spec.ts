import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Book } from '../../shared/book';
import { BookListComponent } from './book-list.component';

@Component({ template: '<router-outlet></router-outlet>' })
class DummyOutletComponent { }

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'a.bm-book-list-item',
  template: 'Dummy'
})
class DummyBookListItemComponent { }

@Component({ template: 'Dummy' })
class DummyDetailsComponent { }

describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          BookListComponent,
          DummyOutletComponent,
          DummyBookListItemComponent,
          DummyDetailsComponent
        ],
        imports: [
          RouterTestingModule.withRoutes([
            { path: ':isbn', component: DummyDetailsComponent }
          ])
        ],
        schemas: [NO_ERRORS_SCHEMA]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    TestBed.createComponent(DummyOutletComponent);
    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display books', () => {
    let receivedBooks: Book[];

    component.books$.subscribe(b => receivedBooks = b);

    expect(receivedBooks.length).toBe(2);
    expect(receivedBooks[0].isbn).toBe('111');
    expect(receivedBooks[1].isbn).toBe('222');
  });

  it('should navigate to details page by ISBN', async(inject([Location], (location) => {
    fixture.nativeElement.querySelector('a').click();

    fixture.whenStable().then(() => {
      expect(location.path()).toEqual('/111');
    });
  })));
});
