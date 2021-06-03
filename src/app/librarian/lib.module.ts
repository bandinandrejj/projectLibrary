import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LibrarianMainComponent} from "./librarian-main/librarian-main.component";
import {LibrHeadingTouchDirective} from "./libr-heading-touch.directive";
import {LibrarianStudComponent} from "./librarian-stud/librarian-stud.component";
import {LibrarianBookComponent} from "./librarian-book/librarian-book.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import { LibrTableTouchDirective } from './libr-table-touch.directive';

@NgModule({
  declarations: [
    LibrarianMainComponent,
    LibrHeadingTouchDirective,
    LibrarianStudComponent,
    LibrarianBookComponent,
    LibrTableTouchDirective,
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
  ]
})
export class LibModule { }
