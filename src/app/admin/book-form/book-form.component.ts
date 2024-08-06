import {
  Component,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  inject,
} from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';

import { Book } from 'src/app/shared/book';
import { atLeastOneValue, isbnFormat } from 'src/app/shared/validators';
import { AsyncValidatorsService } from '../shared/async-validators.service';

@Component({
  selector: 'bm-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css'],
})
export class BookFormComponent implements OnChanges {
  @Input() book?: Book;

  @Output() submitBook = new EventEmitter<Book>();

  form = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    subtitle: new FormControl('', { nonNullable: true }),
    isbn: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, isbnFormat],
      asyncValidators: inject(AsyncValidatorsService).isbnExists(),
    }),
    description: new FormControl('', { nonNullable: true }),
    published: new FormControl('', { nonNullable: true }),
    thumbnailUrl: new FormControl('', { nonNullable: true }),

    authors: this.buildAuthorsArray(['']),
  });

  private buildAuthorsArray(authors: string[]) {
    return new FormArray(
      authors.map((v) => new FormControl(v, { nonNullable: true })),
      atLeastOneValue,
    );
  }

  submitForm() {
    const formValue = this.form.getRawValue();
    const authors = formValue.authors.filter((author) => !!author);
    const newBook: Book = {
      ...formValue,
      authors,
    };

    this.submitBook.emit(newBook);
  }

  get authors() {
    return this.form.controls.authors;
  }

  addAuthorControl() {
    this.authors.push(new FormControl('', { nonNullable: true }));
  }

  ngOnChanges(): void {
    if (this.book) {
      this.setFormValues(this.book);
      this.setEditMode(true);
    } else {
      this.setEditMode(false);
    }
  }

  private setFormValues(book: Book) {
    this.form.patchValue(book);
    this.form.setControl('authors', this.buildAuthorsArray(book.authors));
  }

  private setEditMode(isEditing: boolean) {
    const isbnControl = this.form.controls.isbn;

    if (isEditing) {
      isbnControl.disable();
    } else {
      isbnControl.enable();
    }
  }
}
