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
import { UserMenuComponent } from './user-menu/user-menu.component';
import { UserContentComponent } from './user-content/user-content.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { PopupBorrowbookComponent } from './user-popup/popup-borrowbook/popup-borrowbook.component';
import { PopupBookComponent } from './user-popup/popup-book/popup-book.component';
import { PopupStudComponent } from './user-popup/popup-stud/popup-stud.component';




@NgModule({
  declarations: [UserMainComponent, UserBookComponent, UserStudComponent, UserBorrowbookComponent, UserMenuComponent, UserContentComponent, UserDashboardComponent, PopupBorrowbookComponent, PopupBookComponent, PopupStudComponent],
  exports: [UserMainComponent],
    imports: [
        CommonModule,
      BrowserAnimationsModule,
        DirectiveModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        NgxMaskModule.forRoot(),
        TableModule,
        ScrollingModule,
        NgxChartsModule,
    ]
})
export class UserModule { }
