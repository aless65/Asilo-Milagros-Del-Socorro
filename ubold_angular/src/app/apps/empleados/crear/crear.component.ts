import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { Empleados } from '../Model';
import {ServiceServiceE} from '../service.service';
import {ServiceService} from 'src/app/apps/Service/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Select2Data } from 'ng-select2-component';
import Swal from 'sweetalert2';


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
  isFechaInvalida: boolean = false;


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
      Identidad: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(13)]],
      Sexo: ['', Validators.required],
      estacivi_Id: [0, Validators.required],
      Fecha: ['', Validators.required],
      Muni: [0, Validators.required],
      Direccion: ['', Validators.required],
      Telefono: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
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
    this.isFechaInvalida = false;
    console.log(this.empleado.empe_Nacimiento); // "2005-01-01"
    
     if (this.validationGroup1.invalid) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1700,
        timerProgressBar: true,
        titleText: '¡Llene todos los campos!',
        icon: 'warning',
        background: '#f6f6baf2'
      }).then(() => {
        // Acción luego de cerrarse el toast
      });
      // El formulario tiene errores de validación, pues mostrar un mensaje de error o alguna cosa ombe... aquí
      console.log(this.usucrea2);
      Object.keys(this.validationGroup1.controls).forEach(field => {
        const control = this.validationGroup1.get(field);
        if (control?.invalid) {
          const errors = control.errors;
          console.log(`Error en el campo ${field}:`, errors);
        }
      });
    }
   /* else if (this.empleado.empe_Nacimiento ) {
      const year = Number(this.empleado.empe_Nacimiento.split('-')[0]); // Obtener el año de la fecha
    
      if (year > 2004) {
        this.isFechaInvalida = true; 
        // Mostrar un toast que indique que la fecha de nacimiento no puede ser mayor a 2004
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1700,
          timerProgressBar: true,
          titleText: '¡El empleado debe ser mayor de edad!',
          icon: 'warning',
          background: '#f6f6baf2'
        }).then(() => {
          // Acción luego de cerrarse el toast
        });
      }
      else{
        this.isFechaInvalida = false; // Establecer la variable como falsa si la fecha es válida
      }
     
     
    }*/
    else {
      // Si todos los campos del formulario son válidos, llamar a la función de guardar
      this.Guardar();
     
    }
    
  }


  
  Guardar(){
    this.service.createEmpleado(this.empleado)
    .subscribe((data: any) => {
      console.log("GUARDAAA");
     /* this.router.navigate([this.returnUrl]);*/
      console.log(this.empleado );
      console.log(data.message);

      if(data.message == "YaExiste"){
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1700,
          timerProgressBar: true,
          titleText: '¡Ya existe un empleado con esa identidad!',
          icon: 'error',
          background: '#fff0f0f5'
        }).then(() => {
          // Acción luego de cerrarse el toast
        });
      }
      else if(data.message == "ErrorInespero"){
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1700,
          timerProgressBar: true,
          titleText: '¡Ha ocurrido en error inesperado!',
          icon: 'error',
          background: '#f47171f0'
        }).then(() => {
          // Acción luego de cerrarse el toast
        });
      }
      else if(data.message == "Exitoso"){
        Swal.fire({
          title: 'Perfecto!',
          text: 'El registro se guardó con éxito!',
          icon: 'success',
          showConfirmButton: false,
          timer: 1850,
          timerProgressBar: true
        }).then(() => {
           this.router.navigate([this.returnUrl]);
        });
      }
    })
   }


   Volver(){
    this.router.navigate([this.returnUrl]);
   }
  

}
