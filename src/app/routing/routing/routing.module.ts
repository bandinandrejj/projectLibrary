import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AuthComponent} from "../../authorization/auth/auth.component";
import {UserMainComponent} from "../../user/user-main/user-main.component";
import {LibGuard} from "./guards/lib.guard";
import {StudGuard} from "./guards/stud.guard";
import {UserBookComponent} from "../../user/user-book/user-book.component";
import {UserStudComponent} from "../../user/user-stud/user-stud.component";
import {UserBorrowbookComponent} from "../../user/user-borrowbook/borrowbook.component";
import {PageNotFoundComponent} from "../../page-not-found/page-not-found.component";
import {UserDashboardComponent} from "../../user/user-dashboard/user-dashboard.component";



const routes: Routes = [
  {path: 'home', component: AuthComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'librarian', component: UserMainComponent, canActivate: [LibGuard], children: [
      {path: '', redirectTo: 'borrowbook', pathMatch: 'full'},
      {path: 'books', component: UserBookComponent},
      {path: 'students', component: UserStudComponent},
      {path: 'borrowbook', component: UserBorrowbookComponent},
      {path: 'dashboard', component: UserDashboardComponent},
    ]},
  {path: 'student', component: UserMainComponent,  canActivate: [StudGuard], children: [
      {path: '', redirectTo: 'borrowbook', pathMatch: 'full'},
      {path: 'books', component: UserBookComponent},
      {path: 'borrowbook', component: UserBorrowbookComponent},
    ]},
  {path: '**', component: PageNotFoundComponent}

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
