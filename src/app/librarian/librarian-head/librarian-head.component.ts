import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {authStudent} from "../../autorisation/student.interface";

@Component({
  selector: 'app-librarian-head',
  templateUrl: './librarian-head.component.html',
  styleUrls: ['./librarian-head.component.css']
})
export class LibrarianHeadComponent implements OnInit {

  userInfo: authStudent = JSON.parse(localStorage.getItem('authUser') as string)[0];


  constructor(private route: Router) { }

  ngOnInit(): void {
  }



  logout() {
    console.log(this.userInfo.userName)
    localStorage.clear();
    this.route.navigate(['/home'])
  }
}
