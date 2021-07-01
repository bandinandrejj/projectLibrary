import {Component, OnInit} from '@angular/core';
import {BorrowbookService} from "../../services/borrowbook.service";
import {Book, BorrowBook} from "../../interfaces/book-and-other.interface";
import {BookAndOtherService} from "../../services/book-and-other.service";

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.less']
})
export class UserDashboardComponent implements OnInit {

  books: {name: string, value: number}[] = [];


  constructor(private _bookService: BookAndOtherService) {
  }

  ngOnInit() {
    this._bookService.getAllBooks().subscribe(item => {
      this.books = item.map(item => ({
        name: `${item.bookName.value} (${item.bookAuthor.value})`,
        value: (1 - (item.bookInStock.value / item.bookCount.value)) * 100,
      }))
      this.books.sort((a,b) => a.value < b.value ? 1 : -1);
      this.books = this.books.slice(0,10)
    })


  }

}
