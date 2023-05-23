import { Component, OnInit, ViewChild, AfterViewInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Column } from 'src/app/shared/advanced-table/advanced-table.component';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { Centro } from '../Models';
import { ServiceService } from 'src/app/apps/centros/Service/service.service';


@Component({
    selector: 'app-centros-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    // providers: [MessageService]
  })
  export class ListComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  centros: Centro[] = [];
  columns: Column[] = [];
 

  @ViewChild('advancedTable') advancedTable: any;
  @ViewChild('content', { static: true }) content: any;


  constructor (
    private sanitizer: DomSanitizer,
    public activeModal: NgbModal,
    private fb: FormBuilder,
    private service: ServiceService,
    
  ) { }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Inicio', path: '/' }, { label: 'Centro', path: '/', active: true }];
    this._fetchData();
    // initialize advance table 
    this.initAdvancedTableData();

  
  }

  // convenience getter for easy access to form fields
  

  /**
 * opens modal
 * @param title title of modal 
 * @param data data to be used in modal
 */
  
  

  

  

  // showSuccess(){
  //   this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
  // }

  // openSuccess(){
  //   this.toast.success({detail:'Success',summary:'This is Success', sticky:true,position:'tr'})
  // }

  /**
   * fetch contact list
   */
  
  _fetchData(): void {
    this.service.getCentros()
  .subscribe((response: any)=>{
    this.centros = response.data;
  });
  }

  /**
   * initialize advance table columns
   */
  initAdvancedTableData(): void {
    console.log('initAdvancedTableData');
    this.columns = [
      // {
      //   name: 'name',
      //   label: 'Basic Info',
      //   formatter: this.enfermedadNameFormatter.bind(this)
      // },
      {
        name: 'cent_Id',
        label: 'ID',
        formatter: (centro: Centro) => centro.cent_Id
      },
      {
        name: 'cent_Nombre',
        label: 'Nombre',
        formatter: (centro: Centro) => centro.cent_Nombre
      },
      {
        name: 'Action',
        label: 'Action',
        width: 82,
        formatter: this.centroActionFormatter.bind(this),
      }]
  }

  /**
 *  handles operations that need to be performed after loading table
 */


  
    
  


  // formats name cell
  centroNameFormatter(centro: Centro): any {
    return this.sanitizer.bypassSecurityTrustHtml(
      `
      <div class="table-user">
      <a href="javascript:void(0);" class="customer text-body fw-semibold" id="${centro.cent_Id}">${centro.cent_Nombre}</a>
      `
    );
  }

  // action cell formatter
  centroActionFormatter(centro: Centro): any {
    return this.sanitizer.bypassSecurityTrustHtml(
      ` <a href="javascript:void(0);" class="edit action-icon" id="${centro.cent_Id}"> <i class="mdi mdi-square-edit-outline" ></i></a>
        <a href="javascript:void(0);" class="delete action-icon" id="${centro.cent_Id}"> <i class="mdi mdi-delete"></i></a>`
    );
  }
  
  // editEnfermedad(id: string): void {
  //   // Handle edit action
  //   console.log('Edit button clicked for ID:', id);
  // }
  
  // deleteEnfermedad(id: string): void {
  //   // Handle delete action
  //   console.log('Delete button clicked for ID:', id);
  // }

  /**
* Match table data with search input
* @param row Table row
* @param term Search the value
*/
matches(row: Centro, term: string) {
  return (row.cent_Id?.toString().includes(term) ||
          row.cent_Nombre?.toLowerCase().includes(term));
}

  /**
   * Search Method
  */
  searchData(searchTerm: string): void {
    if (searchTerm === '') {
      this._fetchData();
    }
    else {
      let updatedData = this.centros;
      //  filter
      updatedData = updatedData.filter(centro => this.matches(centro, searchTerm));
      this.centros = updatedData;
    }

  }

}
// function showSuccess() {
//   throw new Error('Function not implemented.');
// }

