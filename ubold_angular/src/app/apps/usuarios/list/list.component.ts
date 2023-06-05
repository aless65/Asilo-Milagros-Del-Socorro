import { Component, OnInit, ViewChild, AfterViewInit  } from '@angular/core';
import { FormBuilder, FormGroup, FormControl,Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Column } from 'src/app/shared/advanced-table/advanced-table.component';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';

import { Usuario } from '../../Models';
import {ServiceService} from 'src/app/apps/Service/service.service';
//import {ServiceServiceU} from '../Service/service.service';


import Swal from 'sweetalert2';
import { Select2Data } from 'ng-select2-component';

@Component({
    selector: 'app-usuarios-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
 
  })
  export class ListComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  usuarios: Usuario[] = [];
  columns: Column[] = [];
  selectedUsuario!: Usuario;
  esEditar!: boolean;
  newUsuario!: FormGroup;
  roles: Select2Data = [];
  empleados: Select2Data = [];
  isAdmin: boolean = false;
  pageSizeOptions: number[] = [5, 10, 25, 50];
  //soloNumeros: boolean = false;

  @ViewChild('advancedTable') advancedTable: any;
  @ViewChild('content', { static: true }) content: any;
  @ViewChild('deleteUsuarioModal', { static: true }) deleteUsuarioModal: any;

  constructor (
    private sanitizer: DomSanitizer,
    public activeModal: NgbModal,
    private fb: FormBuilder,
    private service: ServiceService,
    //private service2: ServiceServiceU,

  ) { }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Inicio', path: '/' }, { label: 'Usuarios', path: '/', active: true }];

    this._fetchData();
    // initialize advance table 
    this.initAdvancedTableData();

    this.newUsuario = this.fb.group({
      name: ['', Validators.required],
      rol: new FormControl('', Validators.required),
      empleado: new FormControl('', Validators.required),
      admin: [this.isAdmin],
      contra:['', Validators.required],
    });
    //this.soloNumeros = true; // Habilitar solo números
    this.service.getRol().subscribe((response: any) => {
      let optionsRoles = response.data.map((item: any) => ({
        value: item.role_Id,
        label: item.role_Nombre
      }));

      this.roles = [{
        label: 'Escoja un Rol',
        options: optionsRoles
        },
      ];
      console.log(this.roles,"cargar ");
    });

    
   
    this.service.getEmpleado().subscribe((response: any) => {
      let optionsEmpleados = response.data.map((item: any) => ({
        value: item.empe_Id,
        label: item.empe_NombreCompleto
      }));

      this.empleados = [{
        label: 'Escoja un Empleado',
        options: optionsEmpleados
        },
      ];
      console.log(this.empleados,"cargar empleados");
    });

  }

  // convenience getter for easy access to form fields
  get form1() { return this.newUsuario.controls; }

  /**
 * opens modal
 * @param title title of modal 
 * @param data data to be used in modal
 */
  openModal(isEditOrNew: string): void {
    
    if(isEditOrNew === "new"){
      this.newUsuario.reset();
      this.esEditar = false;
    } else{
      this.esEditar = true;
    }

    this.activeModal.open(this.content, { centered: true });
  }

  openModalDelete(): void {
    this.activeModal.open(this.deleteUsuarioModal, { centered: true, windowClass: 'delete-modal' });
  }  

  deleteUsuario(): void{
    this.service.deleteUsuarios(this.selectedUsuario.usua_Id || 0).subscribe(
        (response: any) => {
          console.log("se pudo:", response);
          this._fetchData();
          if (this.newUsuario.invalid) {
            console.log("pollito");
            console.log(this.newUsuario.value.admin,);
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1700,
              timerProgressBar: true,
              titleText: '¡Llene todos los campos!',
              icon: 'warning',
              background: '#f6f6baf2'
            }).then(() => {
              // Acción luego de cerrarse el toast
            });
            return;
          }
        },
        (error) => {
          console.log("no se pudo:", error);
        }
      )
    this._fetchData();
    this.activeModal.dismissAll('');
  }

  submitForm(): void {
    if (this.newUsuario.invalid || (this.newUsuario.value.adminCheckbox === null )) {
      console.log("pollito");
      console.log(this.newUsuario.value.adminCheckbox);
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1700,
        timerProgressBar: true,
        titleText: '¡Llene todos los campos!',
        icon: 'warning',
        background: '#f6f6baf2'
      }).then(() => {
        // Acción luego de cerrarse el toast
      });
      return;
    }
    console.log("aqui")
    const usuario: Usuario = {
      usua_Id: this.selectedUsuario?.usua_Id || 0,
      usua_NombreUsuario: this.newUsuario.value.name,
      usua_Contrasena: this.newUsuario.value.contra,
      usua_EsAdmin: this.newUsuario.value.admin,
      role_Id: this.newUsuario.value.rol,
      empe_Id: this.newUsuario.value.empleado,
      usua_UsuCreacion: 1,
      usua_UsuModificacion: 1,
    }
    if(this.esEditar){

      this.service.editUsuarios(usuario).subscribe(
        (response: any) => {
          console.log("se pudo:", response);
          this._fetchData();
          
          if(response.message == "El usuario ha sido editado con éxito"){
            Swal.fire({
              toast: true,
              position: 'top-end',
              title: '¡Perfecto!',
              text: 'El registro se editó con éxito!',
              icon: 'success',
              showConfirmButton: false,
              timer: 1850,
              timerProgressBar: true
            }).then(() => {
               
            });
          }
          else if(response.message == "ErrorInespero"){
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1700,
              timerProgressBar: true,
              titleText: '¡Ha ocurrido en error inesperado!',
              icon: 'error',
              background: '#fff0f0f5'
            }).then(() => {
              // Acción luego de cerrarse el toast
            });
          }
          else if(response.message == "Exitoso"){
            Swal.fire({
              title: '¡Perfecto!',
              text: 'El registro se editó con éxito!',
              icon: 'success',
              showConfirmButton: false,
              timer: 1850,
              timerProgressBar: true
            }).then(() => {
               
            });
          }
          
        },
        (error) => {
          console.log("no se pudo:", error);
        }
      )
      
    } else{
      
      this.service.addUsuarios(usuario).subscribe(
        (response: any) => {
          // this.openSuccess();
          // this.showSuccess();
          console.log("se pudo:", response);
          this._fetchData();
          if(response.message == "El usuario se ha insertado"){
            Swal.fire({
              toast: true,
              position: 'top-end',
              title: '¡Perfecto!',
              text: 'El registro se guardó con éxito!',
              icon: 'success',
              showConfirmButton: false,
              timer: 1850,
              timerProgressBar: true
            }).then(() => {
            });
          }
          else if(response.message == "Este usuario ya existe"){
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1700,
              timerProgressBar: true,
              titleText: '¡Este usuario ya existe!',
              icon: 'error',
              background: '#fff0f0f5'
            }).then(() => {
              // Acción luego de cerrarse el toast
            });
          }
          
        },
        (error) => {
          console.log("no se pudo:", error);
        }
      )
      
    }

    this.activeModal.dismissAll('');
  }


  _fetchData(): void {
    this.service.getUsuarios()
  .subscribe((response: any)=>{
    this.usuarios = response.data;
    console.log(this.usuarios);
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
        name: 'role_Nombre',
        label: 'Rol',
        formatter: (usuario: Usuario) => usuario.role_Nombre
      },
      {
        name: 'usua_EsAdmin',
        label: 'Es Admin',
        formatter: this.usuarioEsAdminFormatter.bind(this),
      },
      {
        name: 'Action',
        label: 'Action',
        width: 82,
        formatter: this.usuarioActionFormatter.bind(this),
      }]
  }

  usuarioEsAdminFormatter(usuario: Usuario): any {
    return this.sanitizer.bypassSecurityTrustHtml(
      `<input type="checkbox" ${usuario.usua_EsAdmin ? 'checked' : ''} disabled>`
    );
  }
 
  

  // formats name cell
  usuarioNameFormatter(usuario: Usuario): any {
    return this.sanitizer.bypassSecurityTrustHtml(
      `
      <div class="table-user">
      <a href="javascript:void(0);" class="customer text-body fw-semibold" id="${usuario.usua_Id}">${usuario.usua_NombreUsuario}</a>
      `
    );
  }

  /**
 *  handles operations that need to be performed after loading table
 */


  handleTableLoad(event: any): void {
    // product cell
    document.querySelectorAll('.edit').forEach((e) => {
      e.addEventListener("click", () => {   
        const selectedId = Number(e.id);
        this.selectedUsuario = this.usuarios.find(usuario => usuario.usua_Id === selectedId) || this.selectedUsuario;
        if (this.selectedUsuario) {
          this.newUsuario = this.fb.group({
            name: [this.selectedUsuario.usua_NombreUsuario || '', Validators.required],
            contra:[this.selectedUsuario.usua_Contrasena || '', Validators.required],
            rol: [this.selectedUsuario.role_Id || '', Validators.required],
            empleado: [this.selectedUsuario.empe_Id || '', Validators.required],
            admin: [this.selectedUsuario.usua_EsAdmin || ''],
            
          });
          this.openModal("edit");
        }
      });
    });
    
    document.querySelectorAll('.delete').forEach((e) => {
      e.addEventListener("click", () => {  
        const selectedId = Number(e.id);
        this.selectedUsuario = this.usuarios.find(usuario => usuario.usua_Id=== selectedId) || this.selectedUsuario;
        if (this.selectedUsuario) {
          this.newUsuario= this.fb.group({
            name: [this.selectedUsuario.usua_NombreUsuario || '', Validators.required],
            contra:[this.selectedUsuario.usua_Contrasena || '', Validators.required],
            rol: [this.selectedUsuario.role_Id || '', Validators.required],
            empleado: [this.selectedUsuario.empe_Id || '', Validators.required],
            adminCheckbox: [this.selectedUsuario.usua_EsAdmin || ''],
          });
          this.openModalDelete();
        }
      });
    })
  }


  // formats name cell
  UsuarioNameFormatter(usuario: Usuario): any {
    return this.sanitizer.bypassSecurityTrustHtml(
      `
      <div class="table-user">
      <a href="javascript:void(0);" class="customer text-body fw-semibold" id="${usuario.usua_Id}">${usuario.usua_NombreUsuario}</a>
      </div>
      `
    );
  }

  // action cell formatter
  usuarioActionFormatter(usuario: Usuario): any {
    return this.sanitizer.bypassSecurityTrustHtml(
      `<a href="javascript:void(0);" class="edit action-icon" id="${usuario.usua_Id}"> <i class="mdi mdi-square-edit-outline" style="color: #6658dd;"></i></a>
      <a href="javascript:void(0);" class="delete action-icon" id="${usuario.usua_Id}"> <i class="mdi mdi-delete" style="color: #9f100e;"></i></a>`
    );
  }
  
  

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

