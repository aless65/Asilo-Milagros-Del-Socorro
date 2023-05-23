import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { Select2Data } from 'ng-select2-component';
import { ServiceService } from '../../Service/service.service';

@Component({
  selector: 'app-residentes-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  activeWizard1: number = 1;
  activeWizard2: number = 1;
  activeWizard3: number = 1;
  activeWizard4: number = 1;
  estadoCivil: Select2Data = [];

  basicWizardForm!: FormGroup;

  btnWizardForm !: FormGroup;

  progressWizardForm !: FormGroup;

  accountForm!: FormGroup;

  profileForm!: FormGroup;

  validationWizardForm!: FormGroup;


  constructor (private fb: FormBuilder, 
    private service: ServiceService,) { }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Residentes', path: '/' }, { label: 'Nuevo', path: '/', active: true }];

    this.accountForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      rePassword: ['', Validators.required]
    })

    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    })

    this.validationWizardForm = this.fb.group({
      acceptTerms: [false, Validators.requiredTrue]
    });

    this.service.getEstadosCiviles()
      .subscribe((response: any) => {
        this.estadoCivil = response.data;
        console.log(this.estadoCivil);

        // this.selectedResidente = this.residentes[0];
        // this.age = this.calculateAge(this.selectedResidente.resi_Nacimiento || '');
      });

    // product categories
  this.estadoCivil = [
    {
      label: 'Shopping',
      options: [
        { value: 'SH1', label: 'Shopping 1' },
        { value: 'SH2', label: 'Shopping 2' },
        { value: 'SH3', label: 'Shopping 3' },
      ],
    },
    {
      label: 'CRM',
      options: [
        { value: 'CRM1', label: 'Crm 1' },
        { value: 'CRM2', label: 'Crm 2' },
        { value: 'CRM3', label: 'Crm 3' },
        { value: 'CRM4', label: 'Crm 4' },
      ],
    },
    {
      label: 'eCommerce',
      options: [
        { value: 'E1', label: 'eCommerce 1' },
        { value: 'E2', label: 'eCommerce 2' },
        { value: 'E3', label: 'eCommerce 3' },
        { value: 'E4', label: 'eCommerce 4' },
      ],
    },
  ];

  }

  // convenience getter for easy access to form fields
  get form1() { return this.accountForm.controls; }
  get form2() { return this.profileForm.controls; }
  get form3() { return this.validationWizardForm.controls; }

  // goes to next wizard
  gotoNext(): void {
    if (this.accountForm.valid) {
      if (this.profileForm.valid) {
        this.activeWizard4 = 3;
      }
      else {
        this.activeWizard4 = 2;
      }
    }

  }
}
