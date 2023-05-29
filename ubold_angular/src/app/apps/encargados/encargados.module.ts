import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EncargadosRoutingModule } from './encargados-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageTitleModule } from 'src/app/shared/page-title/page-title.module';


@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    EncargadosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PageTitleModule,
    
  ]
})
export class EncargadosModule { }


