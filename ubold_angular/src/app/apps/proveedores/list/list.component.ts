import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Column } from 'src/app/shared/advanced-table/advanced-table.component';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { Proveedor } from '../Model';
import { ServiceServiceP } from 'src/app/apps/proveedores/service.service';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
    selector: 'app-proveedores-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    // providers: [MessageService]
  })
  export class ListComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  proveedores: Proveedor[] = [];
  columns: Column[] = [];
  newProveedor!: FormGroup;
  returnUrl: string = '/';
  selectedProveedor!: Proveedor;

  @ViewChild('advancedTable') advancedTable: any;
  @ViewChild('content', { static: true }) content: any;
  @ViewChild('deleteProveedorModal', { static: true }) deleteProveedorModal: any;

  constructor (
    private sanitizer: DomSanitizer,
    public activeModal: NgbModal,
    private fb: FormBuilder,
    private service: ServiceServiceP,
    private router:Router,
    private route: ActivatedRoute,

 
    // private messageService: MessageService,
  ) { }

    ngOnInit(): void {
      this.pageTitle = [{ label: 'Inicio', path: '/' }, { label: 'Proveedor', path: '/', active: true }];
      this._fetchData();
      // initialize advance table 
      this.initAdvancedTableData();

      this.newProveedor = this.fb.group({
        name: ['', Validators.required],
      });

      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/apps/proveedores/editar';

    }

  // convenience getter for easy access to form fields
  get form1() { return this.newProveedor.controls; }

  /**
 * opens modal
 * @param title title of modal 
 * @param data data to be used in modal
 */
 
  openModalDelete(): void {
    this.activeModal.open(this.deleteProveedorModal, { centered: true, windowClass: 'delete-modal' });
  }  

  deleteProveedor(): void{
    this.service.deleteProveedores(this.selectedProveedor.prov_Id || 0).subscribe(
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
    this.service.getProveedor()
  .subscribe((response: any)=>{
    this.proveedores = response.data;
  });
  }

  


  /**
   * initialize advance table columns
   */
  initAdvancedTableData(): void {
    this.columns = [

      {
        name: 'prov_Id',
        label: 'ID',
        formatter: (proveedor: Proveedor) => proveedor.prov_Id
      },
      {
        name: 'prov_Nombre',
        label: 'Nombre',
        formatter: (proveedor: Proveedor) => proveedor.prov_Nombre
      },
      {
        name: 'prov_Telefono',
        label: 'Telefono',
        formatter: (proveedor: Proveedor) => proveedor.prov_Telefono
      },
      {
        name: 'prov_CorreoElectronico',
        label: 'Correo Elecctronico',
        formatter: (proveedor: Proveedor) => proveedor.prov_CorreoElectronico
      },
      {
        name: 'Action',
        label: 'Action',
        width: 82,
        formatter: this.proveedorActionFormatter.bind(this),
        sort: false
      }]
  }

  /**
 *  handles operations that need to be performed after loading table
 */
  handleTableLoad(event: any): void {
    // product cell
    document.querySelectorAll('.proveedor').forEach((e) => {
      e.addEventListener("click", () => {
        const proveedorId = e.getAttribute('id');
        const proveedor = this.proveedores.find((prove: Proveedor) => prove.prov_Id === Number(proveedorId));
        if (proveedor) {
          this.Editar(proveedor);
        }
      });
    });


    document.querySelectorAll('.delete').forEach((e) => {
      e.addEventListener("click", () => {  
        const selectedId = Number(e.id);
        this.selectedProveedor = this.proveedores.find(prove => prove.prov_Id === selectedId) || this.selectedProveedor;
        if (this.selectedProveedor) {
          this.newProveedor = this.fb.group({
            name: [this.selectedProveedor.prov_Nombre || '', Validators.required],
          });
          this.openModalDelete();
        }
      });
    })
  }
  

  // action 
  proveedorActionFormatter(proveedor: Proveedor): any {
    return this.sanitizer.bypassSecurityTrustHtml(
      `<a class="edit action-icon proveedor" id="${proveedor.prov_Id}" role="button">
        <i class="mdi mdi-square-edit-outline"></i>
      </a>
      <a href="javascript:void(0);" class="delete action-icon" id="${proveedor.prov_Id}"> <i class="mdi mdi-delete"></i></a>`
    );
  }
  

  Editar(proveedor: Proveedor) {
    console.log("si llegaaa");
       localStorage.setItem("ID2", proveedor.prov_Id!.toString());
       this.router.navigate([this.returnUrl]); 
       console.log("Hola_");
   }


    /**
  * Match table data with search input
  * @param row Table row
  * @param term Search the value
  */
    matches(row: Proveedor, term: string) {
      return (row.prov_Id?.toString().includes(term) ||
              row.prov_Nombre?.toLowerCase().includes(term));
    }

  /**
   * Search Method
  */
  searchData(searchTerm: string): void {
    if (searchTerm === '') {
      this._fetchData();
    }
    else {
      let updatedData = this.proveedores;
      //  filter
      updatedData = updatedData.filter(proveedor => this.matches(proveedor, searchTerm));
      this.proveedores = updatedData;
    }

  }

  Agregar(){
    this.router.navigate(['crear']);
  }


  
}
