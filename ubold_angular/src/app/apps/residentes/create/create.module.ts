import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbNavModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { PageTitleModule } from 'src/app/shared/page-title/page-title.module';
import { CreateRoutingModule } from './create-routing.module';
import { CreateComponent } from './create.component';
import { Select2Module } from 'ng-select2-component';


@NgModule({
  declarations: [
    CreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,  
    NgbNavModule,
    NgbProgressbarModule,
    PageTitleModule,
    CreateRoutingModule,
    ReactiveFormsModule,
    Select2Module,
  ],
})
export class CreateModule { }
