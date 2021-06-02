import { Component, OnInit } from '@angular/core';
import {authStudent} from "../../autorisation/student.interface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-librarian-main',
  templateUrl: './librarian-main.component.html',
  styleUrls: ['./librarian-main.component.css']
})
export class LibrarianMainComponent implements OnInit {

  userInfo: authStudent = JSON.parse(localStorage.getItem('authUser') as string)[0];

  hovering: boolean = false;
  item: string = '';


  constructor(private route: Router) { }

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
}
