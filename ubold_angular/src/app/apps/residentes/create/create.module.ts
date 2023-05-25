import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbNavModule, NgbProgressbarModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { PageTitleModule } from 'src/app/shared/page-title/page-title.module';
import { CreateRoutingModule } from './create-routing.module';
import { CreateComponent } from './create.component';
import { Select2Module } from 'ng-select2-component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarEventComponent } from '../eventos/evento.component';


@NgModule({
  declarations: [
    CreateComponent,
    CalendarEventComponent
  ],
  imports: [
    CommonModule,
    FormsModule,    
    NgbNavModule,
    NgbProgressbarModule,
    NgbModalModule,
    PageTitleModule,
    CreateRoutingModule,
    ReactiveFormsModule,
    Select2Module,
    FullCalendarModule,
  ],
})
export class CreateModule { }
