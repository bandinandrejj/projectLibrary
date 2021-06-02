import { Component, OnInit } from '@angular/core';
import {authStudent} from "../../autorisation/student.interface";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-librarian-main',
  templateUrl: './librarian-main.component.html',
  styleUrls: ['./librarian-main.component.css']
})
export class LibrarianMainComponent implements OnInit {

  userInfo: authStudent = JSON.parse(localStorage.getItem('authUser') as string)[0];

  hovering: boolean = false;
  item: string = '';


  constructor(private route: Router, private router: ActivatedRoute) { }

  ngOnInit(): void {
  }

  logout() {
    localStorage.clear();
    this.route.navigate(['/home'])
  }

  // selSrc(item: string): string {
  //   console.log(this.hovering)
  //   console.log(item)
  //
  //   if (this.hovering) {
  //     return `assets/icon/${item}_actual.svg`;
  //   } else {
  //     return `assets/icon/${item}.svg`;
  //   }
  //
  // }
  // test() {
  //   console.log(this.route.url)
  // }

  dynamicImg (img: string, route: string): string {
    if (this.route.url === `/librarian/${route}`) {
      return `${img}_actual`;
    }
    return img
  }

  btnNavigate(str: string) {
    return this.route.navigate([`./${str}`], {relativeTo: this.router})
  }


  dynamicSelec(students: string) {
    return this.route.url === `/librarian/${students}`;
  }


}
