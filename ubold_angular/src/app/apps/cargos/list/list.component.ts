import { Component, OnInit, ViewChild, AfterViewInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Column } from 'src/app/shared/advanced-table/advanced-table.component';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { Cargo } from '../Models';
import { ServiceService } from 'src/app/apps/cargos/Service/service.service';


@Component({
    selector: 'app-cargos-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    // providers: [MessageService]
  })
  export class ListComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  cargos: Cargo[] = [];
  columns: Column[] = [];
  selectedCargo!: Cargo;
  esEditar!: boolean;
  newCargo!: FormGroup;

  @ViewChild('advancedTable') advancedTable: any;
  @ViewChild('content', { static: true }) content: any;
  @ViewChild('deleteCargoModal', { static: true }) deleteCargoModal: any;

  constructor (
    private sanitizer: DomSanitizer,
    public activeModal: NgbModal,
    private fb: FormBuilder,
    private service: ServiceService,

  ) { }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Inicio', path: '/' }, { label: 'Cargos', path: '/', active: true }];

    this._fetchData();
    // initialize advance table 
    this.initAdvancedTableData();

    this.newCargo = this.fb.group({
      name: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get form1() { return this.newCargo.controls; }

  /**
 * opens modal
 * @param title title of modal 
 * @param data data to be used in modal
 */
  openModal(isEditOrNew: string): void {
    
    if(isEditOrNew === "new"){
      this.newCargo.reset();
      this.esEditar = false;
    } else{
      this.esEditar = true;
    }

    this.activeModal.open(this.content, { centered: true });
  }

  openModalDelete(): void {
    this.activeModal.open(this.deleteCargoModal, { centered: true, windowClass: 'delete-modal' });
  }  

  deleteCargo(): void{
    this.service.deleteCargos(this.selectedCargo.carg_Id || 0).subscribe(
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

  submitForm(): void {
    if(this.newCargo.invalid){
      console.log("pipi");
      
      return;
    }

    const cargo: Cargo = {
      carg_Id: this.selectedCargo?.carg_Id || 0,
      carg_Nombre: this.newCargo.value.name,
      carg_UsuCreacion: 1,
      carg_UsuModificacion: 1,
    }

    if(this.esEditar){

      this.service.editCargos(cargo).subscribe(
        (response: any) => {
          console.log("se pudo:", response);
          console.log(cargo.carg_Nombre);
          this._fetchData();
        },
        (error) => {
          console.log("no se pudo error:", error);
          console.log(cargo.carg_Nombre);
          console.log(cargo.carg_Id);

        }
      )
      
    } else{
      
      this.service.addCargos(cargo).subscribe(
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
      
    }

    this.activeModal.dismissAll('');
  }

  
  _fetchData(): void {
    this.service.getCargos()
  .subscribe((response: any)=>{
    this.cargos = response.data;
    console.log(this.cargos);
  });
  }

  /**
   * initialize advance table columns
   */
  initAdvancedTableData(): void {
    console.log(this.cargos);
    this.columns = [
      // {
      //   name: 'name',
      //   label: 'Basic Info',
      //   formatter: this.enfermedadNameFormatter.bind(this)
      // },
      {
        name: 'carg_Id',
        label: 'ID',
        formatter: (cargo: Cargo) => cargo.carg_Id
      },
      {
        name: 'carg_Nombre',
        label: 'Nombre',
        formatter: (cargo: Cargo) => cargo.carg_Nombre
      },
      {
        name: 'Action',
        label: 'Acciones',
        width: 82,
        formatter: this.cargoActionFormatter.bind(this),
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
        this.selectedCargo = this.cargos.find(cargo => cargo.carg_Id === selectedId) || this.selectedCargo;
        if (this.selectedCargo) {
          this.newCargo = this.fb.group({
            name: [this.selectedCargo.carg_Nombre|| '', Validators.required],
          });
          this.openModal("edit");
        }
      });
    });
    
    document.querySelectorAll('.delete').forEach((e) => {
      e.addEventListener("click", () => {  
        const selectedId = Number(e.id);
        this.selectedCargo = this.cargos.find(cargo => cargo.carg_Id === selectedId) || this.selectedCargo;
        if (this.selectedCargo) {
          this.newCargo = this.fb.group({
            name: [this.selectedCargo.carg_Nombre || '', Validators.required],
          });
          this.openModalDelete();
        }
      });
    })
  }


  // formats name cell
  cargoNameFormatter(cargo: Cargo): any {
    return this.sanitizer.bypassSecurityTrustHtml(
      `
      <div class="table-user">
      <a href="javascript:void(0);" class="customer text-body fw-semibold" id="${cargo.carg_Id}">${cargo.carg_Nombre}</a>
      </div>
      `
    );
  }

  // action cell formatter
  cargoActionFormatter(cargo: Cargo): any {
    return this.sanitizer.bypassSecurityTrustHtml(
      ` <a href="javascript:void(0);" class="edit action-icon" id="${cargo.carg_Id}"> <i class="mdi mdi-square-edit-outline" ></i></a>
        <a href="javascript:void(0);" class="delete action-icon" id="${cargo.carg_Id}"> <i class="mdi mdi-delete"></i></a>`
    );
  }

  /**
* Match table data with search input
* @param row Table row
* @param term Search the value
*/
matches(row: Cargo, term: string) {
  return (row.carg_Id?.toString().includes(term) ||
          row.carg_Nombre?.toLowerCase().includes(term));
}

  /**
   * Search Method
  */
  searchData(searchTerm: string): void {
    if (searchTerm === '') {
      this._fetchData();
    }
    else {
      let updatedData = this.cargos;
      //  filter
      updatedData = updatedData.filter(cargo => this.matches(cargo, searchTerm));
      this.cargos = updatedData;
    }

  }

}

