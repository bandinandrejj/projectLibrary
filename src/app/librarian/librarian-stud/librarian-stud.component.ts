import {Component, OnInit} from '@angular/core';
import {LibService} from "../lib.service";
import {authStudent} from "../../autorisation/student.interface";
import {Router} from "@angular/router";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";

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
  keyUser: string = '';
  fullNameUser: string = '';
  userLoginTitle: string = '';


  ngOnInit(): void {

    this._service.debugHash(this.thisUrl);

    this._service.getAllStuds().subscribe(item => {
      this.viewStudents = item;
      this.students = this.viewStudents;
    })

  }

  userForm: FormGroup = new FormGroup({
    "userLogin": new FormControl("", [Validators.pattern('^(stud[0-9]{4})$'), this.checkUserValidator.bind(this), this.checkEmptinessInputValid]),
    "userPass": new FormControl("", [Validators.required, Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=(.*[a-zA-Z]){4}).{6,30}$')]),
    "userName": new FormControl("", [Validators.required]),
    "userLastName": new FormControl("", [Validators.required]),
    "userFlag": new FormControl("student"),
  });


  checkUserValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const stud = this.students.map(item => item.userLogin);
    if (stud.includes(control.value)) {
      return {test: true}
    } else {
      return null
    }
  }


  checkEmptinessInputValid(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value === null) {
      return {test: true}
    } else {
      return null
    }
  }


  findUser(str: string) {
    // if (this.students.some((item, index) => item.userLastName[index] === str[index] || item.userName[index] === str[index] || `${item.userName} ${item.userLastName}` === str)) {
    //   console.log(this.students)
    //   this.students = this.students.filter((item, index) => item.userLastName[index] === str[index] || item.userName[index] === str[index] || `${item.userName} ${item.userLastName}` === str);
    // } else {
    //   this.students = this.viewStudents;
    // }

    if (this.students.some((item, index) => item.userLastName === str || item.userName === str || `${item.userName} ${item.userLastName}` === str)) {
      this.students = this.students.filter((item, index) => item.userLastName.includes(str) || item.userName.includes(str) || `${item.userName} ${item.userLastName}` === str);
    } else {
      this.students = this.viewStudents;
    }
  }


  addUser() {
    this.userForm.reset({
      userLogin: 'stud',
      userFlag: 'student'
    });
  }

  submitUserAdd() {
    this._service.addUser(this.userForm.value)
  }


  univUser(data: authStudent) {

    this.keyUser = data.key as string;
    this.fullNameUser = `${data.userName} ${data.userLastName}`
    this.userLoginTitle = data.userLogin;

    this.userForm.patchValue({
      // userLogin: data.userLogin,
      userName: data.userName,
      userLastName: data.userLastName,
      userPass: data.userPass,
      userFlag: data.userFlag,
    })
  }


  deleteUser() {
    this._service.deleteUser(this.keyUser)
  }

  submitUserEdit() {
    this._service.updateUser(this.keyUser, this.userForm.value);
  }


  clickHref(href: string = '#') {
    return window.location.href = this.thisUrl + `${href}`
  }
}
