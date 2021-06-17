import {Component, OnInit} from '@angular/core';
import {LibService} from "../../services/lib.service";
import {map} from "rxjs/operators";
import * as moment from 'moment';
import {Book, BorrowBook} from "../book.interface";

@Component({
  selector: 'app-librarian-dashboard',
  templateUrl: './librarian-dashboard.component.html',
  styleUrls: ['./librarian-dashboard.component.css']
})
export class LibrarianDashboardComponent implements OnInit {

  constructor(private _service: LibService) { }


  // today: string = moment().format('YYYY-MM-DD');
  // students: BorrowBook[] = []
  // books: Book[] = [];
  // booksTop3: {name: string, value: number}[] = [];


  ngOnInit(): void {}

  //   this._service.getAllBorrowBook()
  //     .pipe(map(items => items.filter(item => item.returnBookDate < this.today)))
  //     .subscribe(item => this.students = item)
  //
  //   this._service.getAllBooks()
  //     .pipe(map(items => items.filter(item => item.bookInStock === 0)))
  //     .subscribe(item => this.books = item)
  //
  //
  //   this._service.getAllBooks()
  //     .pipe(map(items => items.map(item => ({
  //         name: `${item.bookName} (${item.bookAuthor})`,
  //         value: 100 - item.bookInStock/item.bookCount,
  //       }))))
  //     .pipe(map(items => items.sort((a,b)=> b.value - a.value )))
  //     .pipe(map(items => items.slice(0,3)))
  //     .subscribe(item => {this.booksTop3 = item})
  // }


}
