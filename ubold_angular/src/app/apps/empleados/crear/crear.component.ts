import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { Empleados } from '../Model';
import {ServiceServiceE} from '../service.service';
import {ServiceService} from 'src/app/apps/Service/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Select2Data } from 'ng-select2-component';


@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})

export class CrearComponent implements OnInit {

  returnUrl: string = '/';
  pageTitle: BreadcrumbItem[] = [];
  validationGroup1!: FormGroup;
  estadoCivil: Select2Data = [];
  cargos: Select2Data = [];
  centros: Select2Data = [];
  municipio: Select2Data = [];
  usucrea2: number = 1;
  empleado: Empleados = new  Empleados(); 

  constructor (
    private fb: FormBuilder,
    private service: ServiceServiceE,
    private service2: ServiceService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

    ngOnInit(): void {
    this.pageTitle = [{ label: 'Lista', path: '/' }, { label: 'Crear', path: '/', active: true }];
    


    // initialize form config
    this.validationGroup1 = this.fb.group({
      Nombre: ['', Validators.required],
      Apellido: ['', Validators.required],
      Identidad: ['', Validators.required],
      Sexo: ['', Validators.required],
      estacivi_Id: [0, Validators.required],
      Fecha: ['', Validators.required],
      Muni: [0, Validators.required],
      Direccion: ['', Validators.required],
      Telefono: ['', Validators.required],
      Correo: ['', Validators.required],
      Cargo: [0, Validators.required],
      Centro: [0, Validators.required],
      usucrea: [0, Validators.required],
    });


    this.service2.getEstadosCiviles().subscribe((response: any) => {
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

    this.service2.getCargos().subscribe((response: any) => {
      let optionsCargos = response.data.map((item: any) => ({
        value: item.carg_Id,
        label: item.carg_Nombre
      }));

      this.cargos = [{
        label: 'Escoja un Cargo',
        options: optionsCargos
        },
      ];
      console.log(this.cargos);
    });
   
    this.service2.getCentros().subscribe((response: any) => {
      let optionsCentros = response.data.map((item: any) => ({
        value: item.cent_Id,
        label: item.cent_Nombre
      }));

      this.centros = [{
        label: 'Escoja un Centro',
        options: optionsCentros
        },
      ];
      console.log(this.centros);
    });


    this.service2.getMunicipios().subscribe((response: any) => {
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

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/apps/empleados/list';


  }

  // convenience getter for easy access to form fields
  get form1() { return this.validationGroup1.controls; }


  validarYGuardar() {
    if (this.validationGroup1.invalid) {
 
     
      // El formulario tiene errores de validación, puedes mostrar un mensaje de error o realizar alguna acción aquí
      console.log(this.usucrea2);
      Object.keys(this.validationGroup1.controls).forEach(field => {
        const control = this.validationGroup1.get(field);
        if (control?.invalid) {
          const errors = control.errors;
          console.log(`Error en el campo ${field}:`, errors);
        }
      });
    } else {
      // Todos los campos del formulario son válidos, llamar a la función de guardar
      this.Guardar();
      console.log(this.empleado);
    }
  }
  
  
  Guardar(){
    this.service.createEmpleado(this.empleado)
    .subscribe((data: any) => {
      console.log("GUARDAAA");
      this.router.navigate([this.returnUrl]);
    })
   }


   Volver(){
    this.router.navigate([this.returnUrl]);
   }
  

}
