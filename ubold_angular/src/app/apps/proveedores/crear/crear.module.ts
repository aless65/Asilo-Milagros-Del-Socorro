import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageTitleModule } from 'src/app/shared/page-title/page-title.module';
import { CreateRoutingModule } from './crear-routing.module';
import { CrearComponent } from './crear.component';
import { Select2Module } from 'ng-select2-component';



@NgModule({
  declarations: [
    CrearComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PageTitleModule,
    CreateRoutingModule,
    Select2Module
  ]
})
export class ValidationModule { }
