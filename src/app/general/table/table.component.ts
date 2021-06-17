import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from "@angular/router";




@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() headings: string[] = [];
  @Input() objectKeys: string[] = [];
  @Input() arrayObects: any = [];


  @Input() popupComment: boolean = false;
  @Input() popupEdit: boolean = false;
  @Input() popupDelete: boolean = false;
  @Input() popupOpen: boolean = false;
  @Input() buttonSwitch: boolean = false;

  @Input() trNgClassBoolean!: (args: any) => boolean;

  @Input()  checkStock: boolean = false;

  @Output() object = new EventEmitter<any>();
  @Output() objectSwitch = new EventEmitter<any>();

  thisUrl: string = this._route.url;


  stateSwitch: boolean = false;


  p: number = 1; // Page






  constructor(private _route: Router) { }

  ngOnInit(): void {
  }

  sendObject(object: object) {
    this.object.emit(object)
  }

  clickHref(href: string = '#') {
    return window.location.href = this.thisUrl + `${href}`
  }


  sendObjectSwitch(object: any) {
    this.objectSwitch.emit(object)
  }
}
