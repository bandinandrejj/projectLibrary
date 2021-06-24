interface IObjectKeys {
  [key: string]: object | string | boolean | number | null;
}

export interface Book extends IObjectKeys { // Не копия ли это нижнего интерфейса, но только для одного элемента.
  bookName: {value: string, type: string, meaningLibrarian: string, meaningOther: string},
  bookAuthor: {value: string, type: string, meaningLibrarian: string, meaningOther: string},
  bookGenre: {value: string, type: string, meaningLibrarian: string, meaningOther: string},
  bookCount: {value: number, type: string, meaningLibrarian: number, meaningOther: string},
  bookInStock: {value: number, type: string, meaningLibrarian: number, meaningOther: string},
}

export interface IComment extends IObjectKeys {
  userKey: string,
  userName: string,
  userLastName: string,
  userComment: string,
  bookKey: string,
}

export interface BorrowBook extends IObjectKeys {
  libName: {value: string, type: string,  meaningLibrarian: string, meaningOther: string},
  libLastName: {value: string, type: string,  meaningLibrarian: string, meaningOther: string},
  studKey: {value: string, type: string,  meaningLibrarian: string, meaningOther: string},
  studName: {value: string, type: string,  meaningLibrarian: string, meaningOther: string},
  studLastName: {value: string, type: string,  meaningLibrarian: string, meaningOther: string},
  bookKey: {value: string, type: string,  meaningLibrarian: string, meaningOther: string},
  bookName: {value: string, type: string,  meaningLibrarian: string, meaningOther: string},
  bookAuthor: {value: string, type: string,  meaningLibrarian: string, meaningOther: string},
  borrowBookDate: {value: string, type: string,  meaningLibrarian: string, meaningOther: string},
  returnBookDate: {value: string, type: string,  meaningLibrarian: string, meaningOther: string},
  returnBookCheck: {value: boolean, type: boolean,  meaningLibrarian: boolean, meaningOther: string, disableCheck?: boolean},
}

