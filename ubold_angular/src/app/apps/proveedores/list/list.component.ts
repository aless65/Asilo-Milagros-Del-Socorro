import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Column } from 'src/app/shared/advanced-table/advanced-table.component';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { Proveedor } from '../../Models';
import { ServiceService } from 'src/app/apps/proveedores/Service/service.service';
// import { ToastModule } from 'primeng/toast';
// import { MessageService } from 'primeng/api';
// import { NgToastService } from 'ng-angular-popup';

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

  @ViewChild('advancedTable') advancedTable: any;
  @ViewChild('content', { static: true }) content: any;

  constructor (
    private sanitizer: DomSanitizer,
    public activeModal: NgbModal,
    private fb: FormBuilder,
    private service: ServiceService,
    // private toast: NgToastService,
    // private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Inicio', path: '/' }, { label: 'Proveedores', path: '/', active: true }];
    this._fetchData();
    // initialize advance table 
    this.initAdvancedTableData();

    this.newProveedor = this.fb.group({
      name: ['', Validators.required],
      correo: ['', Validators.required],
      phone: ['', Validators.required],
      muni: ['', Validators.required],
      direccion: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get form1() { return this.newProveedor.controls; }

  /**
 * opens modal
 * @param title title of modal 
 * @param data data to be used in modal
 */
  openModal(): void {
    this.activeModal.open(this.content, { centered: true });
  }

  submitForm(): void {
    if(this.newProveedor.invalid){
      console.log("pipi");
      return;
    }

    const proveedor: Proveedor = {
        prov_Nombre: this.newProveedor.value.name,
        prov_CorreoElectronico: this.newProveedor.value.correo,
        prov_Telefono: this.newProveedor.value.phone,
        muni_Id: this.newProveedor.value.muni,
        muni_Direccion: this.newProveedor.value.direccion,
        prov_UsuCreacion: 1,
    }


    this.service.addProveedores(proveedor).subscribe(
      (response: any) => {
        // this.openSuccess();
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
    this.service.getProveedores()
  .subscribe((response: any)=>{
    this.proveedores = response.data;
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
        name: 'prov_CorreoElectronico',
        label: 'Correo electrónico',
        formatter: (proveedor: Proveedor) => proveedor.prov_CorreoElectronico
      },
      {
        name: 'prov_Telefono',
        label: 'Teléfono',
        formatter: (proveedor: Proveedor) => proveedor.prov_Telefono
      },
      {
        name: 'prov_Direccion',
        label: 'Dirección',
        formatter: (proveedor: Proveedor) => proveedor.prov_Direccion
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
      // e.addEventListener("click", () => {
      //   this.selectedContact = this.contacts[Number(e.id) - 1]

      // });
    })
  }

  // formats name cell
  proveedorNameFormatter(proveedor: Proveedor): any {
    return this.sanitizer.bypassSecurityTrustHtml(
      `
      <div class="table-user">
      <a href="javascript:void(0);" class="customer text-body fw-semibold" id="${proveedor.prov_Id}">${proveedor.prov_Nombre}</a>
      `
    );
  }

  // action cell formatter
  proveedorActionFormatter(): any {
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
matches(row: Proveedor, term: string) {
  return (row.prov_Id?.toString().includes(term) ||
          row.prov_Nombre?.toLowerCase().includes(term) ||
          row.prov_CorreoElectronico?.toLowerCase().includes(term) ||
          row.prov_Telefono?.toLowerCase().includes(term) ||
          row.prov_Direccion?.toLowerCase().includes(term));
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

}
// function showSuccess() {
//   throw new Error('Function not implemented.');
// }

