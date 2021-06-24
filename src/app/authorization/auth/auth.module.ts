import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthComponent} from "./auth.component";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [AuthComponent],
  exports:[AuthComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class AuthModule { }
