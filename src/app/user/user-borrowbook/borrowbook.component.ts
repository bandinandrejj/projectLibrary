import {Component, DoCheck, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {BookAndOtherService} from "../../services/book-and-other.service";
import {Book, BorrowBook} from "../../interfaces/book-and-other.interface";
import {UserService} from "../../services/user.service";
import {BorrowbookService} from "../../services/borrowbook.service";
import {HeadingInterface} from "../../interfaces/heading.interface";

@Component({
  selector: 'app-borrowbook',
  templateUrl: './borrowbook.component.html',
  styleUrls: ['./borrowbook.component.less']
})
export class UserBorrowbookComponent implements OnInit {

  constructor(private _route: Router,
              private _bookService: BookAndOtherService,
              private _userService: UserService,
              private _borrowBookService: BorrowbookService
  ) {
  }


  thisUrl: string = this._route.url;
  strSearch: string = '';



  // Получаем инфу из локалСтораге)
  userID: string = JSON.parse(localStorage.getItem('authUser') as string)[0].key;
  userName: string = JSON.parse(localStorage.getItem('authUser') as string)[0].userName.value;
  userLastName: string = JSON.parse(localStorage.getItem('authUser') as string)[0].userLastName.value;
  userFlag: string = JSON.parse(localStorage.getItem('authUser') as string)[0].userFlag.value;

  // Получаем инфу о книгах и студентах)
  books: Book[] = [];
  borrowBooks: BorrowBook[] = [];
  borrowBooksStud: BorrowBook[] = [];
  viewBorrowBooks: BorrowBook[] = [];

  touchBorrowBookObj: BorrowBook;
  touchSwitchObj: BorrowBook;

  addBorrowBook: boolean;


  ngOnInit(): void {
     this._bookService.getAllBooks().subscribe(item => {
      this.books = item;
    })

    this._borrowBookService.getAllBorrowBook().subscribe(item => {
      this.viewBorrowBooks = item;
      this.borrowBooksStud = item.filter(item => item.studKey.value  === this.userID);
      this.borrowBooks = this.viewBorrowBooks.sort(item => item.returnBookCheck.value ? 1 : -1);
    })
  }




  headingsLib: HeadingInterface[] = [ // Заголовки для таблицы
    {value: 'Фамилия', useSort: true, keySort: 'studLastName'},
    {value: 'Имя', useSort: true, keySort: 'studName'},
    {value: 'Название книги', useSort: true, keySort: 'bookName'},
    {value: 'Автор', useSort: true, keySort: 'bookAuthor'},
    {value: 'Дата взятия', useSort: true, keySort: 'borrowBookDate'},
    {value: 'Дата (ожидаемого) возврата', useSort: true, keySort: 'returnBookDate'},
    {value: 'Редактировать', useSort: false},
    {value: 'Удалить', useSort: false},
    {value: 'Возврат', useSort: true, keySort: 'returnBookCheck'}
  ]

  headingsStud: HeadingInterface[] = [ // Заголовки для таблицы
    {value: 'Название книги', useSort: true, keySort: 'bookName'},
    {value: 'Автор', useSort: true, keySort: 'bookAuthor'},
    {value: 'Дата взятия', useSort: true, keySort: 'borrowBookDate'},
    {value: 'Дата (ожидаемого) возврата', useSort: true, keySort: 'returnBookDate'},
    {value: 'Возврат', useSort: true, keySort: 'returnBookCheck'}
  ]




  findBorrowBook(str: string) {
    this.borrowBooks = this.borrowBooks.filter(item =>
      item.studName.value.toUpperCase().includes(str.toUpperCase()) ||
      item.studLastName.value.toUpperCase().includes(str.toUpperCase()) ||
      item.bookName.value.toUpperCase().includes(str.toUpperCase()) ||
      item.bookAuthor.value.toUpperCase().includes(str.toUpperCase()) ||
      item.borrowBookDate.meaningOther.toUpperCase().includes(str.toUpperCase()) ||
      item.returnBookDate.meaningOther.toUpperCase().includes(str.toUpperCase()) ||
      item.returnBookCheck.meaningOther.toUpperCase().includes(str.toUpperCase())
    )

    if (this.borrowBooks.length === 0 || str.length === 0) {
      this.borrowBooks = this.viewBorrowBooks;
    }
  }





}
