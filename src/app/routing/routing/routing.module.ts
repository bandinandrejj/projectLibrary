import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AuthComponent} from "../../authorization/auth/auth.component";
import {UserMainComponent} from "../../user/user-main/user-main.component";
import {LibGuard} from "./guards/lib.guard";
import {StudGuard} from "./guards/stud.guard";
import {UserBookComponent} from "../../user/user-book/user-book.component";
import {UserStudComponent} from "../../user/user-stud/user-stud.component";
import {UserBorrowbookComponent} from "../../user/user-borrowbook/borrowbook.component";



const routes: Routes = [
  {path: '', component: AuthComponent},
  {path: 'home', redirectTo: '/'},
  {path: 'librarian', component: UserMainComponent, canActivate: [LibGuard], children: [
      {path: '', redirectTo: 'borrowbook', pathMatch: 'full'},
      {path: 'books', component: UserBookComponent},
      {path: 'students', component: UserStudComponent},
      {path: 'borrowbook', component: UserBorrowbookComponent},
    ]},
  {path: 'student', component: UserMainComponent,  canActivate: [StudGuard], children: [
      {path: '', redirectTo: 'borrowbook', pathMatch: 'full'},
      {path: 'books', component: UserBookComponent},
      {path: 'borrowbook', component: UserBorrowbookComponent},
    ]},
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
