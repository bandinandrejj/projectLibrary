
  export interface Book { // Не копия ли это нижнего интерфейса, но только для одного элемента.
    key: string | null,
    bookName: string,
    bookAuthor: string,
    bookGenre: string,
    bookCount: number,
    bookComment: string,
  }

