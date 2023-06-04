import { Component, OnInit, ViewChild, AfterViewInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Column } from 'src/app/shared/advanced-table/advanced-table.component';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { Muerto } from '../../Models';
import { ServiceService } from 'src/app/apps/muertos/Service/service.service';
import Swal from 'sweetalert2';
import { Select2Data } from 'ng-select2-component';

@Component({
    selector: 'app-enfermedades-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
 
  })
  export class ListComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  muertos: Muerto[] = [];
  columns: Column[] = [];
  selectedMuerto!: Muerto;
  esEditar!: boolean;
  newMuerto!: FormGroup;
  residente: Select2Data =[];

  @ViewChild('advancedTable') advancedTable: any;
  @ViewChild('content', { static: true }) content: any;
  @ViewChild('deleteMuertoModal', { static: true }) deleteMuertoModal: any;

  constructor (
    private sanitizer: DomSanitizer,
    public activeModal: NgbModal,
    private fb: FormBuilder,
    private service: ServiceService,

  ) { }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Inicio', path: '/' }, { label: 'Muertos', path: '/', active: true }];

    this._fetchData();
    // initialize advance table 
    this.initAdvancedTableData();

    this.newMuerto = this.fb.group({
      name: ['', Validators.required],
      residente: [0, Validators.required],
      fechaHora: ['', [Validators.required]]
    });



    this.service.getResidentes().subscribe((response: any) => {
      let optionsResidentes = response.data.map((item: any) => ({
        value: item.resi_Id,
        label: item.resi_Nombres+' '+item.resi_Apellidos+' / '+item.resi_Identidad
      }));

      this.residente = [{
        label: 'Escoja un Residente',
        options: optionsResidentes
        },
      ];
      console.log(this.residente);
    });

  }

  // convenience getter for easy access to form fields
  get form1() { return this.newMuerto.controls; }

  /**
 * opens modal
 * @param title title of modal 
 * @param data data to be used in modal
 */
  openModal(isEditOrNew: string): void {
    
    if(isEditOrNew === "new"){
      this.newMuerto.reset();
      this.esEditar = false;
    } else{
      this.esEditar = true;
    }

    this.activeModal.open(this.content, { centered: true });
  }

  openModalDelete(): void {
    this.activeModal.open(this.deleteMuertoModal, { centered: true, windowClass: 'delete-modal' });
  }  

  deleteMuerto(): void{
    this.service.deleteMuertos(this.selectedMuerto.muer_Id || 0).subscribe(
        (response: any) => {
          console.log("se pudo:", response);
          this._fetchData();
          if(response.message == "La enfermedad no puede ser eliminada ya que está siendo usada en otro registro"){
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1700,
              timerProgressBar: true,
              titleText: 'La enfermedad no puede ser eliminada ya que está siendo usada en otro registro',
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
    console.log(this.newMuerto.value.residente,'residente')
    console.log(this.newMuerto.value.fechaHora,'fecha')
    const fechaHoraControl = this.newMuerto.get('fechaHora');

    if (fechaHoraControl) {
      const fechaHoraInput = new Date(fechaHoraControl.value); // Convertir a objeto Date
  
      const fechaHoraActual = new Date(); // Obtener la fecha y hora actual
  
      // Validar que la fecha y hora ingresadas no sean futuras
      if (fechaHoraInput > fechaHoraActual) {
        // La fecha y hora ingresadas son futuras, mostrar un mensaje de error o realizar alguna acción
        console.log('No se puede agregar una fecha y hora futura.');
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1700,
          timerProgressBar: true,
          titleText: '¡No se puede agregar una fecha y hora futura.!',
          icon: 'warning',
          background: '#f6f6baf2'
        }).then(() => {
          // Acción luego de cerrarse el toast
        });

        return; // Detener el envío del formulario
      }
    }
    if(this.newMuerto.invalid){
      console.log("pipi");
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

    const muerto: Muerto = {
      muer_Id: this.selectedMuerto?.muer_Id || 0,
      muer_Descripcion: this.newMuerto.value.name,
      resi_Id: this.newMuerto.value.residente,
      muer_FechaYHora: this.newMuerto.value.fechaHora,
      muer_UsuCreacion: 1,
      muer_UsuModificacion: 1,
    }

    if(this.esEditar){

      this.service.editMuertos(muerto).subscribe(
        (response: any) => {
          console.log("se pudo:", response);
          this._fetchData();
          if (response.message == "ha sido editado") {
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
          else {
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1700,
              timerProgressBar: true,
              titleText: '¡Ha ocurrido un error!',
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
      
    } else{
      
      this.service.addMuertos(muerto).subscribe(
        (response: any) => {
          // this.openSuccess();
          // this.showSuccess();
          console.log("se pudo:", response);
          this._fetchData();
          if (response.message == "La muerte ha sido insertada") {
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
          else if(response.message == "Ya existe"){
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1700,
              timerProgressBar: true,
              titleText: '¡No puede ser insertada!',
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
      
    }

    this.activeModal.dismissAll('');
  }


  _fetchData(): void {
    this.service.getMuertos()
  .subscribe((response: any)=>{
    this.muertos = response.data;
    console.log(this.muertos);
  });
  }

  /**
   * initialize advance table columns
   */
  initAdvancedTableData(): void {
    console.log(this.muertos);
    this.columns = [
     
      {
        name: 'muer_Id',
        label: 'ID',
        formatter: (muerto: Muerto) => muerto.muer_Id
      },
      {
        name: 'resi_NombreCompleto',
        label: 'Residente',
        formatter: (muerto: Muerto) => muerto.resi_NombreCompleto
      },
      {
        name: 'muer_Descripcion',
        label: 'Descripción',
        formatter: (muerto: Muerto) => muerto.muer_Descripcion
      },
      {
        name: 'Action',
        label: 'Acciones',
        width: 82,
        formatter: this.muertoActionFormatter.bind(this),
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
        this.selectedMuerto = this.muertos.find(muerto => muerto.muer_Id === selectedId) || this.selectedMuerto;
        if (this.selectedMuerto) {
          this.newMuerto = this.fb.group({
            name: [this.selectedMuerto.muer_Descripcion || '', Validators.required],
            residente: [this.selectedMuerto.resi_Id || 0, Validators.required],
            fechaHora: [this.selectedMuerto.muer_FechaYHora || '', Validators.required]
          });
          this.openModal("edit");
        }
      });
    });
    
    document.querySelectorAll('.delete').forEach((e) => {
      e.addEventListener("click", () => {  
        const selectedId = Number(e.id);
        this.selectedMuerto = this.muertos.find(muerto => muerto.muer_Id === selectedId) || this.selectedMuerto;
        if (this.selectedMuerto) {
          this.newMuerto = this.fb.group({
            name: [this.selectedMuerto.muer_Descripcion || '', Validators.required],
          });
          this.openModalDelete();
        }
      });
    })
  }


  // formats name cell
  muertoNameFormatter(muerto: Muerto): any {
    return this.sanitizer.bypassSecurityTrustHtml(
      `
      <div class="table-user">
      <a href="javascript:void(0);" class="customer text-body fw-semibold" id="${muerto.muer_Id}">${muerto.muer_Descripcion}</a>
      </div>
      `
    );
  }

  // action cell formatter
  muertoActionFormatter(muerto: Muerto): any {
    return this.sanitizer.bypassSecurityTrustHtml(
      ` <a href="javascript:void(0);"  class="edit action-icon" id="${muerto.muer_Id}"> <i class="mdi mdi-square-edit-outline" style="color: #6658dd;" ></i></a>
        <a href="javascript:void(0);" class="delete action-icon" id="${muerto.muer_Id}"> <i class="mdi mdi-delete" style="color: #9f100e;"></i></a>`
    );
  }

  /**
* Match table data with search input
* @param row Table row
* @param term Search the value
*/
matches(row: Muerto, term: string) {
  return (row.muer_Id?.toString().includes(term) ||
          row.muer_Descripcion?.toLowerCase().includes(term));
}

  /**
   * Search Method
  */
  searchData(searchTerm: string): void {
    if (searchTerm === '') {
      this._fetchData();
    }
    else {
      let updatedData = this.muertos;
      //  filter
      updatedData = updatedData.filter(muerto => this.matches(muerto, searchTerm));
      this.muertos = updatedData;
    }

  }

}

