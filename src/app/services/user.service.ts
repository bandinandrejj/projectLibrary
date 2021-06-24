import { Injectable } from '@angular/core';
import {map} from "rxjs/operators";
import {AngularFireDatabase} from "@angular/fire/database";
import {User} from "../interfaces/user.interface";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) {}


  debugHash(thisUrl: string) {
    if (thisUrl.split('#').length > 1) {
      window.location.href = thisUrl.split('#')[0]
    }
  }

  // ----------- service users -----------

  getAllStuds() {
    return this.db.list('/user', ref => ref.orderByChild('userFlag/value')
      .equalTo('student'))
      .snapshotChanges().pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() as User }))
        )
      );
  }

  deleteUser(key: string) {
    this.db.list('/user').remove(key);
  }

  updateUser(key: string, data: object) {
    this.db.list('/user').update(key, data);
  }

  addUser(data: object) {
    this.db.list('/user').push(data);
  }
}
