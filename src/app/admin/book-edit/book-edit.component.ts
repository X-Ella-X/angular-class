import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';

import { BookStoreService } from 'src/app/shared/book-store.service';
import { Book } from 'src/app/shared/book';

@Component({
  selector: 'bm-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css'],
})
export class BookEditComponent {
  book$: Observable<Book>;

  constructor(
    private service: BookStoreService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.book$ = this.route.paramMap.pipe(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      map((params) => params.get('isbn')!),
      switchMap((isbn) => this.service.getSingle(isbn)),
    );
  }

  update(book: Book) {
    this.service.update(book).subscribe((updatedBook) => {
      this.router.navigate(['/books', updatedBook.isbn]);
    });
  }
}
