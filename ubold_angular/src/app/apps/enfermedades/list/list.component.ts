import { Component, OnInit, ViewChild, AfterViewInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Column } from 'src/app/shared/advanced-table/advanced-table.component';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { Enfermedad } from '../../Models';
import { ServiceService } from 'src/app/apps/enfermedades/Service/service.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-enfermedades-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
 
  })
  export class ListComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  enfermedades: Enfermedad[] = [];
  columns: Column[] = [];
  selectedEnfermedad!: Enfermedad;
  esEditar!: boolean;
  newEnfermedad!: FormGroup;

  @ViewChild('advancedTable') advancedTable: any;
  @ViewChild('content', { static: true }) content: any;
  @ViewChild('deleteEnfermedadModal', { static: true }) deleteEnfermedadModal: any;

  constructor (
    private sanitizer: DomSanitizer,
    public activeModal: NgbModal,
    private fb: FormBuilder,
    private service: ServiceService,

  ) { }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Inicio', path: '/' }, { label: 'Enfermedades', path: '/', active: true }];

    this._fetchData();
    // initialize advance table 
    this.initAdvancedTableData();

    this.newEnfermedad = this.fb.group({
      name: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get form1() { return this.newEnfermedad.controls; }

  /**
 * opens modal
 * @param title title of modal 
 * @param data data to be used in modal
 */
  openModal(isEditOrNew: string): void {
    
    if(isEditOrNew === "new"){
      this.newEnfermedad.reset();
      this.esEditar = false;
    } else{
      this.esEditar = true;
    }

    this.activeModal.open(this.content, { centered: true });
  }

  openModalDelete(): void {
    this.activeModal.open(this.deleteEnfermedadModal, { centered: true, windowClass: 'delete-modal' });
  }  

  deleteEnfermedad(): void{
    this.service.deleteEnfermedades(this.selectedEnfermedad.enfe_Id || 0).subscribe(
        (response: any) => {
          console.log("se pudo:", response);
          this._fetchData();
          if(response.message == "La enfermedad no puede ser eliminada ya que está siendo usada en otro registro"){
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
              titleText: 'La enfermedad no puede ser eliminada ya que está siendo usada en otro registro',
              icon: 'warning',
              background: '#ffffff'
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
    if(this.newEnfermedad.invalid){
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

    const enfermedad: Enfermedad = {
      enfe_Id: this.selectedEnfermedad?.enfe_Id || 0,
      enfe_Nombre: this.newEnfermedad.value.name,
      enfe_UsuCreacion: 1,
      enfe_UsuModificacion: 1,
    }

    if(this.esEditar){

      this.service.editEnfermedades(enfermedad).subscribe(
        (response: any) => {
          console.log("se pudo:", response);
          this._fetchData();
          if (response.message == "La enfermedad ha sido editada exitosamente") {
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
          else if(response.message == "La enfermedad ya existe"){
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1700,
              timerProgressBar: true,
              titleText: '¡Esta enfermedad ya existe!',
              icon: 'warning',
              background: '#ffffff'
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
      
      this.service.addEnfermedades(enfermedad).subscribe(
        (response: any) => {
          // this.openSuccess();
          // this.showSuccess();
          console.log("se pudo:", response);
          this._fetchData();
          if (response.message == "La enfermedad ha sido insertada exitosamente") {
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
          else if(response.message == "Esta enfermedad ya existe"){
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1700,
              timerProgressBar: true,
              titleText: '¡Esta enfermedad ya existe!',
              icon: 'warning',
              background: '#ffffff'
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
    this.service.getEnfermedades()
  .subscribe((response: any)=>{
    this.enfermedades = response.data;
    console.log(this.enfermedades);
  });
  }

  /**
   * initialize advance table columns
   */
  initAdvancedTableData(): void {
    console.log(this.enfermedades);
    this.columns = [
     
      {
        name: 'enfe_Id',
        label: 'ID',
        formatter: (enfermedad: Enfermedad) => enfermedad.enfe_Id
      },
      {
        name: 'enfe_Nombre',
        label: 'Nombre',
        formatter: (enfermedad: Enfermedad) => enfermedad.enfe_Nombre
      },
      {
        name: 'Action',
        label: 'Acciones',
        width: 82,
        formatter: this.enfermedadActionFormatter.bind(this),
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
        this.selectedEnfermedad = this.enfermedades.find(enfermedad => enfermedad.enfe_Id === selectedId) || this.selectedEnfermedad;
        if (this.selectedEnfermedad) {
          this.newEnfermedad = this.fb.group({
            name: [this.selectedEnfermedad.enfe_Nombre || '', Validators.required],
          });
          this.openModal("edit");
        }
      });
    });
    
    document.querySelectorAll('.delete').forEach((e) => {
      e.addEventListener("click", () => {  
        const selectedId = Number(e.id);
        this.selectedEnfermedad = this.enfermedades.find(enfermedad => enfermedad.enfe_Id === selectedId) || this.selectedEnfermedad;
        if (this.selectedEnfermedad) {
          this.newEnfermedad = this.fb.group({
            name: [this.selectedEnfermedad.enfe_Nombre || '', Validators.required],
          });
          this.openModalDelete();
        }
      });
    })
  }


  // formats name cell
  enfermedadNameFormatter(enfermedad: Enfermedad): any {
    return this.sanitizer.bypassSecurityTrustHtml(
      `
      <div class="table-user">
      <a href="javascript:void(0);" class="customer text-body fw-semibold" id="${enfermedad.enfe_Id}">${enfermedad.enfe_Nombre}</a>
      </div>
      `
    );
  }

  // action cell formatter
  enfermedadActionFormatter(enfermedad: Enfermedad): any {
    return this.sanitizer.bypassSecurityTrustHtml(
      ` <a href="javascript:void(0);"  class="edit action-icon" id="${enfermedad.enfe_Id}"> <i class="mdi mdi-square-edit-outline" style="color: #6658dd;" ></i></a>
        <a href="javascript:void(0);" class="delete action-icon" id="${enfermedad.enfe_Id}"> <i class="mdi mdi-delete" style="color: #9f100e;"></i></a>`
    );
  }

  /**
* Match table data with search input
* @param row Table row
* @param term Search the value
*/
matches(row: Enfermedad, term: string) {
  return (row.enfe_Id?.toString().includes(term) ||
          row.enfe_Nombre?.toLowerCase().includes(term));
}

  /**
   * Search Method
  */
  searchData(searchTerm: string): void {
    if (searchTerm === '') {
      this._fetchData();
    }
    else {
      let updatedData = this.enfermedades;
      //  filter
      updatedData = updatedData.filter(enfermedad => this.matches(enfermedad, searchTerm));
      this.enfermedades = updatedData;
    }

  }

}

