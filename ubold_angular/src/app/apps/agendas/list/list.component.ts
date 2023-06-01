import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Column } from 'src/app/shared/advanced-table/advanced-table.component';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { Agenda } from '../../Models';
import { ServiceService } from '../service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-agendas-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

    pageTitle: BreadcrumbItem[] = [];
    agendas: Agenda[] = [];
    returnUrl: string = '/';
    columns: Column[] = [];
    pageSizeOptions: number[] = [5, 10, 25, 50];
    //   newEmppleado!: FormGroup;
    //   returnUrl: string = '/';
    //   selectedEmpleado!: Empleados;

    @ViewChild('advancedTable') advancedTable: any;

    constructor(
        private sanitizer: DomSanitizer,
        public activeModal: NgbModal,
        private fb: FormBuilder,
        private service: ServiceService,
        private router: Router,
        private route: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        this.pageTitle = [{ label: 'Inicio', path: '/' }, { label: 'Agendas', path: '/', active: true }];
        this._fetchData();
        // initialize advance table 
        this.initAdvancedTableData();

        //   this.newEmppleado = this.fb.group({
        //     name: ['', Validators.required],
        //   });

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/apps/agendas/edit';

    }

    // convenience getter for easy access to form fields
    //   get form1() { return this.newEmppleado.controls; }

    //   /**
    //  * opens modal
    //  * @param title title of modal 
    //  * @param data data to be used in modal
    //  */

    //   openModalDelete(): void {
    //     this.activeModal.open(this.deleteEmpleadoModal, { centered: true, windowClass: 'delete-modal' });
    //   }  

    //   deleteEmpleado(): void{
    //     this.service.deleteEmpleados(this.selectedEmpleado.empe_Id || 0).subscribe(
    //         (response: any) => {
    //           console.log("se pudo:", response);
    //           this._fetchData();
    //         },
    //         (error) => {
    //           console.log("no se pudo:", error);
    //         }
    //       )
    //     this._fetchData();
    //     this.activeModal.dismissAll('');
    //   }



    _fetchData(): void {
        this.service.getAgendas()
            .subscribe((response: any) => {
                this.agendas = response.data;
            });
    }




    /**
     * initialize advance table columns
     */
    initAdvancedTableData(): void {

        this.columns = [

            {
                name: 'agen_Id',
                label: 'ID',
                formatter: (agenda: Agenda) => agenda.agen_Id
            },
            {
                name: 'agen_Nombre',
                label: 'Nombre',
                formatter: (agenda: Agenda) => agenda.agen_Nombre
            },
            {
                name: 'Action',
                label: 'Action',
                width: 82,
                formatter: this.agendaActionFormatter.bind(this),
                sort: false
            }]
    }

    /**
   *  handles operations that need to be performed after loading table
   */
    handleTableLoad(event: any): void {
        // product cell
        document.querySelectorAll('.agenda').forEach((e) => {
            e.addEventListener("click", () => {
                const agendaId = e.getAttribute('id');
                console.log(agendaId);
                if (agendaId) {
                    this.router.navigate([`${this.returnUrl}/${agendaId}`]); // Modify the navigation path to include the id parameter
                }
            });
        });


        // document.querySelectorAll('.delete').forEach((e) => {
        //   e.addEventListener("click", () => {  
        //     const selectedId = Number(e.id);
        //     this.selectedEmpleado = this.empleados.find(empe => empe.empe_Id === selectedId) || this.selectedEmpleado;
        //     if (this.selectedEmpleado) {
        //       this.newEmppleado = this.fb.group({
        //         name: [this.selectedEmpleado.empe_NombreCompleto || '', Validators.required],
        //       });
        //       this.openModalDelete();
        //     }
        //   });
        // })
    }


    // action 
    agendaActionFormatter(agenda: Agenda): any {
        return this.sanitizer.bypassSecurityTrustHtml(
            `<a class="edit action-icon agenda" id="${agenda.agen_Id}" role="button">
        <i class="mdi mdi-square-edit-outline"></i>
      </a>
      <a href="javascript:void(0);" class="delete action-icon" id="${agenda.agen_Id}"> <i class="mdi mdi-delete"></i></a>`
        );
    }


    //   Editar(empleado: Empleados) {
    //     console.log("si llegaaa");
    //        localStorage.setItem("id", empleado.empe_Id!.toString());
    //        this.router.navigate([this.returnUrl]); 
    //    }


    /**
  * Match table data with search input
  * @param row Table row
  * @param term Search the value
  */
    matches(row: Agenda, term: string) {
        return (row.agen_Id?.toString().includes(term) ||
            row.agen_Nombre?.toLowerCase().includes(term));
    }

    /**
     * Search Method
    */
    searchData(searchTerm: string): void {
        if (searchTerm === '') {
            this._fetchData();
        }
        else {
            let updatedData = this.agendas;
            //  filter
            updatedData = updatedData.filter(agenda => this.matches(agenda, searchTerm));
            this.agendas = updatedData;
        }

    }

    //   Agregar(){
    //     this.router.navigate(['crear']);
    //   }



}

