import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LibService} from "../../services/lib.service";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {Book, BorrowBook} from "../book.interface";
import {authStudent} from "../../authorization/student.interface";
import * as moment from 'moment';


@Component({
  selector: 'app-librarian-borrowbook',
  templateUrl: './librarian-borrowbook.component.html',
  styleUrls: ['./librarian-borrowbook.component.css']
})
export class LibrarianBorrowbookComponent implements OnInit {

  thisUrl: string = this._route.url;
  strSearch: string = '';
  borrowbookKey: string = '';
  today: string = moment().format('YYYY-MM-DD');


  touchBorrowBookObj: BorrowBook = {
    borrowBookKey: '',
    libKey: '',
    libName: '',
    libLastName: '',
    studKey: '',
    studName: '',
    studLastName: '',
    bookKey: '',
    bookName: '',
    bookAuthor: '',
    borrowBookDate: '',
    returnBookDate: '',
    returnBookCheck: false,
  };

  // Получаем инфу из локалСтораге)
  libID: string = JSON.parse(localStorage.getItem('authUser') as string)[0].key;
  libName: string = JSON.parse(localStorage.getItem('authUser') as string)[0].userName;
  libLastName: string = JSON.parse(localStorage.getItem('authUser') as string)[0].userLastName;

  // Получаем инфу о книгах и студентах)
  books: Book[] = [];
  students: authStudent[] = [];
  borrowBooks: BorrowBook[] = [];
  viewBorrowBooks: BorrowBook[] = [];

  checkStock: boolean = true;

  constructor(private _route: Router, private _service: LibService) {
  }

  ngOnInit(): void {
    this._service.debugHash(this.thisUrl);

    this._service.getAllBooks().subscribe(item => {
      this.books = item;
    })

    this._service.getAllStuds().subscribe(item => {
      this.students = item;
    })

    this._service.getAllBorrowBook().subscribe(item => {
      this.viewBorrowBooks = item;
      this.borrowBooks = this.viewBorrowBooks.sort(item => item.returnBookCheck ? 1 : -1);
    })
  }

  borrowBookForm: FormGroup = new FormGroup({
    "libKey": new FormControl(""),
    "libName": new FormControl(""),
    "libLastName": new FormControl(""),
    "studKey": new FormControl("", Validators.required),
    "studName": new FormControl(""),
    "studLastName": new FormControl(""),
    "bookKey": new FormControl("", Validators.required),
    "bookName": new FormControl(""),
    "bookAuthor": new FormControl(""),
    "borrowBookDate": new FormControl("", Validators.required),
    "returnBookDate": new FormControl("", [Validators.required, this.checkReturnBookDateValid.bind(this)]),
    "returnBookCheck": new FormControl("")
  })


  clickHref(href: string = '#') {
    return window.location.href = this.thisUrl + `${href}`
  }


  checkReturnBookDateValid(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value > this.today) {
      return null
    } else {
      return {test: true}
    }
  }



  // ---- Работа с формой ----

  findBorrowBook(str: string) {
    this.borrowBooks = this.borrowBooks.filter(item =>
      item.studName.toUpperCase().includes(str.toUpperCase()) ||
      item.studLastName.toUpperCase().includes(str.toUpperCase()) ||
      item.bookName.toUpperCase().includes(str.toUpperCase()) ||
      item.bookAuthor.toUpperCase().includes(str.toUpperCase())
    )

    if (this.borrowBooks.length === 0 || str.length === 0) {
      this.borrowBooks = this.viewBorrowBooks;
    }
  }

  resetForm() {

    this.borrowBookForm.reset();
    this.borrowBookForm.patchValue({
      borrowBookDate: this.today
    })

  }

  AddBorrowBook() {
    const countBook: Book[] = this.books.filter(item => item.key === this.borrowBookForm.value.bookKey);
    const countStudent: authStudent[] = this.students.filter(item => item.key === this.borrowBookForm.value.studKey);
    this.borrowBookForm.patchValue({
      libKey: this.libID,
      libName: this.libName,
      libLastName: this.libLastName,
      studName: countStudent[0].userName,
      studLastName: countStudent[0].userLastName,
      bookName: countBook[0].bookName,
      bookAuthor: countBook[0].bookAuthor,
      returnBookCheck: false,
    })
    this._service.addBorrowBook(this.borrowBookForm.value);
    this._service.updateBook(this.borrowBookForm.value['bookKey'], {bookInStock: countBook[0].bookInStock - 1});
    this.clickHref();
  }


  DeleteBorrowBook() {
    this._service.deleteBorrowBook(this.touchBorrowBookObj.key as string);
    this.clickHref();
  }

  EditBorrowBook() {
    this._service.updateBorrowBook(this.touchBorrowBookObj.key as string, this.borrowBookForm.value)
    this.clickHref();
  }


  checkFn = (item: BorrowBook): boolean => { // Функция которая красит нужные строки, но нужно подумать о ней.
   return item.returnBookDate < this.today  && !item.returnBookCheck;
  }



  touchBorrowBook(borrowBook: BorrowBook) {
    this.touchBorrowBookObj = borrowBook;
    this.borrowBookForm.patchValue({
      libKey: this.touchBorrowBookObj.libKey,
      libLastName: this.touchBorrowBookObj.libLastName,
      libName: this.touchBorrowBookObj.libName,
      studKey: this.touchBorrowBookObj.studKey,
      studName: borrowBook.studName,
      studLastName: borrowBook.studLastName,
      bookKey: this.touchBorrowBookObj.bookKey,
      bookName: borrowBook.bookName,
      bookAuthor: borrowBook.bookAuthor,
      borrowBookDate: borrowBook.borrowBookDate,
      returnBookDate: borrowBook.returnBookDate,
      returnBookCheck: borrowBook.returnBookCheck,
    })
  }


  touchSwitch(newStateSwitch: BorrowBook) {
    const book = this.books.filter(item => item.key as string === newStateSwitch.bookKey)



    if (book[0].bookInStock === 0 && newStateSwitch.returnBookCheck === true) {
      this.checkStock = true;
    } else {

      newStateSwitch.returnBookCheck = !newStateSwitch.returnBookCheck
      this._service.updateBorrowBook(newStateSwitch.key as string, newStateSwitch);
      if (newStateSwitch.returnBookCheck) {
        this._service.updateBook(newStateSwitch.bookKey, {bookInStock: book[0].bookInStock + 1})
      } else {
        this._service.updateBook(newStateSwitch.bookKey, {bookInStock: book[0].bookInStock - 1})
      }

    }

  }




}
