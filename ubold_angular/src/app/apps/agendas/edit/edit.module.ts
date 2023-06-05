import { NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { AdvancedTableModule } from 'src/app/shared/advanced-table/advanced-table.module';
import { PageTitleModule } from 'src/app/shared/page-title/page-title.module';
import { EditRoutingModule } from './edit-routing.module';
import { EditComponent } from './edit.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarEventComponent } from '../eventos/evento.component';
import { Select2Module } from 'ng-select2-component';


@NgModule({
  declarations: [
    EditComponent,
    CalendarEventComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbPaginationModule,
    AdvancedTableModule,
    PageTitleModule,
    EditRoutingModule,
    ReactiveFormsModule,
    NgbModalModule,
    FullCalendarModule,
    Select2Module

  ],
})
export class EditModule { }
