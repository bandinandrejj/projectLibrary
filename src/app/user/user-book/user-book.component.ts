import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {Book, IComment} from "../../interfaces/book-and-other.interface";
import {BookAndOtherService} from "../../services/book-and-other.service";
import {HeadingInterface} from "../../interfaces/heading.interface";

@Component({
  selector: 'app-user-book',
  templateUrl: './user-book.component.html',
  styleUrls: ['./user-book.component.less']
})
export class UserBookComponent implements OnInit {

  str: string = '';
  thisUrl: string = this._route.url;

  userFlag: string = JSON.parse(localStorage.getItem('authUser') as string)[0].userFlag.value;


  // ----- Книга ----
  viewBooks: Book[] = [];
  books: Book[] = [];
  touchBookObj: Book;


  constructor(private _route: Router, private _service: BookAndOtherService) {
  }

  ngOnInit(): void {

    this._service.debugHash(this.thisUrl);

    this._service.getAllBooks().subscribe(item => {
      this.viewBooks = item;
      this.books = this.viewBooks;
    })


  }

  headingsLib: HeadingInterface[] = [ // Заголовки для таблицы
    {value: 'Название', useSort: true, keySort: 'bookName'},
    {value: 'Автор', useSort: true, keySort: 'bookAuthor'},
    {value: 'Жанр', useSort: true, keySort: 'bookGenre'},
    {value: 'Кол-во', useSort: true, keySort: 'bookCount'},
    {value: 'В наличии', useSort: true, keySort: 'bookInStock'},
    {value: 'Комментарии', useSort: false},
    {value: 'Редактировать', useSort: false},
    {value: 'Удалить', useSort: false}]

  headingsStud: HeadingInterface[] = [ // Заголовки для таблицы
    {value: 'Название', useSort: true, keySort: 'bookName'},
    {value: 'Автор', useSort: true, keySort: 'bookAuthor'},
    {value: 'Жанр', useSort: true, keySort: 'bookGenre'},
    {value: 'Кол-во', useSort: true, keySort: 'bookCount'},
    {value: 'В наличии', useSort: true, keySort: 'bookInStock'},
    {value: 'Комментарии', useSort: false},
  ]

  // ---- Панель поиска ----
  findBook(str: string) {
    this.books = this.books.filter(item =>
      item.bookName.value.toUpperCase().includes(str.toUpperCase()) ||
      item.bookAuthor.value.toUpperCase().includes(str.toUpperCase()) ||
      item.bookGenre.value.toUpperCase().includes(str.toUpperCase())
    )
    if (this.books.length === 0 || str.length === 0) {
      this.books = this.viewBooks;
    }
  }

}
