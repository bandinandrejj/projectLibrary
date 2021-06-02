import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {AuthModule} from "./autorisation/auth.module";
import {HttpClientModule} from "@angular/common/http";
import {environment} from "../environments/environment";
import {AngularFireModule} from "@angular/fire";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {StudentMainComponent} from './student/student-main/student-main.component';
import {Routes, RouterModule} from '@angular/router';
import {AutorisationComponent} from "./autorisation/auth/autorisation.component";
import {LibrarianMainComponent} from './librarian/librarian-main/librarian-main.component';
import {StudGuard} from "./student/stud.guard";
import {LibrGuard} from "./librarian/libr.guard";
import {LibrHeadingTouchDirective} from './librarian/libr-heading-touch.directive';
import {LibrarianStudComponent} from './librarian/librarian-stud/librarian-stud.component';
import {FormsModule} from "@angular/forms";


const lib: Routes = [
  {path: '', redirectTo: 'students', pathMatch: 'full'},
  {path: 'students', component: LibrarianStudComponent},
]

const routes: Routes = [
  {path: '', component: AutorisationComponent},
  {path: 'home', redirectTo: '', component: AutorisationComponent},
  {path: 'student', component: StudentMainComponent, canActivate: [StudGuard]},
  {path: 'librarian', component: LibrarianMainComponent, canActivate: [LibrGuard], children: lib},
  {path: '**', redirectTo: '/'}
];


@NgModule({
  declarations: [
    AppComponent,
    StudentMainComponent,
    LibrarianMainComponent,
    LibrHeadingTouchDirective,
    LibrarianStudComponent,
  ],
  imports: [
    BrowserModule,
    AuthModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
