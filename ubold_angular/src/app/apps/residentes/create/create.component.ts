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
  tipoSangre: Select2Data = [];
  enfermedad: Select2Data = [];
  municipio: Select2Data = [];
  parentesco: Select2Data = [];

  accountForm!: FormGroup;

  encargadoForm!: FormGroup;

  profileForm!: FormGroup;

  validationWizardForm!: FormGroup;


  constructor (private fb: FormBuilder, 
    private service: ServiceService,) { }

    selectedImage: string | ArrayBuffer | null = null;

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Residentes', path: '/' }, { label: 'Nuevo', path: '/', active: true }];

    this.accountForm = this.fb.group({
      resi_Nombres: ['', Validators.required],
      resi_Apellidos: ['', Validators.required],
      resi_Identidad: ['', Validators.required],
      resi_Nacimiento: ['', Validators.required],
      estacivi_Id: [0, Validators.required],
      resi_Sexo: ['', Validators.required],
    })
    
    this.encargadoForm = this.fb.group({
      enca_Nombres: ['', Validators.required],
      enca_Apellidos: ['', Validators.required],
      enca_Identidad: ['', Validators.required],
      enca_Nacimiento: ['', Validators.required],
      enca_Sexo: ['', Validators.required],
      estacivi_Id: [0, Validators.required],
      muni_Id: [0, Validators.required],
      enca_Direccion: ['', Validators.required],
      enca_Telefono: ['', Validators.required],
      pare_Id: [0, Validators.required],
    })

    this.profileForm = this.fb.group({
      tiposang_Id: [0, Validators.required],
      expe_FechaApertura: ['', Validators.required],
      enfe_Id: [0, [Validators.required, Validators.email]]
    })

    this.validationWizardForm = this.fb.group({
      acceptTerms: [false, Validators.requiredTrue],
      municipioSelected: ['', Validators.required],
    });

    this.service.getEstadosCiviles().subscribe((response: any) => {
      let options = response.data.map((item: any) => ({
        value: item.estacivi_Id,
        label: item.estacivi_Nombre
      }));

      this.estadoCivil = [{
        label: 'Escoja un estado',
        options: options
        },
      ];
    });
    

    this.service.getTiposSangre().subscribe((response: any) => {
      let options = response.data.map((item: any) => ({
        value: item.tiposang_Id,
        label: item.tiposang_Nombre
      }));

      this.tipoSangre = [{
        label: 'Escoja un tipo de sangre',
        options: options
        },
      ];
      console.log(this.tipoSangre);
    });
  

    this.service.getEnfermedades().subscribe((response: any) => {
      let options = response.data.map((item: any) => ({
        value: item.enfe_Id,
        label: item.enfe_Nombre
      }));

      this.enfermedad = [{
        label: 'Escoja enfermedades',
        options: options
        },
      ];
      console.log(this.enfermedad);
    });

    this.service.getMunicipios().subscribe((response: any) => {
      let depaLabels: string[] = [];
      let options: { [key: string]: any[] } = {};
    
      response.data.forEach((item: any) => {
        const depaNombre: string = item.depa_Nombre;
        const muniId: string = item.muni_id;
        const muniNombre: string = item.muni_Nombre;
    
        if (!depaLabels.includes(depaNombre)) {
          depaLabels.push(depaNombre);
          options[depaNombre] = [];
        }
    
        options[depaNombre].push({
          value: muniId,
          label: muniNombre
        });
      });
    
      this.municipio = depaLabels.map((depaNombre: string) => ({
        label: depaNombre,
        options: options[depaNombre]
      }));
    });

    this.service.getParentescos().subscribe((response: any) => {
      let options = response.data.map((item: any) => ({
        value: item.pare_Id,
        label: item.pare_Nombre
      }));

      this.parentesco = [{
        label: 'Escoja un parentesco',
        options: options
        },
      ];
      console.log(this.parentesco);
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

  deleteImage(){
    this.selectedImage = ''; // Clear the selectedImage variable to remove the image
  }

  // convenience getter for easy access to form fields
  get form1() { return this.accountForm.controls; }
  get form2() { return this.encargadoForm.controls; }
  get form3() { return this.profileForm.controls; }
  get form4() { return this.validationWizardForm.controls; }

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
