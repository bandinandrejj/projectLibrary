import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {User} from "../../../interfaces/user.interface";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-popup-stud',
  templateUrl: './popup-stud.component.html',
  styleUrls: ['./popup-stud.component.less']
})
export class PopupStudComponent implements OnInit {


  checkLogin: boolean = false;
  viewStudents: User[] = [];
  @Input() students: User[] = [];
  thisUrl: string = this._route.url;
  fullNameUser: string = '';

  touchStudentObj: User | undefined;

  constructor(private _route: Router, private _service: UserService) {
  }


  ngOnInit(): void {
  }


  userForm: FormGroup = new FormGroup({

    userLogin: new FormGroup({
      "value": new FormControl("", [Validators.pattern('^(stud[0-9]{4})$'), this.checkUserValidator.bind(this), this.checkEmptinessInputValid]),
      "type": new FormControl(""),
      "meaningLibrarian": new FormControl(""),
    }),

    userPass: new FormGroup({
      "value": new FormControl(""),
      "type": new FormControl(""),
      "meaningLibrarian": new FormControl(""),
    }),
    userName: new FormGroup({
      "value": new FormControl("",),
      "type": new FormControl(""),
      "meaningLibrarian": new FormControl(""),
    }),

    userLastName: new FormGroup({
      "value": new FormControl("",),
      "type": new FormControl(""),
      "meaningLibrarian": new FormControl(""),
    }),

    userPhone: new FormGroup({
      "value": new FormControl("",),
      "type": new FormControl(""),
      "meaningLibrarian": new FormControl(""),
    }),

    userAdress: new FormGroup({
      "value": new FormControl("",),
      "type": new FormControl(""),
      "meaningLibrarian": new FormControl(""),
    }),

    userFlag: new FormGroup({
      "value": new FormControl("student",),
      "type": new FormControl(""),
      "meaningLibrarian": new FormControl("student"),
    }),

  });


  // ----Валидация----

  checkUserValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const stud = this.students.map(item => item.userLogin['value']);
    if (stud.includes(control.value)) {
      this.checkLogin = true;
      return {checkUserValidator: true}
    } else {
      this.checkLogin = false;
      return null
    }
  }

  checkEmptinessInputValid(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value === null) {
      return {checkEmptinessInputValid: true}
    } else {
      return null
    }
  }


  // ----Работа с формой----

  addUser() {
    this.userForm.reset({
      userLogin: {
        value: 'stud',
      },
      userPhone: {
        value: '+7',
      },
      userFlag: {
        value: 'student',
      },
    });
  }

  submitUserAdd() {
    this.userForm.patchValue({
      userName: this.userForm.controls['userName']['value'].value.trim(),
      userLastName: this.userForm.controls['userLastName']['value'].value.trim(),
    })
    this.userInForm();
    this._service.addUser(this.userForm.value)
    this.clickHref();
  }

  submitUserEdit() {


    this.userForm.patchValue({

      userLogin: {
        value: this.touchStudentObj?.userLogin.value
      },
      userName: {
        value: this.userForm.controls['userName']['value'].value.trim(),
      },
      userLastName: {
        value: this.userForm.controls['userLastName']['value'].value.trim(),
      },
      userAdress: {
        value: this.userForm.controls['userAdress']['value'].value === undefined ? '' : this.userForm.controls['userAdress']['value'].value
      }

    })
    this.userInForm();
    this.clickHref();
    this._service.updateUser(this.touchStudentObj?.key as string, this.userForm.value);
  }

  deleteUser() {
    this._service.deleteUser(this.touchStudentObj?.key as string)
  }

  // ----Работа с формой----

  // addUser() {
  //   this.userForm.reset({
  //     userLogin: {
  //       value: 'stud',
  //     },
  //     userPhone: {
  //       value: '+7',
  //     },
  //     userFlag: {
  //       value: 'student',
  //     },
  //   });
  // }


  @Input() set touchStudent(stud: User) {
    if (stud !== undefined) {
      this.touchStudentObj = stud;
      this.fullNameUser = `${stud.userName['value']} ${stud.userLastName['value']}`;
      this.userForm.patchValue({
        userLogin: {
          value: 'stud0000'
        },
        userPass: {
          value: stud.userPass['value']
        },
        userName: {
          value: stud.userName['value']
        },
        userLastName: {
          value: stud.userLastName['value']
        },
        userPhone: {
          value: stud.userPhone['value']
        },
        userAdress: {
          value: stud.userAdress['value']
        },
      });
      this.userInForm();
    }
  }

  placeholderForm(element: string) {
    this.userForm.controls[element].patchValue({
      value: this.userForm.controls[element]['value'].value,
      type: typeof this.userForm.controls[element]['value'].value,
      meaningLibrarian: this.userForm.controls[element]['value'].value,
    })
  }

  userInForm() {
    this.placeholderForm('userLogin');
    this.placeholderForm('userPass');
    this.placeholderForm('userName');
    this.placeholderForm('userLastName');
    this.placeholderForm('userPhone');
    this.placeholderForm('userAdress');
    this.placeholderForm('userFlag');
  }

  clickHref(href: string = '#') {
    return window.location.href = this.thisUrl + `${href}`
  }


}
