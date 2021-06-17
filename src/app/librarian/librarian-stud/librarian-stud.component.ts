import {Component, OnInit} from '@angular/core';
import {LibService} from "../../services/lib.service";
import {authStudent} from "../../authorization/student.interface";
import {Router} from "@angular/router";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {Book} from "../book.interface";

@Component({
  selector: 'app-librarian-stud',
  templateUrl: './librarian-stud.component.html',
  styleUrls: ['./librarian-stud.component.css']
})
export class LibrarianStudComponent implements OnInit {

  constructor(private _route: Router, private _service: LibService) {}

  str: string = '';
  viewStudents: authStudent[] = [];
  students: authStudent[] = [];
  thisUrl: string = this._route.url;
  fullNameUser: string = '';

  touchStudentObj: authStudent = { // Он просит инициализацию
    key: '',
    userLogin: '',
    userPass: '',
    userName: '',
    userLastName: '',
    userPhone: '',
    userAdress: '',
    userFlag: '',
  };

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
    "userName": new FormControl("", [Validators.required, Validators.maxLength(20)]),
    "userLastName": new FormControl("", [Validators.required, Validators.maxLength(20)]),
    "userPhone": new FormControl("", [Validators.required]),
    "userAdress": new FormControl(""),
    "userFlag": new FormControl("student",[Validators.required]),
  });

  findUser(str: string) {

    this.students = this.students.filter(item =>
      item.userName.toUpperCase().includes(str.toUpperCase()) ||
      item.userLastName.toUpperCase().includes(str.toUpperCase()) ||
      item.userLogin.toUpperCase().includes(str.toUpperCase()) ||
      item.userPhone.toUpperCase().includes(str.toUpperCase())
    )

    if (this.students.length === 0 || str.length === 0) {
      this.students = this.viewStudents;
    }

  }
  clickHref(href: string = '#') {
    return window.location.href = this.thisUrl + `${href}`
  }

  // ----Валидация----

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


  // ----Работа с формой----

  addUser() {
    this.userForm.reset({
      userLogin: 'stud',
      userPhone: '+7',
      userFlag: 'student'
    });
  }

  submitUserAdd() {
    this.userForm.patchValue({
      userName: this.userForm.value['userName'].trim(),
      userLastName: this.userForm.value['userLastName'].trim(),
    })

    this._service.addUser(this.userForm.value)
  }

  submitUserEdit() {
    this.userForm.patchValue({
      userLogin: this.touchStudentObj.userLogin,
      userName: this.userForm.value['userName'].trim(),
      userLastName: this.userForm.value['userLastName'].trim(),
      userAdress: this.userForm.value['userAdress'] === undefined ? '' : this.userForm.value['userAdress'],
    })

    this._service.updateUser(this.touchStudentObj.key as string, this.userForm.value);
  }

  deleteUser() {
    this._service.deleteUser(this.touchStudentObj.key as string)
  }



  checkFn = (item: Book): boolean => { // Функция которая красит нужные строки, но нужно подумать о ней.
    return false
  }


  touchStudent(stud: authStudent) {

    this.touchStudentObj = stud;
    this.fullNameUser = `${stud.userName} ${stud.userLastName}`;

    this.userForm.patchValue({
      userLogin: '',
      userPass: stud.userPass,
      userName: stud.userName,
      userLastName: stud.userLastName,
      userPhone: stud.userPhone,
      userAdress: stud.userAdress,
      userFlag: stud.userFlag,
    });

  }
}
