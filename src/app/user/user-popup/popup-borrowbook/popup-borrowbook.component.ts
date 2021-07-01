import {
  Component,
  DoCheck,
  Input,
  OnInit, Output, EventEmitter
} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import * as moment from "moment";
import {Book, BorrowBook} from "../../../interfaces/book-and-other.interface";
import {User} from "../../../interfaces/user.interface";
import {Router} from "@angular/router";
import {BorrowbookService} from "../../../services/borrowbook.service";
import {BookAndOtherService} from "../../../services/book-and-other.service";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-popup-borrowbook',
  templateUrl: './popup-borrowbook.component.html',
  styleUrls: ['./popup-borrowbook.component.less']
})
export class PopupBorrowbookComponent implements OnInit, DoCheck {

  constructor(
    private _route: Router,
    private _borrowBookService: BorrowbookService,
    private _bookService: BookAndOtherService,
    private _userService: UserService,
  ) {
  }

  ngOnInit(): void {
    this._bookService.getAllBooks().subscribe(item => {
      this.books = item;
    })

    this._userService.getAllStuds().subscribe(item => {
      this.students = item;
    })
  }

  ngDoCheck() {
    this.checkUrl = this._route.url.includes('borrowbook')
  }


  books: Book[] = [];
  students: User[] = [];
  today: string = moment().format('YYYY-MM-DD');
  touchBorrowBookObj: BorrowBook;
  checkUrl: boolean;


  userID: string = JSON.parse(localStorage.getItem('authUser') as string)[0].key;
  userName: string = JSON.parse(localStorage.getItem('authUser') as string)[0].userName.value;
  userLastName: string = JSON.parse(localStorage.getItem('authUser') as string)[0].userLastName.value;

  borrowBookForm: FormGroup = new FormGroup({
    libName: new FormGroup({
      "value": new FormControl(""),
      "type": new FormControl(""),
      "meaningLibrarian": new FormControl(""),
      "meaningOther": new FormControl(""),
    }),
    libLastName: new FormGroup({
      "value": new FormControl(""),
      "type": new FormControl(""),
      "meaningLibrarian": new FormControl(""),
      "meaningOther": new FormControl(""),
    }),
    studKey: new FormGroup({
      "value": new FormControl("", Validators.required),
      "type": new FormControl(""),
      "meaningLibrarian": new FormControl(""),
      "meaningOther": new FormControl(""),
    }),
    studName: new FormGroup({
      "value": new FormControl(""),
      "type": new FormControl(""),
      "meaningLibrarian": new FormControl(""),
      "meaningOther": new FormControl(""),
    }),
    studLastName: new FormGroup({
      "value": new FormControl(""),
      "type": new FormControl(""),
      "meaningLibrarian": new FormControl(""),
      "meaningOther": new FormControl(""),
    }),
    bookKey: new FormGroup({
      "value": new FormControl("", Validators.required),
      "type": new FormControl(""),
      "meaningLibrarian": new FormControl(""),
      "meaningOther": new FormControl(""),
    }),
    bookName: new FormGroup({
      "value": new FormControl(""),
      "type": new FormControl(""),
      "meaningLibrarian": new FormControl(""),
      "meaningOther": new FormControl(""),
    }),
    bookAuthor: new FormGroup({
      "value": new FormControl(""),
      "type": new FormControl(""),
      "meaningLibrarian": new FormControl(""),
      "meaningOther": new FormControl(""),
    }),
    borrowBookDate: new FormGroup({
      "value": new FormControl("", Validators.required),
      "type": new FormControl(""),
      "meaningLibrarian": new FormControl(""),
      "meaningOther": new FormControl(""),
    }),
    returnBookDate: new FormGroup({
      "value": new FormControl("",
        [Validators.required, this.checkReturnBookDateValid.bind(this)]
      ),
      "type": new FormControl(""),
      "meaningLibrarian": new FormControl(""),
      "meaningOther": new FormControl(""),
    }),
    returnBookCheck: new FormGroup({
      "value": new FormControl(""),
      "type": new FormControl(""),
      "meaningLibrarian": new FormControl(""),
      "meaningOther": new FormControl(""),
    }),
  });


  // ---- Валидация ----
  checkReturnBookDateValid(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value > this.today) {
      return null
    } else {
      return {test: true}
    }
  }


  // ---- Работа с попапом ----
  addBorrowBook() {
    const countBook: Book[] = this.books.filter(item => item.key === this.borrowBookForm.controls['bookKey']['value'].value);
    const countStudent: User[] = this.students.filter(item => item.key === this.borrowBookForm.controls['studKey']['value'].value);

    this.borrowBookForm.patchValue({
      libKey: {value: this.userID},
      libName: {value: this.userName},
      libLastName: {value: this.userLastName},
      studName: {value: countStudent[0].userName.value},
      studLastName: {value: countStudent[0].userLastName.value},
      bookName: {value: countBook[0].bookName.value},
      bookAuthor: {value: countBook[0].bookAuthor.value},
      returnBookCheck: {value: false},
    });

    this.bookInForm();
    this._borrowBookService.addBorrowBook(this.borrowBookForm.value);
    this.switchForBook(this.borrowBookForm.controls['bookKey']['value'].value, -1);
    this.clickHref();
  }

  editBorrowBook() {
    this.bookInForm();
    this._borrowBookService.updateBorrowBook(this.touchBorrowBookObj.key as string, this.borrowBookForm.value);
    this.clickHref();
  }

  deleteBorrowBook() {
    if (!this.touchBorrowBookObj.returnBookCheck.value) { // Удаление, если человек не вернул книгу (true -> false)
      this.switchForBook(this.touchBorrowBookObj.bookKey.value, 1)
    } // Оставить или убрать ?

    this._borrowBookService.deleteBorrowBook(this.touchBorrowBookObj.key as string);
    this.clickHref();
  }


// ---- Функционал для попапом ----

  @Input() set touchBorrowBook(borrowBook: BorrowBook) {
    if (borrowBook !== undefined) {
      this.touchBorrowBookObj = borrowBook;
      this.borrowBookForm.patchValue({
        // --- lib ---
        libKey: {value: this.userID},
        libName: {value: this.userName},
        libLastName: {value: this.userLastName},
        // --- stud ---
        studKey: {value: borrowBook.studKey.value},
        studName: {value: borrowBook.studName.value},
        studLastName: {value: borrowBook.studLastName.value},
        // --- book ---
        bookKey: {value: borrowBook.bookKey.value},
        bookName: {value: borrowBook.bookName.value},
        bookAuthor: {value: borrowBook.bookAuthor.value},
        // --- date ---
        borrowBookDate: {value: borrowBook.borrowBookDate.value},
        returnBookDate: {value: borrowBook.returnBookDate.value},
        // --- switch ---
        returnBookCheck: {value: borrowBook.returnBookCheck.value},
      });
      this.bookInForm();
      this.stateClickEditOrDelete.emit(false);
    }
  }

  @Output() stateClickEditOrDelete = new EventEmitter<boolean>();


  @Output() stateClickAdd = new EventEmitter<boolean>();

  @Input() set checkClickAdd(stateClick: boolean) {
    if (stateClick) {
      this.borrowBookForm.reset({
        borrowBookDate: {value: this.today},
      });
      this.stateClickAdd.emit(false);
    }
  }



  clickHref() {
    const numBash = window.location.href.indexOf('#');
    window.location.href = window.location.href.slice(0, numBash + 1);
    // this.resetForm();
  }

  placeholderForm(element: string) {
    this.borrowBookForm.controls[element].patchValue({
      value: this.borrowBookForm.controls[element]['value'].value,
      type: typeof this.borrowBookForm.controls[element]['value'].value,
      meaningLibrarian: this.borrowBookForm.controls[element]['value'].value,
      meaningOther: this.borrowBookForm.controls[element]['value'].value,
    })
  }

  bookInForm() {
    this.placeholderForm('libName');
    this.placeholderForm('libLastName');
    this.placeholderForm('studKey');
    this.placeholderForm('studName');
    this.placeholderForm('studLastName');
    this.placeholderForm('bookKey');
    this.placeholderForm('bookName');
    this.placeholderForm('bookAuthor');

    this.borrowBookForm.controls['borrowBookDate'].patchValue({
      value: this.borrowBookForm.controls['borrowBookDate']['value'].value,
      type: typeof this.borrowBookForm.controls['borrowBookDate']['value'].value,
      meaningLibrarian: moment(this.borrowBookForm.controls['borrowBookDate']['value'].value,).format('DD.MM.YYYY'),
      meaningOther: moment(this.borrowBookForm.controls['borrowBookDate']['value'].value,).format('DD.MM.YYYY'),
    });

    this.borrowBookForm.controls['returnBookDate'].patchValue({
      value: this.borrowBookForm.controls['returnBookDate']['value'].value,
      type: typeof this.borrowBookForm.controls['returnBookDate']['value'].value,
      meaningLibrarian: moment(this.borrowBookForm.controls['returnBookDate']['value'].value,).format('DD.MM.YYYY'),
      meaningOther: moment(this.borrowBookForm.controls['returnBookDate']['value'].value,).format('DD.MM.YYYY'),
    });


    this.borrowBookForm.controls['returnBookCheck'].patchValue({
      value: this.borrowBookForm.controls['returnBookCheck']['value'].value,
      type: typeof this.borrowBookForm.controls['returnBookCheck']['value'].value,
      meaningLibrarian: this.borrowBookForm.controls['returnBookCheck']['value'].value,
      meaningOther: this.borrowBookForm.controls['returnBookCheck']['value'].value ? 'Вернул(а)' : 'Не вернул(а)',
    });

  }





  // Функции для switch
  @Input() set touchSwitch(stateSwitch: BorrowBook) {
    if (stateSwitch !== undefined) {
      if (!stateSwitch.returnBookCheck.value) { // false -> true
        this.switchForBook(stateSwitch.bookKey.value, 1) // Книгу добавили в общий счет количества
        this.switchStudBorrowBook(stateSwitch.key as string, true) // Студент книгу в библиотеку
      }

      if (stateSwitch.returnBookCheck.value) { // true -> false
        this.switchForBook(stateSwitch.bookKey.value, -1)
        this.switchStudBorrowBook(stateSwitch.key as string, false)
      }
    }
  }

  switchStudBorrowBook(key: string, value: boolean) {
    this._borrowBookService.updateBorrowBook(key, {
      returnBookCheck: {
        value: value,
        type: typeof value,
        meaningLibrarian: value,
        meaningOther: value ? 'Вернул(а)' : 'Не вернул(а)',
      }
    });
  }

  switchForBook(key: string, value: number) {
    const book = this.books.filter(item => item.key === key);
    this._bookService.updateBook(key, {
      bookInStock: {
        value: book[0].bookInStock.value + value,
        meaningLibrarian: book[0].bookInStock.value + value,
        meaningOther: book[0].bookInStock.value + value ? 'В наличии' : 'Отсутсвует',
      }
    });
  }


}
