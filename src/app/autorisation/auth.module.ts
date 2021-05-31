import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AutorisationComponent} from "./auth/autorisation.component";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";




@NgModule({
  declarations: [
    AutorisationComponent
  ],
  exports: [
    AutorisationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class AuthModule { }
