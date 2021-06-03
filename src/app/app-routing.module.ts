import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LibrarianStudComponent} from "./librarian/librarian-stud/librarian-stud.component";
import {LibrarianBookComponent} from "./librarian/librarian-book/librarian-book.component";
import {AutorisationComponent} from "./autorisation/auth/autorisation.component";
import {StudentMainComponent} from "./student/student-main/student-main.component";
import {StudGuard} from "./student/stud.guard";
import {LibrarianMainComponent} from "./librarian/librarian-main/librarian-main.component";
import {LibrGuard} from "./librarian/libr.guard";




const routes: Routes = [
  {path: '', component: AutorisationComponent},
  {path: 'home', redirectTo: '', component: AutorisationComponent},
  {path: 'student', component: StudentMainComponent, canActivate: [StudGuard]},
  {path: 'librarian', component: LibrarianMainComponent, canActivate: [LibrGuard], children: [
      {path: '', component: LibrarianStudComponent},
      {path: 'students', component: LibrarianStudComponent},
      {path: 'books', component: LibrarianBookComponent},
    ]
  },
  // {path: '**', redirectTo: '/'}
];




@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
