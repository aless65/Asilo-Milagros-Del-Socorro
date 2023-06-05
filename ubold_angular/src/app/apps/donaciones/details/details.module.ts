import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbNavModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { PageTitleModule } from 'src/app/shared/page-title/page-title.module';
import { AdvancedTableModule } from 'src/app/shared/advanced-table/advanced-table.module';
import { DetailsRoutingModule } from '../details/details-routing.module';
import { DetailsComponent } from './details.component';



import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    DetailsComponent
  ],
  imports: [
    CommonModule,
    NgbProgressbarModule,
    NgbNavModule,
    AdvancedTableModule,
    PageTitleModule,
    DetailsRoutingModule,
    FormsModule,
    NgbPaginationModule,
    
  ]
})
export class DetailModule { }
