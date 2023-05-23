import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Column } from 'src/app/shared/advanced-table/advanced-table.component';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { Residente } from '../Models';
// import { CRMCUSTOMERS } from '../../crm/shared/data';
import { ServiceService } from 'src/app/apps/residentes/Service/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-residentes-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  residentes: Residente[] = [];
  columns: Column[] = [];
  selectedResidente!: Residente;
  newContact!: FormGroup;
  age!: number | null;

  @ViewChild('advancedTable') advancedTable: any;
  @ViewChild('content', { static: true }) content: any;

  constructor(
    private sanitizer: DomSanitizer,
    public activeModal: NgbModal,
    private fb: FormBuilder,
    private service: ServiceService,
    private route: Router
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
  }

  // convenience getter for easy access to form fields
  get form1() { return this.newContact.controls; }

  /**
 * opens modal
 * @param title title of modal 
 * @param data data to be used in modal
 */
  openCreate(): void {
    this.route.navigate(['apps/residentes/create']);
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
        this.selectedResidente = this.residentes[Number(e.id) - 1]

        this.age = this.calculateAge(this.selectedResidente.resi_Nacimiento || '');
      });
    })

    document.querySelectorAll('.action-icon').forEach((e) => {
      e.addEventListener("click", () => {
        console.log('le dio');
        console.log(this.residentes);
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
  residenteActionFormatter(): any {
    return this.sanitizer.bypassSecurityTrustHtml(
      ` <a href="javascript:void(0);" class="action-icon"> <i class="mdi mdi-square-edit-outline"></i></a>
        <a href="javascript:void(0);" class="action-icon"> <i class="mdi mdi-delete"></i></a>`
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
