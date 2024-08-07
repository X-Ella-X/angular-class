import { IsbnPipe } from 'src/app/shared/isbn.pipe';
import { BookListItemComponent } from './book-list-item.component';

describe('BookListItemComponent', () => {
  it('should mount', () => {
    cy.mount(
      `<bm-book-list-item [book]="{isbn: '0123456789', title: 'Some Book', authors: ['Author 1]}"></bm-book-list-item>`,
      { declarations: [BookListItemComponent, IsbnPipe] },
    );

    cy.get('a').contains('ISBN 012-3456789');
  });
});
