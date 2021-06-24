import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {AuthModule} from "./authorization/auth/auth.module";
import {environment} from "../environments/environment";
import {AngularFireModule} from "@angular/fire";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {RoutingModule} from "./routing/routing/routing.module";
import { UserMainComponent } from './user/user-main/user-main.component';
import {UserModule} from "./user/user.module";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,

    AuthModule,
    UserModule,
    RoutingModule,


    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
