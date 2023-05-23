import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Column } from 'src/app/shared/advanced-table/advanced-table.component';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { Empleados } from '../Model';
import { ServiceService } from 'src/app/apps/empleados/service.service';
import { Router } from '@angular/router';

// import { ToastModule } from 'primeng/toast';
// import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-empleados-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    // providers: [MessageService]
  })
  export class ListComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  empleados: Empleados[] = [];
  columns: Column[] = [];
  newEmppleado!: FormGroup;

  @ViewChild('advancedTable') advancedTable: any;
  @ViewChild('content', { static: true }) content: any;

  constructor (
    private sanitizer: DomSanitizer,
    public activeModal: NgbModal,
    private fb: FormBuilder,
    private service: ServiceService,
    private router:Router
    // private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Inicio', path: '/' }, { label: 'Empleados', path: '/', active: true }];
    this._fetchData();
    // initialize advance table 
    this.initAdvancedTableData();

    this.newEmppleado = this.fb.group({
      name: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get form1() { return this.newEmppleado.controls; }

  /**
 * opens modal
 * @param title title of modal 
 * @param data data to be used in modal
 */
  openModal(): void {
    this.activeModal.open(this.content, { centered: true });
  }

  submitForm(): void {
    if(this.newEmppleado.invalid){
      console.log("pipi");
      return;
    }

    const enfermedad: Empleados = {
      enfe_Nombre: this.newEmppleado.value.name,
      enfe_UsuCreacion: 1,
    }


  

    this.activeModal.dismissAll('');
  }


  
  _fetchData(): void {
    this.service.getEnfermedades()
  .subscribe((response: any)=>{
    this.empleados = response.data;
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
        name: 'empe_Id',
        label: 'ID',
        formatter: (empleado: Empleados) => empleado.empe_Id
      },
      {
        name: 'empe_NombreCompleto',
        label: 'Nombre',
        formatter: (empleado: Empleados) => empleado.empe_NombreCompleto
      },
      {
        name: 'SexoDes',
        label: 'Sexo',
        formatter: (empleado: Empleados) => empleado.sexoDes
      },
      {
        name: 'Action',
        label: 'Action',
        width: 82,
        formatter: this.empleadoActionFormatter.bind(this),
        sort: false
      }]
  }

  /**
 *  handles operations that need to be performed after loading table
 */
  handleTableLoad(event: any): void {
    // product cell
    document.querySelectorAll('.empleado').forEach((e) => {
      // e.addEventListener("click", () => {
      //   this.selectedContact = this.contacts[Number(e.id) - 1]

      // });
    })
  }

  // formats name cell
   empleadoNameFormatter(empleado: Empleados): any {
    return this.sanitizer.bypassSecurityTrustHtml(
      `
      <div class="table-user">
      <a href="javascript:void(0);" class="customer text-body fw-semibold" id="${empleado.empe_Id}">${empleado.empe_Nombres}</a>
      `
    );
  }

  // action cell formatter
  empleadoActionFormatter(): any {
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
matches(row: Empleados, term: string) {
  return (row.empe_Id?.toString().includes(term) ||
          row.empe_Nombres?.toLowerCase().includes(term));
}

  /**
   * Search Method
  */
  searchData(searchTerm: string): void {
    if (searchTerm === '') {
      this._fetchData();
    }
    else {
      let updatedData = this.empleados;
      //  filter
      updatedData = updatedData.filter(empleado => this.matches(empleado, searchTerm));
      this.empleados = updatedData;
    }

  }

  Agregar(){
    this.router.navigate(['crear']);
  }

}
// function showSuccess() {
//   throw new Error('Function not implemented.');
// }

