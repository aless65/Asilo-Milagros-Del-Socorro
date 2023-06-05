import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Column } from 'src/app/shared/advanced-table/advanced-table.component';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { Residente } from '../../Models';
// import { CRMCUSTOMERS } from '../../crm/shared/data';
import { ServiceService } from 'src/app/apps/residentes/Service/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-residentes-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})

export class ListComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  residentes: Residente[] = [];
  columns: Column[] = [];
  selectedResidente!: Residente;
  newContact!: FormGroup;
  age!: number | null;
  pageSizeOptions: number[] = [5, 10, 25, 50];
  returnUrl: string = '/';

  @Output() residentesListado: EventEmitter<Residente[]> = new EventEmitter();

  @ViewChild('advancedTable') advancedTable: any;
  @ViewChild('content', { static: true }) content: any;
  @ViewChild('deleteResidenteModal', { static: true }) deleteResidenteModal: any;

  constructor(
    private sanitizer: DomSanitizer,
    public activeModal: NgbModal,
    private fb: FormBuilder,
    private service: ServiceService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Residentes', path: '/' }, { label: 'Listado', path: '/', active: true }];

    this._fetchData();
    // initialize advance table 
    this.initAdvancedTableData();

    this.selectedResidente = this.residentes[0];

    this.newContact = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      location: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/apps/residentes/edit';
  }

  // convenience getter for easy access to form fields
  get form1() { return this.newContact.controls; }

  /**
 * opens modal
 * @param title title of modal 
 * @param data data to be used in modal
 */
  openCreate(): void {
    this.residentesListado.emit(this.residentes);
    this.router.navigate(['apps/residentes/create']);
  }

  openHistorial(id: number): void {
    this.service.FindExpediente(id).subscribe(([expediente, historialExpediente]) => {
  
      // Assign the obtained data to variables
      // For example:
      const expedienteData = expediente;
      const historialData = historialExpediente;
  
      // Pass the data as parameters in the navigation function using 'state'
      this.router.navigate(['apps/residentes/historial'], {
        state: {
          expedienteData: expedienteData,
          historialData: historialData
        }
      });

      localStorage.setItem('expedienteData', JSON.stringify(expedienteData));
      localStorage.setItem('historialData', JSON.stringify(historialData));

    });
  }
  
  openModalDelete(): void {
    this.activeModal.open(this.deleteResidenteModal, { centered: true, windowClass: 'delete-modal' });
  }  

  deleteEmpleado(): void{
    this.service.deleteResidentes(this.selectedResidente.resi_Id || 0).subscribe(
        (response: any) => {
          if(response.code === 200){
            Swal.fire({
              toast: true,
              position: 'top-end',
              title: '¡Perfecto!',
              text: 'El registro se eliminó con éxito!',
              icon: 'success',
              showConfirmButton: false,
              timer: 1850,
              timerProgressBar: true
            }).then(() => {
            });
          }
          this._fetchData();
        },
        (error) => {
          console.log("no se pudo:", error);
        }
      )
    this._fetchData();
    this.activeModal.dismissAll('');
  }
  
  /**
   * fetch contact list
   */
  _fetchData(): void {
    this.service.getResidentes()
      .subscribe((response: any) => {
        this.residentes = response.data;
        console.log(this.residentes);

        this.selectedResidente = this.residentes[0];
        this.age = this.calculateAge(this.selectedResidente.resi_Nacimiento || '');
      });
  }

  calculateAge(dateOfBirth: string): number | null {
    if (!dateOfBirth) {
      return null;
    }

    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    const age = today.getFullYear() - birthDate.getFullYear();

    return age;
  }

  /**
   * initialize advance table columns
   */
  initAdvancedTableData(): void {

    this.columns = [
      {
        name: 'name',
        label: 'Nombres',
        formatter: this.residenteNameFormatter.bind(this)
      },
      {
        name: 'resi_Identidad',
        label: 'Identidad',
        formatter: (residente: Residente) => residente.resi_Identidad
      },
      {
        name: 'resi_Nacimiento',
        label: 'Nacimiento',
        formatter: (residente: Residente) => {
          const nacimiento = new Date(residente.resi_Nacimiento || '');
          return nacimiento.toLocaleDateString();
        }
      },
      {
        name: 'sexoDes',
        label: 'Sexo',
        formatter: (residente: Residente) => residente.sexoDes
      },
      {
        name: 'Action',
        label: 'Acciones',
        width: 82,
        formatter: this.residenteActionFormatter.bind(this),
        sort: false
      }]
  }

  /**
 *  handles operations that need to be performed after loading table
 */
  handleTableLoad(event: any): void {
    // product cell
    document.querySelectorAll('.residente').forEach((e) => {
      e.addEventListener("click", () => {
        const id = e.getAttribute("id");
        const residente = this.residentes.find((r) => r.resi_Id?.toString() === id);
    
        if (residente) {
          this.selectedResidente = residente;
          this.age = this.calculateAge(this.selectedResidente.resi_Nacimiento || '');
        }
      });
    });

    document.querySelectorAll('.edit').forEach((e) => {
      e.addEventListener("click", () => {
        const residenteId = e.getAttribute('id');
                console.log(residenteId);
                if (residenteId) {
                    this.router.navigate([`${this.returnUrl}/${residenteId}`]); // Modify the navigation path to include the id parameter
                }
      });
    })

    document.querySelectorAll('.delete').forEach((e) => {
      e.addEventListener("click", () => {  
        const selectedId = Number(e.id);
        this.selectedResidente = this.residentes.find(resi => resi.resi_Id === selectedId) || this.selectedResidente;
        
        this.openModalDelete();
      });
    })
  }

  // formats name cell
  residenteNameFormatter(residente: Residente): any {
    // console.log(residente);
    return this.sanitizer.bypassSecurityTrustHtml(
      `
      <div class="table-user">
      <img src="${residente.expe_Fotografia}" alt="table-user" class="me-2 rounded-circle">
       <a href="javascript:void(0);" class="residente text-body fw-semibold" id="${residente.resi_Id}">${residente.resi_Nombres} ${residente.resi_Apellidos}</a>
       </div>
      `
    );
  }

  // action cell formatter
  residenteActionFormatter(residente: Residente): any {
    return this.sanitizer.bypassSecurityTrustHtml(
      ` <a href="javascript:void(0);" class="edit action-icon" id="${residente.resi_Id}"> <i class="mdi mdi-square-edit-outline"></i></a>
        <a href="javascript:void(0);" class="delete action-icon" id="${residente.resi_Id}"> <i class="mdi mdi-delete"></i></a>`
    );
  }

  /**
* Match table data with search input
* @param row Table row
* @param term Search the value
*/
  matches(row: Residente, term: string) {
    return row.resi_Apellidos?.toLowerCase().includes(term)
      || row.resi_Nombres?.toLowerCase().includes(term)
      || row.resi_FechaIngreso?.toLowerCase().includes(term)
      || row.resi_Identidad?.toLowerCase().includes(term)
      || row.resi_Sexo?.toLocaleLowerCase().includes(term);
  }

  /**
   * Search Method
  */
  searchData(searchTerm: string): void {
    if (searchTerm === '') {
      this._fetchData();
    }
    else {
      let updatedData = this.residentes;
      //  filter
      updatedData = updatedData.filter(residente => this.matches(residente, searchTerm));
      this.residentes = updatedData;
    }

  }

}