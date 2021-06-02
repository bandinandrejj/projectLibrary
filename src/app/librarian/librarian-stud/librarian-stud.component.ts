import {Component, OnInit, NgModule} from '@angular/core';
import {AuthService} from "../../autorisation/auth.service";
import {LibService} from "../lib.service";
import {authStudent} from "../../autorisation/student.interface";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-librarian-stud',
  templateUrl: './librarian-stud.component.html',
  styleUrls: ['./librarian-stud.component.css']
})
export class LibrarianStudComponent implements OnInit {

  constructor(private _route: Router, private _service: LibService) {
  }

  str: string = '';
  viewStudents: authStudent[] = [];
  students: authStudent[] = [];
  thisUrl: string = this._route.url;

  ngOnInit(): void {
    this._service.getAllStuds().subscribe(item => {
      this.viewStudents = item;
      this.students = this.viewStudents;
    })
  }

  editUser(key: string | null) {
    console.log(key)
  }

  findUser(str: string) {
    // if (this.students.some((item, index) => item.userLastName[index] === str[index] || item.userName[index] === str[index] || `${item.userName} ${item.userLastName}` === str)) {
    //   console.log(this.students)
    //   this.students = this.students.filter((item, index) => item.userLastName[index] === str[index] || item.userName[index] === str[index] || `${item.userName} ${item.userLastName}` === str);
    // } else {
    //   this.students = this.viewStudents;
    // }

    if (this.students.some((item, index) => item.userLastName === str || item.userName === str || `${item.userName} ${item.userLastName}` === str)) {
      console.log(this.students)
      this.students = this.students.filter((item, index) => item.userLastName.includes(str)  || item.userName.includes(str) || `${item.userName} ${item.userLastName}` === str);
    } else {
      this.students = this.viewStudents;
    }
  }

  deleteUser(key: string | null) {
    this._service.deleteUser(key as string)
  }

  addUser () {
    this._service.addUser();
  }
}
