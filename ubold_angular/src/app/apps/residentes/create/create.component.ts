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

    selectedImage: string | ArrayBuffer | null = null;

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

    this.service.getEstadosCiviles().subscribe((response: any) => {
      let optionsEstados = response.data.map((item: any) => ({
        value: item.estacivi_Id,
        label: item.estacivi_Nombre
      }));

      this.estadoCivil = [{
        label: 'Escoja un estado',
        options: optionsEstados
        },
      ];
      console.log(this.estadoCivil);
    });
    
  

  }

  handleImageUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result;
      };
      reader.readAsDataURL(file);
    }
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
