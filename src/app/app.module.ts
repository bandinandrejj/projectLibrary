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


const routes: Routes =[
  { path: '', component: AutorisationComponent},
  { path: 'student', component: StudentMainComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    StudentMainComponent
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
