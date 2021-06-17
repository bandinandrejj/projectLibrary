import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LibrarianMainComponent} from "./librarian-main/librarian-main.component";
import {LibrarianBookComponent} from "./librarian-book/librarian-book.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {LibrarianBorrowbookComponent} from './librarian-borrowbook/librarian-borrowbook.component';
import {LibrarianDashboardComponent} from './librarian-dashboard/librarian-dashboard.component';
import {ScrollingModule} from "@angular/cdk/scrolling";
import {NgxMaskModule} from 'ngx-mask'
import {GenModule} from "../general/gen.module";
import {LibrarianStudComponent} from "./librarian-stud/librarian-stud.component";
import {TableComponent} from "../general/table/table.component";
import {NgxPaginationModule} from "ngx-pagination";


@NgModule({
  declarations: [
    LibrarianMainComponent,
    LibrarianBookComponent,
    LibrarianStudComponent,
    LibrarianBorrowbookComponent,
    LibrarianDashboardComponent,
  ],
    exports: [
        LibrarianMainComponent,
        LibrarianBookComponent,
        LibrarianStudComponent,
        LibrarianBorrowbookComponent,
        LibrarianDashboardComponent,
    ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ScrollingModule,
    NgxPaginationModule,
    NgxMaskModule.forRoot(),
    GenModule,
    FormsModule,
  ]
})
export class LibModule {
}
