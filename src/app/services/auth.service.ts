import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";
import {map} from "rxjs/operators";
import {User} from "../interfaces/user.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private db: AngularFireDatabase) { }

  getAuth(login: string) {
    return this.db.list('/user', ref => ref.orderByChild('userLogin/value')
      .equalTo(login))
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({key: c.payload.key, ...c.payload.val() as User}))
        )
      )
  }

}
