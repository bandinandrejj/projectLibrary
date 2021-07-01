import {
  AfterContentChecked, AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component, DoCheck, EventEmitter,
  Input, OnChanges,
  OnInit, Output
} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {menuList} from "../../interfaces/menuList.interface";
import {User} from "../../interfaces/user.interface";
import {libMenuList} from "../userMenuList/libMenu";
import {studMenuList} from "../userMenuList/studMenu";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.less']
})
export class UserMainComponent implements OnInit{

  constructor(private _route: Router, private _service: UserService) {}

  thisUrl: string = this._route.url;
  @Input() title: string = '';
  userFlag: string = JSON.parse(localStorage.getItem('authUser') as string)[0].userFlag.value;

  addBorrowBook: boolean;

  ngOnInit() {
    this._service.debugHash(this.thisUrl);
  }




}
