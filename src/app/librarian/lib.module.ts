import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LibrarianMainComponent} from "./librarian-main/librarian-main.component";
import {LibrHeadingTouchDirective} from "./libr-heading-touch.directive";
import {LibrarianStudComponent} from "./librarian-stud/librarian-stud.component";
import {LibrarianBookComponent} from "./librarian-book/librarian-book.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import { LibrTableTouchDirective } from './libr-table-touch.directive';
import { LibrarianBorrowbookComponent } from './librarian-borrowbook/librarian-borrowbook.component';
import { LibrarianDashboardComponent } from './librarian-dashboard/librarian-dashboard.component';
import {ScrollingModule} from "@angular/cdk/scrolling";

@NgModule({
  declarations: [
    LibrarianMainComponent,
    LibrHeadingTouchDirective,
    LibrarianStudComponent,
    LibrarianBookComponent,
    LibrTableTouchDirective,
    LibrarianBorrowbookComponent,
    LibrarianDashboardComponent,
  ],
  exports: [
    LibrarianMainComponent,
    LibrHeadingTouchDirective,
    LibrarianStudComponent,
    LibrarianBookComponent,
  ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        ScrollingModule,
    ]
})
export class LibModule { }
