import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistorialPagosRoutingModule } from './historialPago-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageTitleModule } from 'src/app/shared/page-title/page-title.module';


@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    HistorialPagosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PageTitleModule,
    
  ]
})
export class HistorialPagoModule { }


