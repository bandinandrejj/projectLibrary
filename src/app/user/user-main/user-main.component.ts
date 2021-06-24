import {AfterViewChecked, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {menuList} from "../../interfaces/menuList.interface";
import {User} from "../../interfaces/user.interface";
import {libMenuList} from "../userMenuList/libMenu";
import {studMenuList} from "../userMenuList/studMenu";

@Component({
  selector: 'app-user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.less']
})
export class UserMainComponent implements OnInit, AfterViewChecked {

// , AfterViewChecked

  userInfo: User = JSON.parse(localStorage.getItem('authUser') as string)[0];
  flagUser: string = this.activateRoute.snapshot.routeConfig?.path as string;

  hovering: boolean = false;
  item: string = '';
  title: string = '';
  items: menuList[] = [];
  thisUrl: string = this.route.url;

  constructor(private activateRoute: ActivatedRoute, private route: Router, private cdRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    if (this.flagUser === 'librarian') {
      this.items = libMenuList;
    } else {
      this.items = studMenuList;
    }
  }


  ngAfterViewChecked() {
    if (this.flagUser === 'librarian') {
      this.items = libMenuList;
    } else {
      this.items = studMenuList;
    }
    this.cdRef.detectChanges();
  }


  clickHref(href: string = '#') {
    window.location.href = '/librarian/books' + `${href}`
  }


  logout(flag: boolean = false) {
    if (flag) {
      localStorage.clear();
      this.route.navigate(['/home'])
    }

  }


  dynamicImg(img: string, route: string): string {
    if (this.route.url === `/librarian/${route}`) {
      return `${img}_actual`;
    }
    return img
  }

  btnNavigate(route: string) {
    return this.route.navigate([`./${route}`], {relativeTo: this.activateRoute})
  }


  dynamicSelec(route: string, title: string): boolean {
    if (this.route.url === `/librarian/${route}`) {
      this.title = title;
      return true
    } else {
      return false
    }
  }


}
