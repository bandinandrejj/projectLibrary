import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PageNotFoundComponent} from "./page-not-found.component";
import {RoutingModule} from "../routing/routing/routing.module";




@NgModule({
  declarations: [PageNotFoundComponent],
  exports: [PageNotFoundComponent],
  imports: [
    CommonModule,
    RoutingModule,
  ]
})
export class PageNotFoundModule { }
