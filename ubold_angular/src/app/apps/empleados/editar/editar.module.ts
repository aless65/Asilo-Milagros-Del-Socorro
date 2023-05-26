import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageTitleModule } from 'src/app/shared/page-title/page-title.module';
import { EditarRoutingModule } from './editar-routing.module';
import { EditarComponent } from './editar.component';
import { Select2Module } from 'ng-select2-component';


@NgModule({
  declarations: [
    EditarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PageTitleModule,
    EditarRoutingModule,
    Select2Module
  ]
})
export class ValidationModule { }


