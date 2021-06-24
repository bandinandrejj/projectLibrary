import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";
import {map} from "rxjs/operators";
import {BorrowBook} from "../interfaces/book-and-other.interface";

@Injectable({
  providedIn: 'root'
})
export class BorrowbookService {

  constructor(private db: AngularFireDatabase) {}

  getAllBorrowBook() {
    return this.db.list('/borrowbook')
      .snapshotChanges().pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() as BorrowBook }))
        )
      );
  }

  addBorrowBook(data: object) {
    this.db.list('/borrowbook').push(data);
  }

  updateBorrowBook(key: string, data: object) {
    this.db.list('/borrowbook').update(key, data);
  }

  deleteBorrowBook(key: string) {
    this.db.list('/borrowbook').remove(key);
  }

}
