import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {LibService} from "../lib.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
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

  constructor(private _route: Router, private _service: LibService) { }

  ngOnInit(): void {
    this._service.debugHash(this.thisUrl);

    this._service.getAllBooks().subscribe(item => {
      this.viewBooks = item;
      this.books = this.viewBooks;
    })
  }


  bookForm: FormGroup = new FormGroup({
    "bookName": new FormControl("", [Validators.required]),
    "bookAuthor": new FormControl("", [Validators.required]),
    "bookGenre": new FormControl("", [Validators.required]),
    "bookCount": new FormControl("", [Validators.required]),
    "bookComment": new FormControl("BETA", ),
  })

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

  submitBookAdd() {
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

    this.bookForm.patchValue({
      bookName: book.bookName,
      bookAuthor: book.bookAuthor,
      bookGenre: book.bookGenre,
      bookCount: book.bookCount,
    })
  }

  submitBookEdit() {
    this._service.updateBook(this.keyBook, this.bookForm.value);
  }

  submitBookDel() {
    this._service.deleteBook(this.keyBook)
  }


}
