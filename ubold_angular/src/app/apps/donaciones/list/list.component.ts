import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Column } from 'src/app/shared/advanced-table/advanced-table.component';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { Donaciones } from '../Model';
import { ServiceD } from 'src/app/apps/donaciones/service.service';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-donaciones-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
    // providers: [MessageService]
  })
  export class ListComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  Donaciones: Donaciones[] = [];
  columns: Column[] = [];
  newEmppleado!: FormGroup;
  returnUrl: string = '/';
  details: string = '/';

  selectedEmpleado!: Donaciones;

  @ViewChild('advancedTable') advancedTable: any;
  @ViewChild('content', { static: true }) content: any;
  @ViewChild('deleteEmpleadoModal', { static: true }) deleteEmpleadoModal: any;

  constructor (
    private sanitizer: DomSanitizer,
    public activeModal: NgbModal,
    private fb: FormBuilder,
    private service: ServiceD,
    private router:Router,
    private route: ActivatedRoute,

 
    // private messageService: MessageService,
  ) { }

    ngOnInit(): void {
      this.pageTitle = [{ label: 'Inicio', path: '/' }, { label: 'Donaciones', path: '/', active: true }];
      this._fetchData();
      // initialize advance table 
      this.initAdvancedTableData();


      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/apps/donaciones/editar';
      this.details = this.route.snapshot.queryParams['returnUrl'] || '/apps/donaciones/details';

    }

  // convenience getter for easy access to form fields

  /**
 * opens modal
 * @param title title of modal 
 * @param data data to be used in modal
 */
 
 /* openModalDelete(): void {
    this.activeModal.open(this.deleteEmpleadoModal, { centered: true, windowClass: 'delete-modal' });
  } */ 

 /* deleteEmpleado(): void{
    this.service.deleteDonaciones(this.selectedEmpleado.empe_Id || 0).subscribe(
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
  }*/


  
  _fetchData(): void {
    this.service.getDonacion()
  .subscribe((response: any)=>{
    this.Donaciones = response.data;
  });
  }

  


  /**
   * initialize advance table columns
   */
  initAdvancedTableData(): void {
    this.columns = [

      {
        name: 'dona_Id',
        label: 'ID',
        formatter: (donacion: Donaciones) => donacion.dona_Id
      },
      {
        name: 'esDescrip',
        label: 'Donante',
        formatter: (donacion: Donaciones) => donacion.esDescrip
      },
      {
        name: 'dona_NombreDonante',
        label: 'Nombre del donante',
        formatter: (donacion: Donaciones) => donacion.dona_NombreDonante
      },
      {
        name: 'dona_Fecha',
        label: 'Fecha de Donación',
        formatter: (donacion: Donaciones) => donacion.dona_Fecha
      },
      {
        name: 'Action',
        label: 'Action',
        width: 82,
        formatter: this.empleadoActionFormatter.bind(this),
        sort: false
      }]
  }

  /**
 *  handles operations that need to be performed after loading table
 */
  handleTableLoad(event: any): void {
    // product cell
    document.querySelectorAll('.donacion').forEach((e) => {
      e.addEventListener("click", () => {
        const donaId = e.getAttribute('id');
        const donacion = this.Donaciones.find((emp: Donaciones) => emp.dona_Id === Number(donaId));
        if (donacion) {
          this.Editar(donacion);
        }
      });
    });

    document.querySelectorAll('.details').forEach((e) => {
      e.addEventListener("click", () => {
        const donacionId = e.getAttribute('id');
        this.Details(Number(donacionId));
      });
    });
  }
  
  // action de los botones iconos
  empleadoActionFormatter(donacion: Donaciones): any {
    return this.sanitizer.bypassSecurityTrustHtml(
      `<a class="edit action-icon donacion" id="${donacion.dona_Id}" role="button">
        <i class="mdi mdi-square-edit-outline"></i>
      </a>

      <a class="details action-icon details" id="${donacion.dona_Id}"> <i class="bi bi-list-task"></i> </a>
      `
    );
  }

  //funcion para ir a la pagina editar y mandar el parametro o algo asi
  Details(donacionId: number): void {
    this.router.navigate([this.details], { queryParams: { id: donacionId } });
  }


    Editar(donaciones: Donaciones) {
      console.log("si llegaaa");
         localStorage.setItem("dona_Id", donaciones.dona_Id!.toString());
         this.router.navigate([this.returnUrl]); 
     }

    /**
  * Match table data with search input
  * @param row Table row
  * @param term Search the value
  */
    matches(row: Donaciones, term: string) {
      return (row.dona_Id?.toString().includes(term) ||
              row.dona_NombreDonante?.toLowerCase().includes(term));
    }

  /**
   * Search Method
  */
  searchData(searchTerm: string): void {
    if (searchTerm === '') {
      this._fetchData();
    }
    else {
      let updatedData = this.Donaciones;
      //  filter
      updatedData = updatedData.filter(donacion => this.matches(donacion, searchTerm));
      this.Donaciones = updatedData;
    }

  }

  Agregar(){
    this.router.navigate(['crear']);
  }


  
}

