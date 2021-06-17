import {FormControl, Validators} from "@angular/forms";


interface IObjectKeys {
  [key: string]: object | string | boolean | number | null;
}

export interface Book extends IObjectKeys { // Не копия ли это нижнего интерфейса, но только для одного элемента.
  bookName: string,
  bookAuthor: string,
  bookGenre: string,
  bookCount: number,
  bookInStock: number,
}

export interface Comment extends IObjectKeys {
  userKey: string,
  userName: string,
  userLastName: string,
  userComment: string,
  bookKey: string,
}

export interface BorrowBook extends IObjectKeys {
  libKey: string,
  libName: string,
  libLastName: string
  studKey: string,
  studName: string,
  studLastName: string
  bookKey: string,
  bookName: string,
  bookAuthor: string,
  borrowBookDate: string,
  returnBookDate: string,
  returnBookCheck: boolean;
}

