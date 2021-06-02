import { Injectable } from '@angular/core';
import {map} from "rxjs/operators";
import {authStudent} from "../autorisation/student.interface";
import {AngularFireDatabase} from "@angular/fire/database";

@Injectable({
  providedIn: 'root'
})
export class LibService {

  constructor(private db: AngularFireDatabase) {}

  getAllStuds() {
    return this.db.list('/user', ref => ref.orderByChild('userFlag')
      .equalTo('student'))
      .snapshotChanges().pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() as authStudent }))
        )
      );
  }

  deleteUser(key: string) {
    return this.db.list('/user').remove(key);
  }

}


