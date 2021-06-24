import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeadingTouchDirective } from './heading-touch.directive';
import { TableTouchDirective } from './table-touch.directive';



@NgModule({
  declarations: [
    HeadingTouchDirective,
    TableTouchDirective
  ],
  exports: [
    HeadingTouchDirective,
    TableTouchDirective,
  ],
  imports: [
    CommonModule
  ]
})
export class DirectiveModule { }
