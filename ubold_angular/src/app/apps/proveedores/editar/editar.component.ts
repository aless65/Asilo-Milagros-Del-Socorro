import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { Proveedor } from '../Model';
import {ServiceServiceP} from '../service.service';
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
  municipio: Select2Data = [];
  usucrea2: number = 1;
  proveedor: Proveedor = new Proveedor(); 
  isFechaInvalida: boolean = false;


  constructor (
    private fb: FormBuilder,
    private service: ServiceServiceP,
    private service2: ServiceService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

    ngOnInit(): void {
   

      this.pageTitle = [{ label: 'Lista', path: '/' }, { label: 'Crear', path: '/', active: true }];
    


    // initialize form config
    this.validationGroup1 = this.fb.group({
      Nombre: ['', Validators.required],
      Muni: [0, Validators.required],
      Direccion: ['', Validators.required],
      Telefono: ['', [Validators.required, Validators.pattern('^[0-9-]+$')]],
      Correo: ['', Validators.required],
      usucrea: [0, Validators.required],

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

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/apps/proveedores/list';

    this.Editar();
  }

  // convenience getter for easy access to form fields
  get form1() { return this.validationGroup1.controls; }

    
  validarYGuardar() {   
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
  
    else {
      // Si todos los campos del formulario son válidos, llamar a la función de guardar
      this.Guardar();
     
    }
    
  }
  Editar() {
    const id: number | undefined = isNaN(parseInt(localStorage.getItem("ID2") ?? '', 10)) ? undefined : parseInt(localStorage.getItem("ID2") ?? '', 10);
    console.log(id);
  
    this.service.getProveedorId(id)
      .subscribe((data: any) => {
        console.log(data);
        this.proveedor = data.data;
  
        
      });
  }
  

  Guardar(){
    this.service.editarProveedor(this.proveedor)
    .subscribe((data: any) => {
      console.log("GUARDAAA");
      console.log(this.proveedor );
      console.log(data.message);

      if(data.message == "YaExiste"){
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1700,
          timerProgressBar: true,
          titleText: '¡Ya existe un proveedor con ese nombre!',
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
          background: '#fff0f0f5'
        }).then(() => {
          // Acción luego de cerrarse el toast
        });
      }
      else if(data.message == "Exitoso"){
        Swal.fire({
          toast: true,
          position: 'top-end',
          title: '¡Perfecto!',
          text: 'El registro se editó con éxito!',
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
