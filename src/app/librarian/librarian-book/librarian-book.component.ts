import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {LibService} from "../lib.service";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {Book} from "../book.interface";

@Component({
  selector: 'app-librarian-book',
  templateUrl: './librarian-book.component.html',
  styleUrls: ['./librarian-book.component.css']
})
export class LibrarianBookComponent implements OnInit {

  str: string = '';
  thisUrl: string = this._route.url;

  viewBooks: Book[] = [];
  books: Book[] = [];
  private keyBook: string = '';
   bookName: string = '';
   booAuthor: string = '';


  constructor(private _route: Router, private _service: LibService) { }

  ngOnInit(): void {
    this._service.debugHash(this.thisUrl);

    this._service.getAllBooks().subscribe(item => {
      this.viewBooks = item;
      this.books = this.viewBooks;
    })
  }


  bookForm: FormGroup = new FormGroup({
    "bookName": new FormControl("", this.checkEmptinessInputValid),
    "bookAuthor": new FormControl("", this.checkEmptinessInputValid),
    "bookGenre": new FormControl("", [Validators.required]),
    "bookCount": new FormControl("", [Validators.required]),
    "bookComment": new FormControl("BETA", ),
  }, {validators: this.checkBooksValidator.bind(this)})



  findBook(str: string) {
    if (this.books.some((item, index) => item.bookName === str || item.bookAuthor === str || item.bookGenre === str)) {
      this.books = this.books.filter((item, index) => item.bookName.includes(str) || item.bookAuthor.includes(str) || item.bookGenre.includes(str));
    } else {
      this.books = this.viewBooks;
    }
  }

  clickHref(href: string = '#') {
    return window.location.href = this.thisUrl + `${href}`
  }


  // ----Валидация----

  checkEmptinessInputValid(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value === null) {
      return {test: true}
    } else {
      return null
    }
  }

  checkBooksValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const books = this.books.map(item => `${item.bookAuthor}${item.bookName}`.split(' ').join(''));
    let book = `${control.value.bookAuthor}${control.value.bookName}`;
    book = book.split('\t').join('').split(' ').join('')

    if (books.includes(book)) {
      return {thisBookAlreadyList : true}
    } else {
      return null
    }
  }


  // ----Работа с формой----

  submitBookAdd() {
    this.bookForm.patchValue({
      bookName: this.bookForm.value['bookName'].trim(),
      bookAuthor: this.bookForm.value['bookAuthor'].trim(),
      })

    this._service.addBook(this.bookForm.value)
  }

  addBook() {
    this.bookForm.reset({
      bookComment: 'BETA',
      bookCount: '1'
    });
  }

  univBook(book: Book) {
    // console.log(book)

    this.keyBook = book.key as string;
    this.bookName = book.bookName;
    this.booAuthor = book.bookAuthor;

    this.bookForm.patchValue({
      bookName: '',
      bookAuthor: '',
      bookGenre: book.bookGenre,
      bookCount: book.bookCount,
    })
  }

  submitBookEdit() {
    this.bookForm.patchValue({
      bookName:  this.bookName,
      bookAuthor: this.booAuthor,
    })
    this._service.updateBook(this.keyBook, this.bookForm.value);
  }

  submitBookDel() {
    this._service.deleteBook(this.keyBook)
  }

}
