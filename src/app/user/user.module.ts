import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserMainComponent} from "./user-main/user-main.component";
import {DirectiveModule} from "../directives/directive.module";
import {RouterModule} from "@angular/router";
import { UserBookComponent } from './user-book/user-book.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TableModule} from "../table/table/table.module";
import {ScrollingModule} from "@angular/cdk/scrolling";
import { UserStudComponent } from './user-stud/user-stud.component';
import {NgxMaskModule} from "ngx-mask";
import {UserBorrowbookComponent} from "./user-borrowbook/borrowbook.component";




@NgModule({
  declarations: [UserMainComponent, UserBookComponent, UserStudComponent, UserBorrowbookComponent],
  exports: [UserMainComponent],
  imports: [
    CommonModule,
    DirectiveModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    TableModule,
    ScrollingModule,
  ]
})
export class UserModule { }
