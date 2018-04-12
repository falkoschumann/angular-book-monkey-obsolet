import { TestBed, inject } from '@angular/core/testing';

import { BookResolver } from './book-resolver.service';

describe('BookResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookResolver]
    });
  });

  it('should be created', inject([BookResolver], (service: BookResolver) => {
    expect(service).toBeTruthy();
  }));
});
