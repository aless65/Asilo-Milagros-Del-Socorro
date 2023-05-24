import { Component, OnInit, ViewChild, AfterViewInit  } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, Validators,ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Column } from 'src/app/shared/advanced-table/advanced-table.component';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { Centro } from '../Models';
import { Select2Data } from 'ng-select2-component';
import { ServiceService } from 'src/app/apps/centros/Service/service.service';

@Component({
    selector: 'app-centros-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    
  })
  export class ListComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  centros: Centro[] = [];
  columns: Column[] = [];
  selectedCentro!: Centro;
  esEditar!: boolean;
  newCentro!: FormGroup;
  municipio: Select2Data = [];
  
  
  formatter = (result: string) => result.toUpperCase();

  validationWizardForm!: FormGroup;


  @ViewChild('advancedTable') advancedTable: any;
  @ViewChild('content', { static: true }) content: any;
  @ViewChild('deleteCentroModal', { static: true }) deleteCentroModal: any;

  constructor (
    private sanitizer: DomSanitizer,
    public activeModal: NgbModal,
    private formBuilder: FormBuilder,
    private service: ServiceService,
    
  ) { }
 
  ngOnInit(): void {
    this.pageTitle = [{ label: 'Inicio', path: '/' }, { label: 'Centro', path: '/', active: true }];
    this._fetchData();
    // initialize advance table 
    this.initAdvancedTableData();
    this.newCentro = this.formBuilder.group({
      name: ['', Validators.required],
      direccion: ['', Validators.required],
      muni_Id: new FormControl('', Validators.required),
      
    });
   
   

    this.service.getMunicipios().subscribe((response: any) => {
      let depaLabels: string[] = [];
      let options: { [key: string]: any[] } = {};
    
      response.data.forEach((item: any) => {
        const depaNombre: string = item.depa_Nombre;
        const muniId: string = item.muni_id;
        const muniNombre: string = item.muni_Nombre;
    
        if (!depaLabels.includes(depaNombre)) {
          depaLabels.push(depaNombre);
          options[depaNombre] = [];
        }
    
        options[depaNombre].push({
          value: muniId,
          label: muniNombre
        });
      });
    
      this.municipio = depaLabels.map((depaNombre: string) => ({
        label: depaNombre,
        options: options[depaNombre]
      }));
    });

    
  }

  // convenience getter for easy access to form fields
  get form1() { return this.newCentro.controls; }

  /**
 * opens modal
 * @param title title of modal 
 * @param data data to be used in modal
 */
  openModal(isEditOrNew: string): void {
    
    if(isEditOrNew === "new"){
      this.newCentro.reset();
      this.esEditar = false;
    } else{
      this.esEditar = true;
    }

    this.activeModal.open(this.content, { centered: true });
  }

  openModalDelete(): void {
    this.activeModal.open(this.deleteCentroModal, { centered: true, windowClass: 'delete-modal' });
  }  

  deleteCentro(): void{
    this.service.deleteCentros(this.selectedCentro.cent_Id || 0).subscribe(
        (response: any) => {
          console.log("si si si:", response);
          this._fetchData();
        },
        (error) => {
          console.log("error noo:", error);
        }
      )
    this._fetchData();
    this.activeModal.dismissAll('');
  }

  submitForm(): void {
    if(this.newCentro.invalid){
      console.log("pipi");
     
      return;
    }

    const centro: Centro = {
      cent_Id: this.selectedCentro?.cent_Id || 0,
      cent_Nombre: this.newCentro.value.name,
      muni_Id: this.newCentro.value.muni_Id,
      cent_Direccion: this.newCentro.value.direccion,
      cent_UsuCreacion: 1,
      cent_UsuModificacion: 1,
    }

    if(this.esEditar){

      this.service.editCentros(centro).subscribe(
        (response: any) => {
          console.log("se pudo:", response);
          this._fetchData();
        },
        (error) => {
          console.log("no se pudo:", error);
        }
      )
      
    } else{
      
      this.service.addCentros(centro).subscribe(
        (response: any) => {
          // this.openSuccess();
          // this.showSuccess();
          console.log("se pudo:", response);
          console.log("se pudo:", centro);
          this._fetchData();
        },
        (error) => {
          console.log("no se pudo:", error);
          console.log("no pudo:", centro);
        }
      )
      
    }

    this.activeModal.dismissAll('');
  }

  
  _fetchData(): void {
    this.service.getCentros()
    
  .subscribe((response: any)=>{
    this.centros = response.data;
    console.log(this.centros);
    

  });
  }
  
  initAdvancedTableData(): void {
    console.log(this.centros);
    this.columns = [
 
      {
        name: 'cent_Id',
        label: 'ID',
        formatter: (centro: Centro) => centro.cent_Id
      },
      {
        name: 'cent_Nombre',
        label: 'Nombre',
        formatter: (centro: Centro) => centro.cent_Nombre
      },
      {
        name: 'muni_Nombre',
        label: 'Municipio',
        formatter: (centro: Centro) => centro.muni_Nombre
      },
      {
        name: 'cent_Direccion',
        label: 'Dirección',
        formatter: (centro: Centro) => centro.cent_Direccion
      },
      {
        name: 'Action',
        label: 'Acciones',
        width: 82,
        formatter: this.centroActionFormatter.bind(this),
      }]
  }

 

  handleTableLoad(event: any): void {
    // product cell
    document.querySelectorAll('.edit').forEach((e) => {
      e.addEventListener("click", () => {   
        const selectedId = Number(e.id);
        this.selectedCentro = this.centros.find(centro => centro.cent_Id === selectedId) || this.selectedCentro;
        if (this.selectedCentro) {
          this.newCentro = this.formBuilder.group({
            name: [this.selectedCentro.cent_Nombre || '', Validators.required],
            muni_Id: [this.selectedCentro.muni_Id || '', Validators.required],
            direccion: [this.selectedCentro.cent_Direccion || '', Validators.required],
          });
          this.openModal("edit");
        }
      });
    });
    
    document.querySelectorAll('.delete').forEach((e) => {
      e.addEventListener("click", () => {  
        const selectedId = Number(e.id);
        this.selectedCentro = this.centros.find(centro => centro.cent_Id === selectedId) || this.selectedCentro;
        if (this.selectedCentro) {
          this.newCentro = this.formBuilder.group({
            name: [this.selectedCentro.cent_Nombre || '', Validators.required],
          });
          this.openModalDelete();
        }
      });
    })
  }


  // formats name cell
  centroNameFormatter(centro: Centro): any {
    return this.sanitizer.bypassSecurityTrustHtml(
      `
      <div class="table-user">
      <a href="javascript:void(0);" class="customer text-body fw-semibold" id="${centro.cent_Id}">${centro.cent_Nombre}</a>
      </div>
      `
    );
  }

  // action cell formatter
  centroActionFormatter(centro: Centro): any {
    return this.sanitizer.bypassSecurityTrustHtml(
      ` <a href="javascript:void(0);" class="edit action-icon" id="${centro.cent_Id}"> <i class="mdi mdi-square-edit-outline" ></i></a>
        <a href="javascript:void(0);" class="delete action-icon" id="${centro.cent_Id}"> <i class="mdi mdi-delete"></i></a>`
    );
  }

  /**
* Match table data with search input
* @param row Table row
* @param term Search the value
*/
matches(row: Centro, term: string) {
  return (row.cent_Id?.toString().includes(term) ||
          row.cent_Nombre?.toLowerCase().includes(term));
}

  /**
   * Search Method
  */
  searchData(searchTerm: string): void {
    if (searchTerm === '') {
      this._fetchData();
    }
    else {
      let updatedData = this.centros;
      //  filter
      updatedData = updatedData.filter(centro => this.matches(centro, searchTerm));
      this.centros = updatedData;
    }

  }

}

