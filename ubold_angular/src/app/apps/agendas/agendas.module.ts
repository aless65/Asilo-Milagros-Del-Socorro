import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendasRoutingModule } from './agendas-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageTitleModule } from 'src/app/shared/page-title/page-title.module';


@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    AgendasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PageTitleModule,
  ]
})
export class AgendasModule { }



