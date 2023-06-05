import { Component, OnInit, ViewChild, AfterViewInit  } from '@angular/core';
import { FormBuilder, FormGroup, FormControl,Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Column } from 'src/app/shared/advanced-table/advanced-table.component';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';

import { Medicamento } from '../../Models';
import {ServiceService} from '../Service/service.service';


import Swal from 'sweetalert2';
import { Select2Data } from 'ng-select2-component';

@Component({
    selector: 'app-medicamentos-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
 
  })
  export class ListComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  medicamentos: Medicamento[] = [];
  columns: Column[] = [];
  selectedMedicamento!: Medicamento;
  esEditar!: boolean;
  newMedicamento!: FormGroup;
  proveedores: Select2Data = [];
  centros: Select2Data = [];
  pageSizeOptions: number[] = [5, 10, 25, 50];
  //soloNumeros: boolean = false;

  @ViewChild('advancedTable') advancedTable: any;
  @ViewChild('content', { static: true }) content: any;
  @ViewChild('deleteMedicamentoModal', { static: true }) deleteMedicamentoModal: any;

  constructor (
    private sanitizer: DomSanitizer,
    public activeModal: NgbModal,
    private fb: FormBuilder,
    private service: ServiceService,

  ) { }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Inicio', path: '/' }, { label: 'Medicamentos', path: '/', active: true }];

    this._fetchData();
    // initialize advance table 
    this.initAdvancedTableData();

    this.newMedicamento = this.fb.group({
      name: ['', Validators.required],
      Proveedor: new FormControl('', Validators.required),
      Centro: new FormControl('', Validators.required),
    });
    
    
    this.service.getProveedor().subscribe((response: any) => {
      let optionsProveedores = response.data.map((item: any) => ({
        value: item.prov_Id,
        label: item.prov_Nombre
      }));

      this.proveedores = [{
        label: 'Escoja una proveedor',
        options: optionsProveedores
        },
      ];
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
    });

  }

  // convenience getter for easy access to form fields
  get form1() { return this.newMedicamento.controls; }

  /**
 * opens modal
 * @param title title of modal 
 * @param data data to be used in modal
 */
  openModal(isEditOrNew: string): void {
    
    if(isEditOrNew === "new"){
      this.newMedicamento.reset();
      this.esEditar = false;
    } else{
      this.esEditar = true;
    }

    this.activeModal.open(this.content, { centered: true });
  }

  openModalDelete(): void {
    this.activeModal.open(this.deleteMedicamentoModal, { centered: true, windowClass: 'delete-modal' });
  }  

  deleteMedicamento(): void{
    this.service.deleteMedicamento(this.selectedMedicamento.medi_Id || 0).subscribe(
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
    this._fetchData();
    this.activeModal.dismissAll('');
  }

  submitForm(): void {
    if(this.newMedicamento.invalid){
      console.log("pollito");
      console.log(this.newMedicamento.value.Proveedor,);
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
    const medicamento: Medicamento = {
      medi_Id: this.selectedMedicamento?.medi_Id || 0,
      medi_Nombre: this.newMedicamento.value.name ,
      prov_Id: this.newMedicamento.value.Proveedor,
      cent_Id: this.newMedicamento.value.Centro,
      medi_UsuCreacion: 1,
      medi_UsuModificacion: 1,
    }

    if(this.esEditar){

      this.service.editMedicamentos(medicamento).subscribe(
        (response: any) => {
          console.log("se pudo:", response);
          this._fetchData();
          //console.log(medicamento,"centrossss")
          //console.log(this.newMedicamento.value.Centro,"centro")
          if(response.message == "YaExiste"){
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1700,
              timerProgressBar: true,
              titleText: '¡Ya existe una  con ese numero!',
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
      
      this.service.addMedicamentos(medicamento).subscribe(
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
              titleText: '¡Ya existe una  con ese numero!',
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
              background: '#fff0f0f5'
            }).then(() => {
              // Acción luego de cerrarse el toast
            });
          }
          else if(response.message == "Exitoso"){
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
        },
        (error) => {
          console.log("no se pudo:", error);
        }
      )
      
    }

    this.activeModal.dismissAll('');
  }


  _fetchData(): void {
    this.service.getMedicamentos()
  .subscribe((response: any)=>{
    this.medicamentos = response.data;
    console.log(this.medicamentos);
  });
  }

  /**
   * initialize advance table columns
   */
  initAdvancedTableData(): void {
    console.log(this.medicamentos);
    this.columns = [
     
      {
        name: 'medi_Id',
        label: 'ID',
        formatter: (medicamento: Medicamento) => medicamento.medi_Id
      },
      {
        name: 'medi_Nombre',
        label: 'Medicamento',
        formatter: (medicamento: Medicamento) => medicamento.medi_Nombre
      },
      {
        name: 'prov_Nombre',
        label: 'Proveedor',
        formatter: (medicamento: Medicamento) => medicamento.prov_Nombre
      },
      {
        name: 'Action',
        label: 'Acciones',
        width: 82,
        formatter: this.medicamentoActionFormatter.bind(this),
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
        this.selectedMedicamento = this.medicamentos.find(medicamento => medicamento.medi_Id === selectedId) || this.selectedMedicamento;
        console.log(this.selectedMedicamento.prov_Id,"hola")
        if (this.selectedMedicamento) {
          this.newMedicamento = this.fb.group({
            name: [this.selectedMedicamento.medi_Nombre || '', Validators.required],
            Proveedor: [this.selectedMedicamento.prov_Id || '', Validators.required],
            Centro: [this.selectedMedicamento.cent_Id || '', Validators.required],
          });
          console.log(this.selectedMedicamento.prov_Id,this.newMedicamento.value.Proveedor)
          console.log(this.selectedMedicamento.cent_Id,this.newMedicamento.value.Centro, "aquiiii")
          this.openModal("edit");
        }
      });
    });
    
    document.querySelectorAll('.delete').forEach((e) => {
      e.addEventListener("click", () => {  
        const selectedId = Number(e.id);
        this.selectedMedicamento = this.medicamentos.find(medicamento => medicamento.medi_Id === selectedId) || this.selectedMedicamento;
        if (this.selectedMedicamento) {
          this.newMedicamento= this.fb.group({
            name: [this.selectedMedicamento.medi_Nombre || '', Validators.required],
          });
          this.openModalDelete();
        }
      });
    })
  }


  // formats name cell
  MedicamentoNameFormatter(medicamento: Medicamento): any {
    return this.sanitizer.bypassSecurityTrustHtml(
      `
      <div class="table-user">
      <a href="javascript:void(0);" class="customer text-body fw-semibold" id="${medicamento.medi_Id}">${medicamento.medi_Nombre}</a>
      </div>
      `
    );
  }

  // action cell formatter
  medicamentoActionFormatter(medicamento: Medicamento): any {
    return this.sanitizer.bypassSecurityTrustHtml(
      `<a href="javascript:void(0);" class="edit action-icon" id="${medicamento.medi_Id}"> <i class="mdi mdi-square-edit-outline" style="color: #6658dd;"></i></a>
      <a href="javascript:void(0);" class="delete action-icon" id="${medicamento.medi_Id}"> <i class="mdi mdi-delete" style="color: #9f100e;"></i></a>`
    );
  }
  
  

  /**
* Match table data with search input
* @param row Table row
* @param term Search the value
*/
matches(row: Medicamento, term: string) {
  return (row.medi_Id?.toString().includes(term) ||
          row.medi_Nombre?.toLowerCase().includes(term));
}

  /**
   * Search Method
  */
  searchData(searchTerm: string): void {
    if (searchTerm === '') {
      this._fetchData();
    }
    else {
      let updatedData = this.medicamentos;
      //  filter
      updatedData = updatedData.filter(medicamento => this.matches(medicamento, searchTerm));
      this.medicamentos = updatedData;
    }

  }

}

