import {Component, Input, OnInit, Output, EventEmitter, ChangeDetectorRef} from '@angular/core';
import {Router} from "@angular/router";
import {Book, BorrowBook} from "../../interfaces/book-and-other.interface";
import * as moment from 'moment';
import {HeadingInterface} from "../../interfaces/heading.interface";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less']
})
export class TableComponent implements OnInit {

  today: string = moment().format('YYYY-MM-DD');
  switchSort: boolean = true;

  @Input() headings: HeadingInterface[] = [];
  @Input() objectKeys: string[] = [];
  @Input() arrayObects: any = [];
  @Input() extraObects: any = [];


  @Input() popupComment: boolean = false;
  @Input() popupEdit: boolean = false;
  @Input() popupDelete: boolean = false;
  @Input() popupOpen: boolean = false;
  @Input() buttonSwitch: boolean = false;

  @Input() trNgClassBoolean!: (args: any) => boolean;

  @Output() object = new EventEmitter<any>();
  @Output() objectSwitch = new EventEmitter<any>();

  thisUrl: string = this._route.url;
  userFlag: string = JSON.parse(localStorage.getItem('authUser') as string)[0].userFlag.value;

  stateSwitch: boolean = false;


  p: number = 1; // Page


  constructor(private _route: Router, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
  }

  sendObject(object: object) {
    this.object.emit(object)
  }

  clickHref(href: string = '#') {
    return window.location.href = this.thisUrl + `${href}`
  }


  sendObjectSwitch(object: any) {
    this.objectSwitch.emit(object)
  }


  checkCount(value: BorrowBook): boolean {
    const book = this.extraObects.filter((items: Book) => items.key === value.bookKey.value)
    return value.returnBookCheck.value && book[0].bookInStock.value === 0;

  }


  checkInStockBook(object: Book): boolean { // Подумать над объединением
    if (Object.keys(object).includes('bookInStock')) {
      if (object.bookInStock.value <= 0) {
        return true
      }
    }
    return false
  }

  checkBorrowBookDate(object: BorrowBook) {
    if (Object.keys(object).includes('returnBookDate')) {
      if (object.returnBookDate.value < this.today) {
        return true;
      }
    }
    return false;
  }

  checkBorrowBookSwitch(object: BorrowBook) {
    if (Object.keys(object).includes('returnBookCheck')) {
      return object.returnBookCheck.value;
    }
    return false;
  }


  sortSwitch(headings: HeadingInterface) {

    if (headings.keySort === undefined) {
      this.switchSort = this.arrayObects
    } else {
      this.switchSort = !this.switchSort;
      this.switchSort ?
        this.arrayObects = this.arrayObects.sort((a: any, b: any) => a[headings.keySort as string]['value'] < b[headings.keySort as string]['value'] ? 1 : -1) :
        this.arrayObects = this.arrayObects.sort((a: any, b: any) => a[headings.keySort as string]['value'] > b[headings.keySort as string]['value'] ? 1 : -1);
    }


  }

}
