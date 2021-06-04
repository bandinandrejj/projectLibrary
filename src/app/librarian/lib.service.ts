import { Injectable } from '@angular/core';
import {map} from "rxjs/operators";
import {authStudent} from "../autorisation/student.interface";
import {AngularFireDatabase} from "@angular/fire/database";
import {Book} from "./book.interface";

@Injectable({
  providedIn: 'root'
})
export class LibService {

  constructor(private db: AngularFireDatabase) {}

  debugHash(thisUrl: string) {
    if (thisUrl.split('#').length > 1) {
      window.location.href = thisUrl.split('#')[0]
    }
  }

  // ----------- service users -----------

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
    this.db.list('/user').remove(key);
  }

  updateUser(key: string, data: object) {
     this.db.list('/user').update(key, data);
  }

  addUser(data: object) {
    this.db.list('/user').push(data);
  }

  // ----------- service books -----------

  getAllBooks() {
    return this.db.list('/book')
      .snapshotChanges().pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() as Book }))
        )
      );
  }

  addBook(data: object) {
    this.db.list('/book').push(data);
  }

  updateBook(key: string, data: object) {
    this.db.list('/book').update(key, data);
  }

  deleteBook(key: string) {
    this.db.list('/book').remove(key);
  }

}


