import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { Encargado } from '../Model';
import {ServiceServiceE} from '../service.service';
import {ServiceService} from 'src/app/apps/Service/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Select2Data } from 'ng-select2-component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})

export class EditarComponent implements OnInit {

  returnUrl: string = '/';
  pageTitle: BreadcrumbItem[] = [];
  validationGroup1!: FormGroup;
  estadoCivil: Select2Data = [];
  municipio: Select2Data = [];
  residente: Select2Data =[];
  parentesco: Select2Data =[];

  cargos: Select2Data = [];
  centros: Select2Data = [];

  encargado: Encargado = new  Encargado(); 
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
      parentesco: [0, Validators.required],
      residente: [0, Validators.required],
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



  
    this.service2.getParentescos().subscribe((response: any) => {
      let optionsParentezco = response.data.map((item: any) => ({
        value: item.pare_Id,
        label: item.pare_Nombre
      }));

      this.parentesco = [{
        label: 'Escoja un Parentesco',
        options: optionsParentezco
        },
      ];
      console.log(this.parentesco);
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



    this.service2.getResidentes().subscribe((response: any) => {
      let optionsResidentes = response.data.map((item: any) => ({
        value: item.resi_Id,
        label: item.resi_Nombres+' '+item.resi_Apellidos+' / '+item.resi_Identidad
      }));

      this.residente = [{
        label: 'Escoja un Residente',
        options: optionsResidentes
        },
      ];
      console.log(this.residente);
    });

    
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/apps/encargados/list';

    this.Editar();
  }

  // convenience getter for easy access to form fields
  get form1() { return this.validationGroup1.controls; }

    
  validarYGuardar() {
    this.isFechaInvalida = false;
    console.log(this.encargado.enca_Nacimiento); // "2005-01-01"
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
  
      Object.keys(this.validationGroup1.controls).forEach(field => {
        const control = this.validationGroup1.get(field);
        if (control?.invalid) {
          const errors = control.errors;
          console.log(`Error en el campo ${field}:`, errors);
        }
      });
  
      return; // Salir de la función si el formulario tiene errores de validación
    }
  
    if (this.encargado.enca_Identidad!.length < 13) {
      console.log("Advertencia: La identidad tiene menos de 13 caracteres.");
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1700,
        timerProgressBar: true,
        titleText: '¡Ingrese una identidad valida!',
        icon: 'warning',
        background: '#f6f6baf2'
      }).then(() => {
        // Acción luego de cerrarse el toast
      });
  
      return; // Salir de la función si la identidad tiene menos de 13 caracteres
    }
  
    this.service.editarEncargados(this.encargado).subscribe((data: any) => {
      console.log("GUARDAAA");
      console.log(this.encargado);
      console.log(data.message);
      if (data.message == "El encargado ha sido editado exitosamente") {
        Swal.fire({
          title: '¡Perfecto!',
          text: 'El registro se guardó con éxito!',
          icon: 'success',
          showConfirmButton: false,
          timer: 1850,
          timerProgressBar: true
        }).then(() => {
          this.router.navigate([this.returnUrl]);
        });
      } else if (data.message == "Ya existe un encargado con este número de identidad") {
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1700,
          timerProgressBar: true,
          titleText: '¡Ya existe un encargado con esa identidad!',
          icon: 'error',
          background: '#fff0f0f5'
        }).then(() => {
          // Acción luego de cerrarse el toast
        });
      }
    });
  }
  

  Editar() {
    const id: number | undefined = isNaN(parseInt(localStorage.getItem("ID2") ?? '', 10)) ? undefined : parseInt(localStorage.getItem("ID2") ?? '', 10);
    console.log(id);
  
    this.service.getEncargadosId(id)
      .subscribe((data: any) => {
        console.log(data);
        this.encargado = data.data;
  
        const fecha = data.data.enca_Nacimiento;
        const fechaObjeto = new Date(fecha);
        const fechaFormateada = fechaObjeto.toISOString().split('T')[0];
  
        console.log(fechaFormateada);
  
        this.encargado.enca_Nacimiento = fechaFormateada; // Asignar la fecha formateada al campo empe_Nacimiento
      });
  }
  

   Volver(){
    this.router.navigate([this.returnUrl]);
   }
  

}
