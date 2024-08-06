import { Component, Input } from '@angular/core';
import { Book } from '../../shared/book';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IsbnPipe } from 'src/app/shared/isbn.pipe';

@Component({
  selector: 'bm-book-list-item',
  templateUrl: './book-list-item.component.html',
  styleUrls: ['./book-list-item.component.css'],
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, IsbnPipe],
})
export class BookListItemComponent {
  @Input() book?: Book;
}
