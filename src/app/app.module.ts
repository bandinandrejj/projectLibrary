import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {AuthModule} from "./authorization/auth.module";
import {HttpClientModule} from "@angular/common/http";
import {environment} from "../environments/environment";
import {AngularFireModule} from "@angular/fire";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {FormsModule} from "@angular/forms";
import {LibModule} from "./librarian/lib.module";
import {AppRoutingModule} from "./app-routing.module";
import {StudModule} from "./student/stud.module";
import {GenModule} from "./general/gen.module";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {TableComponent} from "./general/table/table.component";



@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent,
    ],
    imports: [
        LibModule,
        StudModule,
        BrowserModule,
        AuthModule,
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        AppRoutingModule,
        FormsModule,
        GenModule,
    ],
    providers: [],
    exports: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
