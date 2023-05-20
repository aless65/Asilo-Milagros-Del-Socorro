import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppsRoutingModule } from './apps-routing.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ListComponent } from './enfermedades/list/list.component';
import { CreateComponent } from './enfermedades/create/create.component';


@NgModule({
  declarations: [
  
    ListComponent,
       CreateComponent
  ],
  imports: [
    CommonModule,
    AppsRoutingModule
  ]
})
export class AppsModule { }
