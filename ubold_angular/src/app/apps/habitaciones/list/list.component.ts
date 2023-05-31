import { Component, OnInit, ViewChild, AfterViewInit  } from '@angular/core';
import { FormBuilder, FormGroup, FormControl,Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Column } from 'src/app/shared/advanced-table/advanced-table.component';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';

import { Habitacion } from '../../Models';
import {ServiceService} from 'src/app/apps/Service/service.service';


import Swal from 'sweetalert2';
import { Select2Data } from 'ng-select2-component';

@Component({
    selector: 'app-habitaciones-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
 
  })
  export class ListComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  habitaciones: Habitacion[] = [];
  columns: Column[] = [];
  selectedHabitacion!: Habitacion;
  esEditar!: boolean;
  newHabitacion!: FormGroup;
  categorias: Select2Data = [];
  centros: Select2Data = [];
  soloNumeros: boolean = false;

  @ViewChild('advancedTable') advancedTable: any;
  @ViewChild('content', { static: true }) content: any;
  @ViewChild('deleteHabitacionModal', { static: true }) deleteHabitacionModal: any;

  constructor (
    private sanitizer: DomSanitizer,
    public activeModal: NgbModal,
    private fb: FormBuilder,
    private service: ServiceService,

  ) { }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Inicio', path: '/' }, { label: 'Habitaciones', path: '/', active: true }];

    this._fetchData();
    // initialize advance table 
    this.initAdvancedTableData();

    this.newHabitacion = this.fb.group({
      name: ['', Validators.required],
      Categoria: new FormControl('', Validators.required),
      Centro: new FormControl('', Validators.required),
    });
    this.soloNumeros = true; // Habilitar solo números
    this.service.getCategoria().subscribe((response: any) => {
      let optionsCategorias = response.data.map((item: any) => ({
        value: item.cate_Id,
        label: item.cate_Nombre
      }));

      this.categorias = [{
        label: 'Escoja una Categoria',
        options: optionsCategorias
        },
      ];
      console.log(this.categorias,"cargar categorias");
    });

    
   
    this.service.getCentros().subscribe((response: any) => {
      let optionsCentros = response.data.map((item: any) => ({
        value: item.cent_Id,
        label: item.cent_Nombre
      }));

      this.centros = [{
        label: 'Escoja un Centro',
        options: optionsCentros
        },
      ];
      console.log(this.centros,"cargar centros");
    });

  }

  // convenience getter for easy access to form fields
  get form1() { return this.newHabitacion.controls; }

  /**
 * opens modal
 * @param title title of modal 
 * @param data data to be used in modal
 */
  openModal(isEditOrNew: string): void {
    
    if(isEditOrNew === "new"){
      this.newHabitacion.reset();
      this.esEditar = false;
    } else{
      this.esEditar = true;
    }

    this.activeModal.open(this.content, { centered: true });
  }

  openModalDelete(): void {
    this.activeModal.open(this.deleteHabitacionModal, { centered: true, windowClass: 'delete-modal' });
  }  

  deleteHabitacion(): void{
    this.service.deleteHabitaciones(this.selectedHabitacion.habi_Id || 0).subscribe(
        (response: any) => {
          console.log("se pudo:", response);
          this._fetchData();
          if(response.message == "El registro no puede ser eliminado porque está siendo usado"){
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1700,
              timerProgressBar: true,
              titleText: 'El registro no puede ser eliminado porque está siendo usado',
              icon: 'error',
              background: '#f47171f0'
            }).then(() => {
              // Acción luego de cerrarse el toast
            });
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
    if(this.newHabitacion.invalid){
      console.log("pollito");
      console.log(this.newHabitacion.value.Categoria,);
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
    const habitacion: Habitacion = {
      habi_Id: this.selectedHabitacion?.habi_Id || 0,
      habi_Numero: this.newHabitacion.value.name ,
      cate_Id: this.newHabitacion.value.Categoria,
      cent_Id: this.newHabitacion.value.Centro,
      habi_UsuCreacion: 1,
      habi_UsuModificacion: 1,
    }

    if(this.esEditar){

      this.service.editHabitaciones(habitacion).subscribe(
        (response: any) => {
          console.log("se pudo:", response);
          this._fetchData();
          if(response.message == "YaExiste"){
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1700,
              timerProgressBar: true,
              titleText: '¡Ya existe una habitación con ese numero!',
              icon: 'error',
              background: '#fff0f0f5'
            }).then(() => {
              // Acción luego de cerrarse el toast
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
              background: '#f47171f0'
            }).then(() => {
              // Acción luego de cerrarse el toast
            });
          }
          else if(response.message == "Exitoso"){
            Swal.fire({
              title: 'Perfecto!',
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
      
      this.service.addHabitaciones(habitacion).subscribe(
        (response: any) => {
          // this.openSuccess();
          // this.showSuccess();
          console.log("se pudo:", response);
          this._fetchData();
          if(response.message == "YaExiste"){
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1700,
              timerProgressBar: true,
              titleText: '¡Ya existe una habitación con ese numero!',
              icon: 'error',
              background: '#fff0f0f5'
            }).then(() => {
              // Acción luego de cerrarse el toast
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
              background: '#f47171f0'
            }).then(() => {
              // Acción luego de cerrarse el toast
            });
          }
          else if(response.message == "Exitoso"){
            Swal.fire({
              toast: true,
              position: 'top-end',
              title: 'Perfecto!',
              text: 'El registro se guardó con éxito!',
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
      
    }

    this.activeModal.dismissAll('');
  }


  _fetchData(): void {
    this.service.getHabitaciones()
  .subscribe((response: any)=>{
    this.habitaciones = response.data;
    console.log(this.habitaciones);
  });
  }

  /**
   * initialize advance table columns
   */
  initAdvancedTableData(): void {
    console.log(this.habitaciones);
    this.columns = [
     
      {
        name: 'habi_Id',
        label: 'ID',
        formatter: (habitacion: Habitacion) => habitacion.habi_Id
      },
      {
        name: 'cate_Nombre',
        label: 'Categoria',
        formatter: (habitacion: Habitacion) => habitacion.cate_Nombre
      },
      {
        name: 'Action',
        label: 'Acciones',
        width: 82,
        formatter: this.habitacionActionFormatter.bind(this),
      }]
  }

  /**
 *  handles operations that need to be performed after loading table
 */


  handleTableLoad(event: any): void {
    // product cell
    document.querySelectorAll('.edit').forEach((e) => {
      e.addEventListener("click", () => {   
        const selectedId = Number(e.id);
        this.selectedHabitacion = this.habitaciones.find(habitacion => habitacion.habi_Id === selectedId) || this.selectedHabitacion;
        if (this.selectedHabitacion) {
          this.newHabitacion = this.fb.group({
            name: [this.selectedHabitacion.habi_Numero || '', Validators.required],
            Categoria: [this.selectedHabitacion.cate_Id || '', Validators.required],
            Centro: [this.selectedHabitacion.cent_Id || '', Validators.required],
          });
          this.openModal("edit");
        }
      });
    });
    
    document.querySelectorAll('.delete').forEach((e) => {
      e.addEventListener("click", () => {  
        const selectedId = Number(e.id);
        this.selectedHabitacion = this.habitaciones.find(habitacion => habitacion.habi_Id === selectedId) || this.selectedHabitacion;
        if (this.selectedHabitacion) {
          this.newHabitacion= this.fb.group({
            name: [this.selectedHabitacion.habi_Numero || '', Validators.required],
          });
          this.openModalDelete();
        }
      });
    })
  }


  // formats name cell
  habitacionNameFormatter(habitacion: Habitacion): any {
    return this.sanitizer.bypassSecurityTrustHtml(
      `
      <div class="table-user">
      <a href="javascript:void(0);" class="customer text-body fw-semibold" id="${habitacion.habi_Id}">${habitacion.habi_Numero}</a>
      </div>
      `
    );
  }

  // action cell formatter
  habitacionActionFormatter(habitacion: Habitacion): any {
    return this.sanitizer.bypassSecurityTrustHtml(
      `<a href="javascript:void(0);" class="edit action-icon" id="${habitacion.habi_Id}"> <i class="mdi mdi-square-edit-outline" style="color: #6658dd;"></i></a>
      <a href="javascript:void(0);" class="delete action-icon" id="${habitacion.habi_Id}"> <i class="mdi mdi-delete" style="color: #9f100e;"></i></a>`
    );
  }
  
  

  /**
* Match table data with search input
* @param row Table row
* @param term Search the value
*/
matches(row: Habitacion, term: string) {
  return (row.habi_Id?.toString().includes(term) ||
          row.cate_Nombre?.toLowerCase().includes(term));
}

  /**
   * Search Method
  */
  searchData(searchTerm: string): void {
    if (searchTerm === '') {
      this._fetchData();
    }
    else {
      let updatedData = this.habitaciones;
      //  filter
      updatedData = updatedData.filter(habitacion => this.matches(habitacion, searchTerm));
      this.habitaciones = updatedData;
    }

  }

}

