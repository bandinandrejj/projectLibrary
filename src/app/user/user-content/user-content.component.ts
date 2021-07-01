import {AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {User} from "../../interfaces/user.interface";
import {menuList} from "../../interfaces/menuList.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {libMenuList} from "../userMenuList/libMenu";
import {studMenuList} from "../userMenuList/studMenu";

@Component({
  selector: 'app-user-content',
  templateUrl: './user-content.component.html',
  styleUrls: ['./user-content.component.less']
})
export class UserContentComponent implements OnInit{

  constructor() {
  }

  @Input() title: string;

ngOnInit() {
  this.title = 'Книги в обороте';
}

}
