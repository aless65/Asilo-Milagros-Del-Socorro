import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTitleModule } from 'src/app/shared/page-title/page-title.module';
import { DetailsComponent } from './details.component';

import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { AdvancedTableModule } from 'src/app/shared/advanced-table/advanced-table.module';
import { TimelineRoutingModule } from './details-routing.module';

@NgModule({
  declarations: [
    DetailsComponent
  ],
  imports: [
    CommonModule,
    PageTitleModule,
    TimelineRoutingModule,
    
    CommonModule,
    FormsModule,
    NgbPaginationModule,
    AdvancedTableModule,
    PageTitleModule
  ]
})
export class DetailsModule { }
