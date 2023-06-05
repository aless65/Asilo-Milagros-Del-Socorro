import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonacionesRoutingModule} from './donaciones-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageTitleModule } from 'src/app/shared/page-title/page-title.module';
import { Select2Module } from 'ng-select2-component';


@NgModule({
  declarations: [
  
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PageTitleModule,
    DonacionesRoutingModule,
    Select2Module
  ]
})
export class DonacionesModule { }



