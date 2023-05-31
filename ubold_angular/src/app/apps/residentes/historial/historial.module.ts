import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { AdvancedTableModule } from 'src/app/shared/advanced-table/advanced-table.module';
import { PageTitleModule } from 'src/app/shared/page-title/page-title.module';
import { HistorialRoutingModule } from './historial-routing.module';
import { HistorialComponent } from './historial.component';


@NgModule({
  declarations: [
    HistorialComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    AdvancedTableModule,
    PageTitleModule,
    HistorialRoutingModule,
    NgbPaginationModule,
  ]
})
export class HistorialModule { }
