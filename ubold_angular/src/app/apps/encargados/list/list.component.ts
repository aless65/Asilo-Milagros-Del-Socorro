
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Column } from 'src/app/shared/advanced-table/advanced-table.component';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { Encargado } from '../Model';
import { ServiceServiceE } from 'src/app/apps/encargados/service.service';
import { ActivatedRoute, Router } from '@angular/router';

// import { ToastModule } from 'primeng/toast';
// import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-encargados-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
  export class ListComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  encargados: Encargado[] = [];
  columns: Column[] = [];
  newEmppleado!: FormGroup;
  returnUrl: string = '/';
  selectedEncargado!: Encargado;

  @ViewChild('advancedTable') advancedTable: any;
  @ViewChild('content', { static: true }) content: any;
  @ViewChild('deleteEncargadoModal', { static: true }) deleteEncargadoModal: any;

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
      this.pageTitle = [{ label: 'Inicio', path: '/' }, { label: 'Encargados', path: '/', active: true }];
      this._fetchData();
      // initialize advance table 
      this.initAdvancedTableData();

      this.newEmppleado = this.fb.group({
        name: ['', Validators.required],
      });

      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/apps/encargados/editar';

    }

  // convenience getter for easy access to form fields
  get form1() { return this.newEmppleado.controls; }

  /**
 * opens modal
 * @param title title of modal 
 * @param data data to be used in modal
 */
 
  openModalDelete(): void {
    this.activeModal.open(this.deleteEncargadoModal, { centered: true, windowClass: 'delete-modal' });
  }  

  deleteEncargado(): void{
    this.service.deleteEncargadoss(this.selectedEncargado.enca_Id || 0).subscribe(
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
    this.service.getEncargados()
  .subscribe((response: any)=>{
    this.encargados = response.data;
  });
  }

  


  /**
   * initialize advance table columns
   */
  initAdvancedTableData(): void {
    this.columns = [

      {
        name: 'enca_Id',
        label: 'ID',
        formatter: (encargado: Encargado) => encargado.enca_Id
      },
      {
        name: 'nombreCompleto',
        label: 'Nombre',
        formatter: (encargado: Encargado) => encargado.nombreCompleto
      },
     
      {
        name: 'enca_Identidad',
        label: 'Identidad',
        formatter: (encargado: Encargado) => encargado.enca_Identidad
      },
      {
        name: 'enca_SexoDesc',
        label: 'Sexo',
        formatter: (encargado: Encargado) => encargado.enca_SexoDesc
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
    document.querySelectorAll('.encargado').forEach((e) => {
      e.addEventListener("click", () => {
        const encargadoId = e.getAttribute('id');
        const encargado = this.encargados.find((enc: Encargado) => enc.enca_Id === Number(encargadoId));
        if (encargado) {
          this.Editar(encargado);
        }
      });
    });


    document.querySelectorAll('.delete').forEach((e) => {
      e.addEventListener("click", () => {  
        const selectedId = Number(e.id);
        this.selectedEncargado = this.encargados.find(enc => enc.enca_Id === selectedId) || this.selectedEncargado;
        if (this.selectedEncargado) {
          this.newEmppleado = this.fb.group({
            name: [this.selectedEncargado.nombreCompleto || '', Validators.required],
          });
          this.openModalDelete();
        }
      });
    })
  }
  

  // action 
  empleadoActionFormatter(encargado: Encargado): any {
    return this.sanitizer.bypassSecurityTrustHtml(
      `<a class="edit action-icon encargado" id="${encargado.enca_Id}" role="button">
        <i class="mdi mdi-square-edit-outline" style="color: #6658dd;"></i>
      </a>
      <a href="javascript:void(0);" class="delete action-icon" id="${encargado.enca_Id}"> <i class="mdi mdi-delete" style="color: #9f100e;"></i></a>`
    );
  }
  

  Editar(encargado: Encargado) {
    console.log("si llegaaa");
       localStorage.setItem("ID2", encargado.enca_Id!.toString());
       this.router.navigate([this.returnUrl]); 
       console.log("si llegaaa???");
   }


    /**
  * Match table data with search input
  * @param row Table row
  * @param term Search the value
  */
    matches(row: Encargado, term: string) {
      return (row.enca_Id?.toString().includes(term) ||
              row.nombreCompleto?.toLowerCase().includes(term));
    }

  /**
   * Search Method
  */
  searchData(searchTerm: string): void {
    if (searchTerm === '') {
      this._fetchData();
    }
    else {
      let updatedData = this.encargados;
      //  filter
      updatedData = updatedData.filter(encargado => this.matches(encargado, searchTerm));
      this.encargados = updatedData;
    }

  }

  Agregar(){
    this.router.navigate(['crear']);
  }


  
}

