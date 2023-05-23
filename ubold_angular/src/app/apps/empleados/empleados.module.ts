import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpleadosRoutingModule } from './empleados-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageTitleModule } from 'src/app/shared/page-title/page-title.module';
import { EditarComponent } from './editar/editar.component';
import { CrearComponent } from './crear/crear.component';

@NgModule({
  declarations: [
   
    EditarComponent
  ],
  imports: [
    CommonModule,
    EmpleadosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PageTitleModule,
    
  ]
})
export class EmpleadosModule { }



