import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";
import {map} from "rxjs/operators";
import {Book, IComment} from "../interfaces/book-and-other.interface";

@Injectable({
  providedIn: 'root'
})
export class BookAndOtherService {

  constructor(private db: AngularFireDatabase) { }


  debugHash(thisUrl: string) {
    if (thisUrl.split('#').length > 1) {
      window.location.href = thisUrl.split('#')[0]
    }
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


  // ----------- service comment -----------

  getAllComments() {
    return this.db.list('/comment')
      .snapshotChanges().pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() as IComment }))
        )
      );
  }

  addComment(data: object) {
    this.db.list('/comment').push(data);
  }

  deleteComment(key: string) {
    this.db.list('/comment').remove(key);
  }

  updateComment(key: string, data: object) {
    this.db.list('/comment').update(key, data);
  }


}
