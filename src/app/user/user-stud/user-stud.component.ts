import {Component, OnInit} from '@angular/core';
import {Book} from "../../interfaces/book-and-other.interface";
import {User} from "../../interfaces/user.interface";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {HeadingInterface} from "../../interfaces/heading.interface";

@Component({
  selector: 'app-user-stud',
  templateUrl: './user-stud.component.html',
  styleUrls: ['./user-stud.component.less']
})
export class UserStudComponent implements OnInit {
  constructor(private _route: Router, private _service: UserService) {}

  str: string = '';
  viewStudents: User[] = [];
  students: User[] = [];
  thisUrl: string = this._route.url;
  touchStudentObj: User;

  ngOnInit(): void {
    this._service.getAllStuds().subscribe(item => {
      this.viewStudents = item;
      this.students = this.viewStudents;
    })
  }


  headingsLib: HeadingInterface[] = [ // Заголовки для таблицы
    {value: 'Имя', useSort: true, keySort: 'userName'},
    {value: 'Фамилия', useSort: true, keySort: 'userLastName'},
    {value: 'Логин', useSort: true, keySort: 'userLogin'},
    {value: 'Пароль', useSort: true, keySort: 'userPass'},
    {value: 'Информация о читателе', useSort: false},
    {value: 'Редактировать', useSort: false},
    {value: 'Удалить', useSort: false}]

  findUser(str: string) {
    this.students = this.students.filter(item =>
      item.userName['value'].toUpperCase().includes(str.toUpperCase()) ||
      item.userLastName['value'].toUpperCase().includes(str.toUpperCase()) ||
      item.userLogin['value'].toUpperCase().includes(str.toUpperCase()) ||
      item.userPhone['value'].toUpperCase().includes(str.toUpperCase())
    )
    if (this.students.length === 0 || str.length === 0) {
      this.students = this.viewStudents;
    }

  }







}
