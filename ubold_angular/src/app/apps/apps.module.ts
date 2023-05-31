import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppsRoutingModule } from './apps-routing.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { PdfViewerModule } from 'ng2-pdf-viewer';


// import { ToastModule } from 'primeng/toast';
// import {NgToastModule} from 'ng-angular-popup';


@NgModule({
  declarations: [

          
  ],
  imports: [
    CommonModule,
    AppsRoutingModule,
    PdfViewerModule,
    // NgToastModule,
    // ToastModule
  ]
})
export class AppsModule { }