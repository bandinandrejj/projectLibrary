import {FormControl, Validators} from "@angular/forms";

export interface Book { // Не копия ли это нижнего интерфейса, но только для одного элемента.
    key: string | null,
    bookName: string,
    bookAuthor: string,
    bookGenre: string,
    bookCount: number,
    bookComment: string,
  }

export interface Comment {
  key: string | null,
  userKey: string,
  userName: string,
  userLastName: string,
  userComment: string,
  bookKey: string,
}
