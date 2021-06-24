import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import {NgxPaginationModule} from "ngx-pagination";
import {DirectiveModule} from "../../directives/directive.module";



@NgModule({
  declarations: [
    TableComponent
  ],
  exports: [
    TableComponent
  ],
  imports: [
    DirectiveModule,
    CommonModule,
    NgxPaginationModule
  ]
})
export class TableModule { }
