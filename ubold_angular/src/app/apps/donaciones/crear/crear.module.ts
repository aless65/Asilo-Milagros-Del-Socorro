import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { PageTitleModule } from 'src/app/shared/page-title/page-title.module';
import { crearRoutingModule } from './crear-routing.module';
import { CrearComponent } from './crear.component';
import { Select2Module } from 'ng-select2-component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { AdvancedTableModule } from 'src/app/shared/advanced-table/advanced-table.module';



@NgModule({
  declarations: [
    CrearComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbAlertModule,
    PageTitleModule,
    crearRoutingModule,
    ReactiveFormsModule,
    Select2Module,
    NgbPaginationModule,
    AdvancedTableModule,
    ]
})
export class CrearModule { }
