/*import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}*/


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  validationGroup1!: FormGroup;
  validationGroup2!: FormGroup;


  constructor (private fb: FormBuilder) { }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Forms', path: '/' }, { label: 'Form Validation', path: '/', active: true }];

    // initialize form config
    this.validationGroup1 = this.fb.group({
      firstName: ['Mark', Validators.required],
      lastName: ['Otto', Validators.required],
      userName: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    });

    this.validationGroup2 = this.fb.group({
      firstName: ['Mark', Validators.required],
      lastName: ['Otto', Validators.required],
      userName: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    });
  }


  // convenience getter for easy access to form fields
  get form1() { return this.validationGroup1.controls; }
  get form2() { return this.validationGroup2.controls; }

}
