import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Column } from 'src/app/shared/advanced-table/advanced-table.component';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { Empleados } from '../Model';
import { ServiceServiceE } from 'src/app/apps/empleados/service.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  returnUrl: string = '/';
  selectedEmpleado!: Empleados;

  @ViewChild('advancedTable') advancedTable: any;
  @ViewChild('content', { static: true }) content: any;
  @ViewChild('deleteEmpleadoModal', { static: true }) deleteEmpleadoModal: any;

  constructor (
    private sanitizer: DomSanitizer,
    public activeModal: NgbModal,
    private fb: FormBuilder,
    private service: ServiceServiceE,
    private router:Router,
    private route: ActivatedRoute,

 
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

      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/apps/empleados/editar';

    }

  // convenience getter for easy access to form fields
  get form1() { return this.newEmppleado.controls; }

  /**
 * opens modal
 * @param title title of modal 
 * @param data data to be used in modal
 */
 
  openModalDelete(): void {
    this.activeModal.open(this.deleteEmpleadoModal, { centered: true, windowClass: 'delete-modal' });
  }  

  deleteEmpleado(): void{
    this.service.deleteEmpleados(this.selectedEmpleado.empe_Id || 0).subscribe(
        (response: any) => {
          console.log("se pudo:", response);
          this._fetchData();
        },
        (error) => {
          console.log("no se pudo:", error);
        }
      )
    this._fetchData();
    this.activeModal.dismissAll('');
  }


  
  _fetchData(): void {
    this.service.getEmpleado()
  .subscribe((response: any)=>{
    this.empleados = response.data;
  });
  }




  /**
   * initialize advance table columns
   */
  initAdvancedTableData(): void {
    this.columns = [

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
        name: 'empe_Identidad',
        label: 'Identidad',
        formatter: (empleado: Empleados) => empleado.empe_Identidad
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
      e.addEventListener("click", () => {
        const empleadoId = e.getAttribute('id');
        const empleado = this.empleados.find((emp: Empleados) => emp.empe_Id === Number(empleadoId));
        if (empleado) {
          this.Editar(empleado);
        }
      });
    });


    document.querySelectorAll('.delete').forEach((e) => {
      e.addEventListener("click", () => {  
        const selectedId = Number(e.id);
        this.selectedEmpleado = this.empleados.find(empe => empe.empe_Id === selectedId) || this.selectedEmpleado;
        if (this.selectedEmpleado) {
          this.newEmppleado = this.fb.group({
            name: [this.selectedEmpleado.empe_NombreCompleto || '', Validators.required],
          });
          this.openModalDelete();
        }
      });
    })
  }
  

  // action 
  empleadoActionFormatter(empleado: Empleados): any {
    return this.sanitizer.bypassSecurityTrustHtml(
      `<a class="edit action-icon empleado" id="${empleado.empe_Id}" role="button">
        <i class="mdi mdi-square-edit-outline"></i>
      </a>
      <a href="javascript:void(0);" class="delete action-icon" id="${empleado.empe_Id}"> <i class="mdi mdi-delete"></i></a>`
    );
  }
  

  Editar(empleado: Empleados) {
    console.log("si llegaaa");
       localStorage.setItem("id", empleado.empe_Id!.toString());
       this.router.navigate([this.returnUrl]); 
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

