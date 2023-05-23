import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { Empleados } from '../Model';
import {ServiceService} from '../service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})

export class CrearComponent implements OnInit {


  pageTitle: BreadcrumbItem[] = [];
  validationGroup1!: FormGroup;

  empleado: Empleados = new  Empleados(); // no puedo instancear

  constructor (
    private fb: FormBuilder,
    private service: ServiceService,
     private router: Router
    ) { }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Lista', path: '/' }, { label: 'Crear', path: '/', active: true }];

    // initialize form config
    this.validationGroup1 = this.fb.group({
      Nombre: [this.empleado.empe_Nombres, Validators.required],
      Apellido: [this.empleado.empe_Apellidos, Validators.required],
      Identidad: [this.empleado.empe_Identidad, Validators.required],
      Sexo: [this.empleado.empe_Sexo, Validators.required],
      Estado: [this.empleado.estacivi_Id, Validators.required],
      Fecha: [this.empleado.empe_Nacimiento, Validators.required],
      Muni: [this.empleado.muni_Id, Validators.required],
      Depa: [this.empleado.depa_Id, Validators.required],
      Direccion: [this.empleado.empe_Direccion, Validators.required],
      Telefono: [this.empleado.empe_Telefono, Validators.required],
      Correo: [this.empleado.empe_Correo, Validators.required],
      Cargo: [this.empleado.carg_Id, Validators.required],
      Centro: [this.empleado.cent_Id, Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    });

   
  }

  // convenience getter for easy access to form fields
  get form1() { return this.validationGroup1.controls; }

  Guardar(){
    this.service.createEmpleado(this.empleado)
    .subscribe((data: any) => {
      alert("se agrego");
      this.router.navigate(["list"]);
    })
   }

}
