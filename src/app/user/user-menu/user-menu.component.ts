import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
  Output,
  EventEmitter,
  AfterViewInit
} from '@angular/core';
import {User} from "../../interfaces/user.interface";
import {menuList} from "../../interfaces/menuList.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {libMenuList} from "../userMenuList/libMenu";
import {studMenuList} from "../userMenuList/studMenu";

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.less']
})
export class UserMenuComponent implements OnInit{




  userInfo: User = JSON.parse(localStorage.getItem('authUser') as string)[0];
  flagUser: string = this.activateRoute.snapshot.routeConfig?.path as string;

  hovering: boolean = false;
  item: string = '';
  @Output() title = new EventEmitter<string>();

  @Output() addBorrowBook = new EventEmitter<boolean>();


  items: menuList[] = [];

  constructor(private activateRoute: ActivatedRoute, private route: Router) {
  }

  ngOnInit(): void {
    if (this.flagUser === 'librarian') {
      this.items = libMenuList;
    } else {
      this.items = studMenuList;
    }
  }



  clickHref(href: string) {
    window.location.href = `${window.location.href}${href}`;
    this.addBorrowBook.emit(true);
  }


  logout(flag: boolean = false) {
    if (flag) {
      localStorage.clear();
      this.route.navigate(['/home'])
    }

  }


  dynamicImg(img: string, route: string): string {
    if (this.route.url === `/${this.flagUser}/${route}`) {
      return `${img}_actual`;
    }
    return img
  }

  btnNavigate(route: string) {
    return this.route.navigate([`./${route}`], {relativeTo: this.activateRoute})
  }


  dynamicSelec(route: string, title: string): boolean {
    if (this.route.url === `/${this.flagUser}/${route}`) {
      return true
    } else {
      return false
    }
  }


  sendTitle(title: string) {
    this.title.emit(title);
  }
}
