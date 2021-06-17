import {Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Book, Comment} from "../../librarian/book.interface";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {StudService} from "../../services/stud.service";

@Component({
  selector: 'app-student-book',
  templateUrl: './student-book.component.html',
  styleUrls: ['./student-book.component.css']
})
export class StudentBookComponent implements OnInit {

  str: string = '';
  thisUrl: string = this._route.url;

  // ----- Книга ----

  viewBooks: Book[] = [];
  books: Book[] = [];
  bookName: string = '';
  booAuthor: string = '';

  // ----- Комментарий ----

  viewComments: Comment[] = [];
  comments: Comment[] = [];
  keyComment: string = ''
  addEditSwitch: boolean = true;

  touchBookObj: Book = {
    bookKey: '',
    bookName: '',
    bookAuthor: '',
    bookGenre: '',
    bookCount: 0,
    bookInStock: 0,
  };



  userKey: string = JSON.parse(localStorage.getItem('authUser') as string)[0].key;
  userName: string = JSON.parse(localStorage.getItem('authUser') as string)[0].userName;
  userLastName: string = JSON.parse(localStorage.getItem('authUser') as string)[0].userLastName;


  constructor(private _route: Router, private _service: StudService) {}

  ngOnInit(): void {
    this._service.debugHash(this.thisUrl);

    this._service.getAllBooks().subscribe(item => {
      this.viewBooks = item;
      this.books = this.viewBooks;
    })

    this._service.getAllComments().subscribe(item => {
      this.viewComments = item;
      this.comments = this.viewComments;
    })
  }


  bookCommentForm: FormGroup = new FormGroup({
    "userKey": new FormControl(this.userKey, Validators.required),
    "userName": new FormControl(this.userName, Validators.required),
    "userLastName": new FormControl(this.userLastName, Validators.required),
    "userComment": new FormControl("", [Validators.required, this.checkEmptinessInputValid]),
    "bookKey": new FormControl(""),
  })


  findBook(str: string) {
    this.books = this.books.filter(item =>
      item.bookName.toUpperCase().includes(str.toUpperCase()) ||
      item.bookAuthor.toUpperCase().includes(str.toUpperCase()) ||
      item.bookGenre.toUpperCase().includes(str.toUpperCase())
    )
    if (this.books.length === 0 || str.length === 0) {
      this.books = this.viewBooks;
    }
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
      return {thisBookAlreadyList: true}
    } else {
      return null
    }
  }


  // ----Работа с формой комментариев----
  checkCount = (item: Book): boolean => {
    return false
  }

  submitComentAdd() {
    this.bookCommentForm.patchValue({
      bookKey: this.touchBookObj.key
    })

    this._service.addComment(this.bookCommentForm.value)
    this.clearCooment()
  } // Добавляем комментарий

  buttonDelete(comment: Comment) {
    this._service.deleteComment(comment.key as string)
  } // Удаляем комментарий

  commentEdit(comment: Comment) {
    this.addEditSwitch = false; // Переключаем  PopUp на редактирование.
    this.keyComment = comment.key as string;
    this.bookCommentForm.patchValue({
      bookKey: comment.bookKey,
      userComment: comment.userComment
    })
  } // Немного редактируем форму перед изменением

  submitComentEdit() {

    this._service.updateComment(this.keyComment, this.bookCommentForm.value)
    this.clearCooment()
    this.addEditSwitch = !this.addEditSwitch;

  } // Изменяем комментарий

  clearCooment() {
    this.bookCommentForm.patchValue({
      userComment: '',
    })
  } // Очищаем комментарий


  touchBook(book: Book) {
    this.touchBookObj = book;
  }

}
