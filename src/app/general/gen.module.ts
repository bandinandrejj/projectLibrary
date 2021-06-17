import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeadingTouchDirective} from "./heading-touch.directive";
import {LibrarianStudComponent} from "../librarian/librarian-stud/librarian-stud.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ScrollingModule} from "@angular/cdk/scrolling";
import {NgxMaskModule} from "ngx-mask";
import {RouterModule} from "@angular/router";
import {TableTouchDirective} from "./table-touch.directive";
import {TableComponent} from "./table/table.component";
import {NgxPaginationModule} from "ngx-pagination";



@NgModule({
  declarations: [
    HeadingTouchDirective,
    TableTouchDirective,
    TableComponent,
  ],
  exports: [
    HeadingTouchDirective,
    TableTouchDirective,
    TableComponent,
  ],
    imports: [
      CommonModule,
      NgxPaginationModule,
    ]
})
export class GenModule { }
