import { Component, OnInit, ViewChild, AfterViewInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Column } from 'src/app/shared/advanced-table/advanced-table.component';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { Usuario } from '../Models';
import { ServiceService } from 'src/app/apps/usuarios/Service/service.service';


@Component({
    selector: 'app-usuarios-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    // providers: [MessageService]
  })
  export class ListComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  usuarios: Usuario[] = [];
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
    this.pageTitle = [{ label: 'Inicio', path: '/' }, { label: 'Usuario', path: '/', active: true }];
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
    this.service.getUsuarios()
  .subscribe((response: any)=>{
    this.usuarios = response.data;
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
        name: 'usua_Id',
        label: 'ID',
        formatter: (usuario: Usuario) => usuario.usua_Id
      },
      {
        name: 'usua_NombreUsuario',
        label: 'Nombre',
        formatter: (usuario: Usuario) => usuario.usua_NombreUsuario
      },
      {
        name: 'Action',
        label: 'Action',
        width: 82,
        formatter: this.usuarioActionFormatter.bind(this),
      }]
  }

  /**
 *  handles operations that need to be performed after loading table
 */


  
    
  


  // formats name cell
  usuarioNameFormatter(usuario: Usuario): any {
    return this.sanitizer.bypassSecurityTrustHtml(
      `
      <div class="table-user">
      <a href="javascript:void(0);" class="customer text-body fw-semibold" id="${usuario.usua_Id}">${usuario.usua_NombreUsuario}</a>
      `
    );
  }

  // action cell formatter
  usuarioActionFormatter(usuario: Usuario): any {
    return this.sanitizer.bypassSecurityTrustHtml(
      ` <a href="javascript:void(0);" class="edit action-icon" id="${usuario.usua_Id}"> <i class="mdi mdi-square-edit-outline" ></i></a>
        <a href="javascript:void(0);" class="delete action-icon" id="${usuario.usua_Id}"> <i class="mdi mdi-delete"></i></a>`
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
matches(row: Usuario, term: string) {
  return (row.usua_Id?.toString().includes(term) ||
          row.usua_NombreUsuario?.toLowerCase().includes(term));
}

  /**
   * Search Method
  */
  searchData(searchTerm: string): void {
    if (searchTerm === '') {
      this._fetchData();
    }
    else {
      let updatedData = this.usuarios;
      //  filter
      updatedData = updatedData.filter(usuario => this.matches(usuario, searchTerm));
      this.usuarios = updatedData;
    }

  }

}
// function showSuccess() {
//   throw new Error('Function not implemented.');
// }

