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
  repeatBook: boolean = false
  bookName: string = '';

  userKey: string = JSON.parse(localStorage.getItem('authUser') as string)[0].key;
  userName: string = JSON.parse(localStorage.getItem('authUser') as string)[0].userName.value;
  userLastName: string = JSON.parse(localStorage.getItem('authUser') as string)[0].userLastName.value;
  userFlag: string = JSON.parse(localStorage.getItem('authUser') as string)[0].userFlag.value;


  // ----- Книга ----
  viewBooks: Book[] = [];
  books: Book[] = [];
  touchBookObj: Book | undefined;

  // ---- Комментарии ----
  viewComments: IComment[] = [];
  comments: IComment[] = [];
  addEditSwitch: boolean = true;
  keyComment: string = '';


  constructor(private _route: Router, private _service: BookAndOtherService) {
  }

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


  bookForm: FormGroup = new FormGroup({
    bookName: new FormGroup({
      "value": new FormControl("", [this.checkEmptinessInputValid]),
      "type": new FormControl(""),
      "meaningLibrarian": new FormControl(""),
      "meaningOther": new FormControl(""),
    }),
    bookAuthor: new FormGroup({
      "value": new FormControl("", this.checkEmptinessInputValid),
      "type": new FormControl(""),
      "meaningLibrarian": new FormControl(""),
      "meaningOther": new FormControl(""),
    }),
    bookGenre: new FormGroup({
      "value": new FormControl("", this.checkEmptinessInputValid),
      "type": new FormControl(""),
      "meaningLibrarian": new FormControl(""),
      "meaningOther": new FormControl(""),
    }),
    bookCount: new FormGroup({
      "value": new FormControl("", this.checkEmptinessInputValid),
      "type": new FormControl(""),
      "meaningLibrarian": new FormControl(""),
      "meaningOther": new FormControl(""),
    }),
    bookInStock: new FormGroup({
      "value": new FormControl(""),
      "type": new FormControl(""),
      "meaningLibrarian": new FormControl(""),
      "meaningOther": new FormControl(""),
    }),
  }, {validators: this.checkBooksValidator.bind(this)})

  bookCommentForm: FormGroup = new FormGroup({
    "userKey": new FormControl(this.userKey, Validators.required),
    "userName": new FormControl(this.userName, Validators.required),
    "userLastName": new FormControl(this.userLastName, Validators.required),
    "userComment": new FormControl("", [Validators.required, this.checkEmptinessInputValid]),
    "bookKey": new FormControl(""),
  })

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



  // ----Валидация----
  checkEmptinessInputValid(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value === null || control.value === '') {
      return {test: true}
    } else {
      return null
    }
  }

  checkBooksValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const books = this.books.map(item => `${item.bookAuthor.value}${item.bookName.value}`.split(' ').join(''));
    let book = `${control.value.bookAuthor['value']}${control.value.bookName['value']}`;
    book = book.split('\t').join('').split(' ').join('')

    if (books.includes(book)) {
      this.repeatBook = true;
      return {thisBookAlreadyList: true}
    } else {
      this.repeatBook = false;
      return null
    }
  }


  // ---- Панель поиска и добавлеиня ----


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


  clickHref(href: string = '#') {
    return window.location.href = this.thisUrl + `${href}`
  }


  // Работаем с формой

  addBook() {
    this.bookForm.reset({
      bookCount: {
        value: 1
      }
    });
  }

  submitBookAdd() {

    this.bookForm.patchValue({
      bookInStock: {
        value: this.bookForm.controls['bookCount']['value'].value
      }
    })

    this.bookInForm()
    this._service.addBook(this.bookForm.value)
    this.clickHref();
  }

  submitBookEdit() {

    this.bookForm.patchValue({
      bookName: {
        value: this.bookName,
      }
    });

    this.bookInForm()


    this._service.updateBook(this.touchBookObj?.key as string, this.bookForm.value)
    this.clickHref();
  }

  submitBookDelete() {
    this._service.deleteBook(this.touchBookObj?.key as string);
    this.clickHref();
  }


  // ----Работа с формой комментариев----
  submitComentAdd() {
    this.bookCommentForm.patchValue({
        bookKey: this.touchBookObj?.key,
      }
    );
    this._service.addComment(this.bookCommentForm.value)
    this.clearCooment()
  } // Добавляем комментарий

  buttonDelete(comment: IComment) {
    this._service.deleteComment(comment.key as string)
  } // Удаляем комментарий

  commentEdit(comment: IComment) {
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
  }


  // Заполнение формы.

  touchBook(book: Book) {
    this.touchBookObj = book;
    this.bookName = book.bookName.value;
    this.bookForm.patchValue({
      bookName: {
        value: 'X'
      },
      bookAuthor: {
        value: book.bookAuthor.value
      },
      bookGenre: {
        value: book.bookGenre.value
      },
      bookCount: {
        value: book.bookCount.value
      },
      bookInStock: {
        value: book.bookInStock.value
      }
    });
    this.bookInForm();
  }

  placeholderForm(element: string) {
    this.bookForm.controls[element].patchValue({
      value: this.bookForm.controls[element]['value'].value,
      type: typeof this.bookForm.controls[element]['value'].value,
      meaningLibrarian: this.bookForm.controls[element]['value'].value,
      meaningOther: this.bookForm.controls[element]['value'].value,
    })
  }

  bookInForm() {
    this.placeholderForm('bookName');
    this.placeholderForm('bookAuthor');
    this.placeholderForm('bookGenre');
    this.placeholderForm('bookCount');
    this.bookForm.controls['bookInStock'].patchValue({
      value: this.bookForm.controls['bookInStock']['value'].value,
      type: typeof this.bookForm.controls['bookInStock']['value'].value,
      meaningLibrarian: this.bookForm.controls['bookInStock']['value'].value,
      meaningOther: this.bookForm.controls['bookInStock']['value'].value > 0 ? 'Есть в налчии' : 'Отсутсвует',
    })
  }

  // Проверка для таблицы

  // checkCount = (item: Book): boolean => {
  //   return item.bookInStock <= 0
  // }


}
