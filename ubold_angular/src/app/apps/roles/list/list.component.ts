import { Component, OnInit, ViewChild, AfterViewInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Column } from 'src/app/shared/advanced-table/advanced-table.component';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { Rol } from '../../Models';
import { ServiceService } from 'src/app/apps/roles/Service/service.service';
import { Select2Data } from 'ng-select2-component';


@Component({
    selector: 'app-roles-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
  })
  export class ListComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  roles: Rol[] = [];
  columns: Column[] = [];
  selectedRol!: Rol;
  esEditar!: boolean;
  newRol!: FormGroup;
  pantalla: Select2Data = [];
  selectedPantallas: any[] = [];
  selectedRoleId: number | undefined = 0;

  
  @ViewChild('pant_Id', { static: true }) pant_Id: any;
  @ViewChild('advancedTable') advancedTable: any;
  @ViewChild('content', { static: true }) content: any;
  @ViewChild('deleteRolModal', { static: true }) deleteRolModal: any;

  constructor (
    private sanitizer: DomSanitizer,
    public activeModal: NgbModal,
    private fb: FormBuilder,
    private service: ServiceService,
    
  ) { }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Inicio', path: '/' }, { label: 'Roles', path: '/', active: true }];
   
    this._fetchData();
    if (this.esEditar) {
      this.fetchData();
    } 
    // initialize advance table 
    this.initAdvancedTableData();

    this.newRol = this.fb.group({
      name: ['', Validators.required],
      pant_Id: [[]],
    });

    this.service.getPantallas().subscribe((response: any) => {
      let esquemaLabels: string[] = [];
      let options: { [key: string]: any[] } = {};

      response.data.forEach((item: any) => {
        const esqueNombre: string = item.pant_Menu;
        const pantaId: string = item.pant_Id;
        const pantaNombre: string = item.pant_Nombre;
    
        if (!esquemaLabels.includes(esqueNombre)) {
          esquemaLabels.push(esqueNombre);
          options[esqueNombre] = [];
        }
  
        options[esqueNombre].push({
          value: pantaId,
          label: pantaNombre
        });
      });
    
      this.pantalla = esquemaLabels.map((esqueNombre: string) => ({
        label: esqueNombre,
        options: options[esqueNombre]
      }));
    });

    this.selectedPantallas = this.newRol.value.pant_Id;
  }
  // convenience getter for easy access to form fields
  get form1() { return this.newRol.controls; }
  /**
 * opens modal
 * @param title title of modal 
 * @param data data to be used in modal
 */
  openModal(isEditOrNew: string): void {
    
    if(isEditOrNew === "new"){
      this.newRol.reset();
      this.esEditar = false;
    } else{
      this.esEditar = true;
     
    }

    this.activeModal.open(this.content, { centered: true });
  }

  openModalDelete(): void {
    this.activeModal.open(this.deleteRolModal, { centered: true, windowClass: 'delete-modal' });
  }  

  deleteRol(): void{
    this.service.deleteRoles(this.selectedRol.role_Id || 0).subscribe(
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
    if(this.newRol.invalid){
     
      console.log(this.pant_Id);
      return;
    }
    console.log(this.pant_Id);
    
    //console.log(this.selectedPantallas);
    const rol: Rol = {
      role_Id: this.selectedRol?.role_Id || 0,
      role_Nombre: this.newRol.value.name,
      role_Pantallas: this.pant_Id,
      role_UsuCreacion: 1,
      role_UsuModificacion: 1,
    };

    console.log(rol);

    if(this.esEditar){

      this.service.editRoles(rol).subscribe(
        (response: any) => {
          console.log("se pudo:", response);
          this._fetchData();
          this.fetchData(); 
        },
        (error) => {
          console.log("no se pudo:", error);
        }
      )
      
    } else{
      
      this.service.addRoles(rol).subscribe(
        (response: any) => {
         
          console.log("se pudo:", response);
         // console.log(rol);
          this._fetchData();
        },
        (error) => {
         // console.log(rol);
          console.log("no se pudo:", error);
        }
      )
      
    }

    this.activeModal.dismissAll('');
  }

 
  _fetchData(): void {
    this.service.getRoles().subscribe((response: any) => {
      this.roles = response.data;
      console.log(this.roles);
    });
  }

fetchData(): void {
  if (this.selectedRol.role_Id) {
    this.service.getRolx(this.selectedRol.role_Id).subscribe((response: any) => {
      const pantIds: number[] = response.data.map((item: any) => item.pant_Id); // Extraer los valores de pant_Id

      this.selectedPantallas = pantIds;

      console.log(this.selectedPantallas, "en funcion"); // Verificar que se hayan asignado correctamente los valores

      // Llenar el dropdown múltiple con los datos obtenidos
      this.fillDropdown();
    });
  }
}

  
  fillDropdown(): void {
    this.service.getPantallas().subscribe((response: any) => {
      let esquemaLabels: string[] = [];
      let options: { [key: string]: any[] } = {};
  
      response.data.forEach((item: any) => {
        const esqueNombre: string = item.pant_Menu;
        const pantaId: string = item.pant_Id;
        const pantaNombre: string = item.pant_Nombre;
  
        if (!esquemaLabels.includes(esqueNombre)) {
          esquemaLabels.push(esqueNombre);
          options[esqueNombre] = [];
        }
  
        options[esqueNombre].push({
          value: pantaId,
          label: pantaNombre
        });
      });
  
      this.pantalla = esquemaLabels.map((esqueNombre: string) => ({
        label: esqueNombre,
        options: options[esqueNombre]
      }));
  
      // Establecer los valores seleccionados en el dropdown múltiple
      this.setSelectedPantallas();
    });
  }
  
  setSelectedPantallas(): void {
    if (this.selectedPantallas) {
      this.newRol.get('pant_Id')?.setValue([...this.selectedPantallas]);
    }
  }


  /**
   * initialize advance table columns
   */
  initAdvancedTableData(): void {
    console.log(this.roles);
    this.columns = [
     
      {
        name: 'role_Id',
        label: 'ID',
        formatter: (rol: Rol) => rol.role_Id
      },
      {
        name: 'role_Nombre',
        label: 'Nombre',
        formatter: (rol: Rol) => rol.role_Nombre
      },
      {
        name: 'Action',
        label: 'Acciones',
        width: 82,
        formatter: this.rolActionFormatter.bind(this),
      }]
  }


  handleTableLoad(event: any): void {
    // product cell
    document.querySelectorAll('.edit').forEach((e) => {
      e.addEventListener("click", () => {   
        const selectedId = Number(e.id);
        this.selectedRol = this.roles.find(rol => rol.role_Id === selectedId) || this.selectedRol;
        this.fetchData();
        if (this.selectedRol) {
          //console.log(this.selectedRol.role_Pantallas)
          this.selectedRoleId = this.selectedRol.role_Id;
  
          console.log(this.selectedPantallas, "en handle");
          this.newRol = this.fb.group({
            name: [this.selectedRol.role_Nombre || '', Validators.required],
            pant_Id: [[]] // Inicializar con un array vacío
          });
          this.openModal("edit");
        }
      });
    });
  
    
    document.querySelectorAll('.delete').forEach((e) => {
      e.addEventListener("click", () => {  
        const selectedId = Number(e.id);
        this.selectedRol = this.roles.find(rol => rol.role_Id === selectedId) || this.selectedRol;
        if (this.selectedRol) {
          this.newRol = this.fb.group({
            name: [this.selectedRol.role_Nombre || '', Validators.required],
          });
          this.openModalDelete();
        }
      });
    })
  }


  // formats name cell
  rolNameFormatter(rol: Rol): any {
    return this.sanitizer.bypassSecurityTrustHtml(
      `
      <div class="table-user">
      <a href="javascript:void(0);" class="customer text-body fw-semibold" id="${rol.role_Id}">${rol.role_Nombre}</a>
      </div>
      `
    );
  }

  // action cell formatter
  rolActionFormatter(rol: Rol): any {
    return this.sanitizer.bypassSecurityTrustHtml(
      ` <a href="javascript:void(0);" class="edit action-icon" id="${rol.role_Id}"> <i class="mdi mdi-square-edit-outline" ></i></a>
        <a href="javascript:void(0);" class="delete action-icon" id="${rol.role_Id}"> <i class="mdi mdi-delete"></i></a>`
    );
  }

  /**
* Match table data with search input
* @param row Table row
* @param term Search the value
*/
matches(row: Rol, term: string) {
  return (row.role_Id?.toString().includes(term) ||
          row.role_Nombre?.toLowerCase().includes(term));
}

  /**
   * Search Method
  */
  searchData(searchTerm: string): void {
    if (searchTerm === '') {
      this._fetchData();
    }
    else {
      let updatedData = this.roles;
      //  filter
      updatedData = updatedData.filter(rol => this.matches(rol, searchTerm));
      this.roles = updatedData;
    }

  }

}

