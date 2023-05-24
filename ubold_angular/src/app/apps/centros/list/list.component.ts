import { Component, OnInit, ViewChild, AfterViewInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Column } from 'src/app/shared/advanced-table/advanced-table.component';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { Centro } from '../Models';
import { ServiceService } from 'src/app/apps/centros/Service/service.service';
import { Select2Data } from 'ng-select2-component';
import { NgbCalendar, NgbDate, NgbDateStruct, NgbTimeStruct, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { merge, Observable, OperatorFunction, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
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

  // select2 config
  estadoCivil: Select2Data = [];


  // date picker config configuración del selector de fecha
  model1!: NgbDateStruct;
  model2!: NgbDateStruct;
  hidden: boolean = true;

  // timepicker config
  time1!: NgbTimeStruct;
  time2!: NgbTimeStruct;
  time3!: NgbTimeStruct;
  time4!: NgbTimeStruct;
  show: boolean = true;
  meridian: boolean = true;
  spinners = true;

  // typeahead config
  statesList: string[] = [];
  typeaheadModel: any;
  formatter = (result: string) => result.toUpperCase();

  focus$ = new Subject<string>();
  click$ = new Subject<string>();


  @ViewChild('advancedTable') advancedTable: any;
  @ViewChild('content', { static: true }) content: any;
  @ViewChild('deleteCentroModal', { static: true }) deleteCentroModal: any;
  @ViewChild('instance', { static: true }) instance!: NgbTypeahead;


  constructor (
    private sanitizer: DomSanitizer,
    public activeModal: NgbModal,
    private calendar: NgbCalendar,
    private fb: FormBuilder,
    private service: ServiceService,
    // private toast: NgToastService,
    // private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Inicio', path: '/' }, { label: 'Centro', path: '/', active: true }];
    this._fetchData();
    // initialize advance table 
    this.initAdvancedTableData();

    this.newCentro = this.fb.group({
      name: ['', Validators.required],
    });
   
    this.service.getDepartamentos().subscribe((response: any) => {
      let optionsEstados = response.data.map((item: any) => ({
        value: item.depa_Id,
        label: item.depa_Nombre
      }));

      this.estadoCivil = [{
        label: 'Escoja un estado',
        options: optionsEstados
        },
      ];
      console.log(this.estadoCivil);
    });
    
  }

  /**
   * fetches country list
   */



  /**
   * toggles meridian
   */
  toggleMeridian() {
    this.meridian = !this.meridian;
  }

  /**
   * toggles spinner visibility
   */
  toggleSpinners() {
    this.spinners = !this.spinners;
  }

   /**
 * search function of typeahead 1
 */
   search1: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
   text$.pipe(
     debounceTime(200),
     distinctUntilChanged(),
     map(term => term.length < 2 ? []
       : this.statesList.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
   )

 /**
  * search function of typeahead 2
  */
 search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
   const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
   const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
   const inputFocus$ = this.focus$;

   return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
     map(term => (term === '' ? this.statesList
       : this.statesList.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
   );
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
    if(this.newCentro.invalid){
      console.log("pipi");
     // const selectedMunicipio = this.countries.find((municipio: any) => municipio.id === this.newCentro.value.muni_Id);
      const departamentoNombre = this.selectedCentro.depa_Nombre;
    
      console.log('Nombre del departamento:', departamentoNombre);
      return;
    }

   
    

   
    


    const centro: Centro = {
      cent_Id: this.selectedCentro?.cent_Id || 0,
      cent_Nombre: this.newCentro.value.name,
      muni_Id: this.newCentro.value.name,
      cent_Direccion: this.newCentro.value.name,
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
          this._fetchData();
        },
        (error) => {
          console.log("no se pudo:", error);
        }
      )
      
    }

    this.activeModal.dismissAll('');
  }

  // showSuccess(){
  //   this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
  // }

  // openSuccess(){
  //   this.toast.success({detail:'Success',summary:'This is Success', sticky:true,position:'tr'})
  // }
  _fetchData(): void {
    this.service.getCentros()
    
  .subscribe((response: any)=>{
    this.centros = response.data;
    console.log(this.centros);
    

  });
  }
 
  

 

  /**
   * initialize advance table columns
   */
  initAdvancedTableData(): void {
    console.log(this.centros);
    this.columns = [
      // {
      //   name: 'name',
      //   label: 'Basic Info',
      //   formatter: this.enfermedadNameFormatter.bind(this)
      // },
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
        name: 'Action',
        label: 'Acciones',
        width: 82,
        formatter: this.centroActionFormatter.bind(this),
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
        this.selectedCentro = this.centros.find(centro => centro.cent_Id === selectedId) || this.selectedCentro;
        if (this.selectedCentro) {
          this.newCentro = this.fb.group({
            name: [this.selectedCentro.cent_Nombre || '', Validators.required],
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
          this.newCentro = this.fb.group({
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

