import { TestBed, inject } from '@angular/core/testing';
import {
  BaseRequestOptions,
  HttpModule,
  Http,
  RequestMethod,
  Response,
  ResponseOptions
} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { BookStoreService } from './book-store.service';
import { Book } from './book';

describe('BookStoreService', () => {
  const expectedBooks = [
    new Book('111', 'Book 1', [], new Date()),
    new Book('222', 'Book 2', [], new Date()),
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Http,
          useFactory: (mockBackend, options) => {
            return new Http(mockBackend, options);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        MockBackend,
        BaseRequestOptions,
        BookStoreService
      ]
    });
  });

  it('should GET a list of all books', inject([BookStoreService, MockBackend], (service: BookStoreService, backend: MockBackend) => {
    let connection: MockConnection;
    let receivedBooks: Book[];

    backend.connections.subscribe(c => {
      connection = c;
      c.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(expectedBooks)
      })));
    });

    service.getAll().subscribe(b => receivedBooks = b);

    expect(receivedBooks.length).toBe(2);
    expect(receivedBooks[0].isbn).toBe('111');
    expect(receivedBooks[1].isbn).toBe('222');

    expect(connection.request.method).toBe(RequestMethod.Get);
    expect(connection.request.url).toBe('http://localhost:3000/books');
  }));

  it('should GET a single book from /book/:isbn',
    inject([BookStoreService, MockBackend],
      (service: BookStoreService, backend: MockBackend) => {
        let connection: MockConnection;
        let receivedBook: Book;

        backend.connections.subscribe(c => {
          connection = c;
          c.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(expectedBooks[0])
          })));
        });

        service.getSingle('111').subscribe(b => receivedBook = b);

        expect(receivedBook.isbn).toBe('111');

        expect(connection.request.method).toBe(RequestMethod.Get);
        expect(connection.request.url).toBe('http://localhost:3000/book/111');
      }));

  it('should POST a new book to /book',
    inject([BookStoreService, MockBackend],
      (service: BookStoreService, backend: MockBackend) => {
        let connection: MockConnection;

        backend.connections.subscribe(c => connection = c);

        service.create(expectedBooks[0]);

        expect(connection.request.method).toBe(RequestMethod.Post);
        expect(connection.request.url).toBe('http://localhost:3000/book');
        expect(connection.request.getBody()).toEqual(JSON.stringify(expectedBooks[0]));
      }));
});
