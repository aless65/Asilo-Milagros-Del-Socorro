import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Column } from 'src/app/shared/advanced-table/advanced-table.component';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { Enfermedad } from '../Models';
import { ServiceService } from 'src/app/apps/enfermedades/Service/service.service';
// import { ToastModule } from 'primeng/toast';
// import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-enfermedades-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    // providers: [MessageService]
  })
  export class ListComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  enfermedades: Enfermedad[] = [];
  columns: Column[] = [];
  newEnfermedad!: FormGroup;

  @ViewChild('advancedTable') advancedTable: any;
  @ViewChild('content', { static: true }) content: any;

  constructor (
    private sanitizer: DomSanitizer,
    public activeModal: NgbModal,
    private fb: FormBuilder,
    private service: ServiceService,
    // private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Inicio', path: '/' }, { label: 'Enfermedades', path: '/', active: true }];
    this._fetchData();
    // initialize advance table 
    this.initAdvancedTableData();

    this.newEnfermedad = this.fb.group({
      name: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get form1() { return this.newEnfermedad.controls; }

  /**
 * opens modal
 * @param title title of modal 
 * @param data data to be used in modal
 */
  openModal(): void {
    this.activeModal.open(this.content, { centered: true });
  }

  submitForm(): void {
    if(this.newEnfermedad.invalid){
      console.log("pipi");
      return;
    }

    const enfermedad: Enfermedad = {
      enfe_Nombre: this.newEnfermedad.value.name,
      enfe_UsuCreacion: 1,
    }


    this.service.addEnfermedades(enfermedad).subscribe(
      (response: any) => {
        // this.showSuccess();
        console.log("se pudo:", response);
        this._fetchData();
      },
      (error) => {
        console.log("no se pudo:", error);
      }
    )

    this.activeModal.dismissAll('');
  }

  // showSuccess(): void {
  //   this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
  // }

  /**
   * fetch contact list
   */
  
  _fetchData(): void {
    this.service.getEnfermedades()
  .subscribe((response: any)=>{
    this.enfermedades = response.data;
  });
  }

  /**
   * initialize advance table columns
   */
  initAdvancedTableData(): void {
    this.columns = [
      // {
      //   name: 'name',
      //   label: 'Basic Info',
      //   formatter: this.enfermedadNameFormatter.bind(this)
      // },
      {
        name: 'enfe_Id',
        label: 'ID',
        formatter: (enfermedad: Enfermedad) => enfermedad.enfe_Id
      },
      {
        name: 'enfe_Nombre',
        label: 'Nombre',
        formatter: (enfermedad: Enfermedad) => enfermedad.enfe_Nombre
      },
      {
        name: 'Action',
        label: 'Action',
        width: 82,
        formatter: this.enfermedadActionFormatter.bind(this),
        sort: false
      }]
  }

  /**
 *  handles operations that need to be performed after loading table
 */
  handleTableLoad(event: any): void {
    // product cell
    document.querySelectorAll('.enfermedad').forEach((e) => {
      // e.addEventListener("click", () => {
      //   this.selectedContact = this.contacts[Number(e.id) - 1]

      // });
    })
  }

  // formats name cell
  enfermedadNameFormatter(enfermedad: Enfermedad): any {
    return this.sanitizer.bypassSecurityTrustHtml(
      `
      <div class="table-user">
      <a href="javascript:void(0);" class="customer text-body fw-semibold" id="${enfermedad.enfe_Id}">${enfermedad.enfe_Nombre}</a>
      `
    );
  }

  // action cell formatter
  enfermedadActionFormatter(): any {
    return this.sanitizer.bypassSecurityTrustHtml(
      ` <a href="javascript:void(0);" class="action-icon"> <i class="mdi mdi-square-edit-outline"></i></a>
        <a href="javascript:void(0);" class="action-icon"> <i class="mdi mdi-delete"></i></a>`
    );
  }

  /**
* Match table data with search input
* @param row Table row
* @param term Search the value
*/
matches(row: Enfermedad, term: string) {
  return (row.enfe_Id?.toString().includes(term) ||
          row.enfe_Nombre?.toLowerCase().includes(term));
}

  /**
   * Search Method
  */
  searchData(searchTerm: string): void {
    if (searchTerm === '') {
      this._fetchData();
    }
    else {
      let updatedData = this.enfermedades;
      //  filter
      updatedData = updatedData.filter(enfermedad => this.matches(enfermedad, searchTerm));
      this.enfermedades = updatedData;
    }

  }

}
// function showSuccess() {
//   throw new Error('Function not implemented.');
// }

