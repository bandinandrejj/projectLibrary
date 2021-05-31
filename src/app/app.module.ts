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
import { LibrarianHeadComponent } from './librarian/librarian-head/librarian-head.component';



const routes: Routes =[
  { path: '', component: AutorisationComponent},
  { path: 'home', redirectTo: '', component: AutorisationComponent},
  { path: 'student', component: StudentMainComponent, canActivate: [StudGuard]},
  { path: 'librarian', component: LibrarianMainComponent, canActivate: [LibrGuard]},
  { path: '**', component: AutorisationComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    StudentMainComponent,
    LibrarianMainComponent,
    LibrarianHeadComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
