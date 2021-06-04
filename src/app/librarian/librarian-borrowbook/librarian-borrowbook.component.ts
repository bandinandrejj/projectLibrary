import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-librarian-borrowbook',
  templateUrl: './librarian-borrowbook.component.html',
  styleUrls: ['./librarian-borrowbook.component.css']
})
export class LibrarianBorrowbookComponent implements OnInit {

  thisUrl: string = this._route.url;
  str: string = '';

  constructor(private _route: Router) { }

  ngOnInit(): void {
  }

}
