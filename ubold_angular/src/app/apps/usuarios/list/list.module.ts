import { NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { AdvancedTableModule } from 'src/app/shared/advanced-table/advanced-table.module';
import { PageTitleModule } from 'src/app/shared/page-title/page-title.module';
import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';
import { Select2Module } from 'ng-select2-component';


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbPaginationModule,
    AdvancedTableModule,
    PageTitleModule,
    ListRoutingModule,
    ReactiveFormsModule,
    Select2Module,
    NgbModalModule,
  ],
})
export class ListModule { }
