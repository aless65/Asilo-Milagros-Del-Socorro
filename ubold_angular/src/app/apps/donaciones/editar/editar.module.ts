import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { PageTitleModule } from 'src/app/shared/page-title/page-title.module';
import { editarRoutingModule } from './editar-routing.module';
import { EditarComponent } from './editar.component';
import { Select2Module } from 'ng-select2-component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { AdvancedTableModule } from 'src/app/shared/advanced-table/advanced-table.module';



@NgModule({
  declarations: [
    EditarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbAlertModule,
    PageTitleModule,
    editarRoutingModule,
    ReactiveFormsModule,
    Select2Module,
    NgbPaginationModule,
    AdvancedTableModule,
    ]
})
export class editarModule { }
