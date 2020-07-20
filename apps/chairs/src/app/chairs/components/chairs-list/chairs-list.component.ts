import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Chair } from '@thirty/api-interfaces';

@Component({
  selector: 'thirty-chairs-list',
  templateUrl: './chairs-list.component.html',
  styleUrls: ['./chairs-list.component.scss']
})
export class ChairsListComponent implements OnInit {
  @Input() chairs: [Chair];
  @Output() selected = new EventEmitter<Chair>();
  @Output() deleted = new EventEmitter<Chair>();
  constructor() { }

  ngOnInit(): void {
  }

}
