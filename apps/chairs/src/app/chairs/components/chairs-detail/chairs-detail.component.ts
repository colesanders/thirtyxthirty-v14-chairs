import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { Chair } from '@thirty/api-interfaces';


@Component({
  selector: 'thirty-chairs-detail',
  templateUrl: './chairs-detail.component.html',
  styleUrls: ['./chairs-detail.component.scss']
})
export class ChairsDetailComponent implements OnInit, OnChanges{
  @Input() chair: Chair;
  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  chairForm: FormGroup;

  chairTypes = ['Standard Chair', 'Rocking Chair', 'Stool'];
  seatShapes = ['Round', 'Square', 'Formed'];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createFormGroup();
  }

  ngOnChanges(){
    if(this.chairForm && this.chair){
      this.chairForm.patchValue(this.chair)
    } else if(this.chairForm){
      this.cancel();
    }
  }

  cancel(){
    this.chairForm.reset();
    this.chairForm.value.price = 0;
  }

  createFormGroup(){
    this.chairForm = this.formBuilder.group({
      id: [],
      type: new FormControl('', [
        Validators.required,
      ]),
      legs: new FormControl('', [
        Validators.required,
      ]),
      backing: new FormControl(false, [
      ]),
      seatShape: new FormControl('', [
        Validators.required,
      ])
    })
  }
}
