import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../interfaces/user.interface";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.less']
})
export class AuthComponent implements OnInit {

  constructor(private _service: AuthService, private router: Router) {}

  authUser: any;
  userPassInvalid: boolean = false;
  userAuthInvalid: boolean = false;


  ngOnInit(): void {
  }

  authForm: FormGroup = new FormGroup({
    "userLogin": new FormControl("", [Validators.required, Validators.pattern('^(stud[0-9]{4})$|^(libr[0-9]{4})$')]),
    "userPass": new FormControl("", [Validators.required, Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=(.*[a-zA-Z]){4}).{6,30}$')]),
  });


  submitAuth() {
    // this._service.getAuth(this.authForm.value.userLogin, this.authForm.value.userPass);




    this._service.getAuth(this.authForm.value.userLogin)
      .subscribe((item: User[]) => {
          if (item.length === 0 || item.length > 1) { // Гооврим, что такого пользователя нету.
            this.userAuthInvalid = true;
            this.userPassInvalid = false;
            this.authForm.reset();
          } else {
            if (item[0].userPass['value'] !== this.authForm.value.userPass) { // Говорим, что неправильный пароль
              this.userAuthInvalid = false;
              this.userPassInvalid = true;
              this.authForm.controls['userPass'].reset();
            } else {
              localStorage.setItem('authUser', JSON.stringify(item));
              this.router.navigate([`/${item[0].userFlag['value']}`]);
            }
          }
        }
      )
  }


}
