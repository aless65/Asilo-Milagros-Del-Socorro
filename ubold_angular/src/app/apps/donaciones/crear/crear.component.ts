import { Component, OnInit, ViewChild } from '@angular/core';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
/*import {ServiceServiceD} from '../service.service';*/
import {ServiceService} from 'src/app/apps/Service/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Select2Data } from 'ng-select2-component';
import Swal from 'sweetalert2';
import { DonacionesComunes } from '../Model';
import { Donaciones } from '../Model';
import { DonacionesDetalles } from '../Model';

import { DomSanitizer } from '@angular/platform-browser';
import { Column } from 'src/app/shared/advanced-table/advanced-table.component';
import { ServiceD } from 'src/app/apps/donaciones/service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {
  Donaciones: DonacionesComunes[] = [];
  donacionesDetails: DonacionesDetalles[] = [];

  columns: Column[] = [];
  cantidadInputs: { [key: string]: string } = {};

  currentDate: string = "";
  columns2: Column[] = [];
  newEmppleado!: FormGroup;
  returnUrl: string = '/';
  details: string = '/';
  guardarDisabled: boolean = false;

  selectedDonaciones!: DonacionesComunes;

  @ViewChild('advancedTable') advancedTable: any;
  @ViewChild('content', { static: true }) content: any;
  @ViewChild('cent_Id', { static: true }) cent_Id: any;
  @ViewChild('agregarCantidad', { static: true }) agregarCantidad: any;

  @ViewChild('advancedTable2') advancedTable2: any;
  @ViewChild('content2', { static: true }) content2: any;

  //TABLA (ARRIBA)

  selectedDonacionId: number = 0;
  selectedDonacionesIds: number[] = [];

  donacionId: number = 0;
  pageTitle: BreadcrumbItem[] = [];
  isFechaInvalida: boolean = false;

  selectedDonacion!: Donaciones;
  donaciones: Donaciones = new  Donaciones(); 
  validationGroup1!: FormGroup;

  detalles!: FormGroup;
  detalles2!: FormGroup;

  centros : Select2Data = [];
  selectedCentros: any[] = [];

  constructor (
    private fb: FormBuilder,
    private service2: ServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private service: ServiceD,
    public activeModal: NgbModal,


  ) { }



  ngOnInit(): void {


    this.pageTitle = [{ label: 'Ecommerce', path: '/' }, { label: 'Shopping Cart', path: '/', active: true }];

    // Obtener la fecha actual
    const today = new Date();
    const year = today.getFullYear().toString().padStart(4, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    
    // Asignar la fecha actual a la variable currentDate
    this.currentDate = `${year}-${month}-${day}`;

        // initialize form config
        this.validationGroup1 = this.fb.group({
          Nombre: ['', Validators.required],
          Es: ['', Validators.required],
          Fecha: ['', Validators.required],     
          cent_Id: [0, Validators.required,[]],   
        });
        

        this.detalles = this.fb.group({
            cantidad: ['', Validators.required],

        });

        this.detalles2 = this.fb.group({
            descripcion:  ['', Validators.required]
        });



        this._fetchData2();
        // initialize advance table 
        this.initAdvancedTableData();
  
  
        this.initAdvancedTable2Data();
        this._fetchData();
        this.details = this.route.snapshot.queryParams['returnUrl'] || '/apps/donaciones/details';

        this.service2.getCentros().subscribe((response: any) => {
          let optionsCentros = response.data.map((item: any) => ({
            value: item.cent_Id,
            label: item.cent_Nombre
          }));
    
          this.centros = [{
            label: 'Escoja un Centro',
            options: optionsCentros
            },
          ];
          console.log(this.centros);
        });

        this.selectedCentros = this.validationGroup1.value.cent_Id;

  }

  get form1() { return this.validationGroup1.controls; }
  get form() { return this.detalles.controls; }
  get form2() { return this.detalles2.controls; }






  _fetchData2(): void {
    this.service.getDonacionCOMUN()
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
        name: 'doco_Id',
        label: 'ID',
        formatter: (donacion: DonacionesComunes) => donacion.doco_Id
      },
      {
        name: 'doco_Nombre',
        label: 'Insumo',
        formatter: (donacion: DonacionesComunes) => donacion.doco_Nombre
      },
      
      {
        name: 'cado_NombreCategoria',
        label: 'Categoría',
        formatter: (donacion: DonacionesComunes) => donacion.cado_NombreCategoria
      },
    
      {
        name: 'Action',
        label: 'Agregar',
        width: 130,
        formatter: this.empleadoActionFormatter.bind(this),
        sort: false
      }
    ];
  }



  /**
 *  handles operations that need to be performed after loading table
 */
  handleTableLoad(event: any): void {
    document.querySelectorAll('.cantidad').forEach((e) => {
      e.addEventListener("click", () => {  
        const selectedId = Number(e.id);
        this.selectedDonaciones = this.Donaciones.find(dona => dona.doco_Id === selectedId) || this.selectedDonaciones;
        if (this.selectedDonaciones) {
          this.newEmppleado = this.fb.group({
            name: [this.selectedDonaciones.doco_Nombre || '', Validators.required],
          });
          this.openModal(selectedId); // Pasa el ID seleccionado al método openModal()
        }
      });
    });
    
  }
  
  
  // action de los botones iconos
  empleadoActionFormatter(donacion: DonacionesComunes): any {
    return this.sanitizer.bypassSecurityTrustHtml(
      `<a class="cantidad action-icon " id="${donacion.doco_Id}" role="button">
      <i class="bi bi-plus-circle text-success"></i>
      </a>
      `
    );
  }

  openModal(donacionId: number): void {
    this.selectedDonacionId = donacionId;
    this.activeModal.open(this.agregarCantidad, { centered: true, windowClass: 'sm' });
  }
  
  GuardarConCantidad(): void{
      const detail: DonacionesDetalles = {
        dona_Id: this.donacionId, 
        doco_Id: this.selectedDonacionId, // Utiliza la variable selectedDonacionId
        deto_Cantidad: this.detalles.value.cantidad
      }
      if(detail.dona_Id == 0 || detail.dona_Id == undefined )
      {
      Swal.fire({
        toast: true,
        position: 'top-end',
        title: 'Advertencia!',
        text: '¡Debes registrar una donación primero!',
        icon: 'warning',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true
        }).then(() => {
  
      });
      }
    else  if (this.detalles.invalid) {
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1700,
          timerProgressBar: true,
          titleText: '¡Llene todos los campos!',
          icon: 'warning',
          background: '##ffffff'
        }).then(() => {
          // Acción luego de cerrarse el toast
        });
        // El formulario tiene errores de validación, pues mostrar un mensaje de error o alguna cosa ombe... aquí
        Object.keys(this.validationGroup1.controls).forEach(field => {
          const control = this.validationGroup1.get(field);
          if (control?.invalid) {
            const errors = control.errors;
            console.log(`Error en el campo ${field}:`, errors);
          }
        });
      }
      else{
        this.service.createDonacionDetail(detail)
        .subscribe((data: any) => {
          console.log("GUARDAAA");
          console.log(detail, "nuevo model" );
          console.log(detail);
    
         
          if(data.message == "ErrorInespero"){
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1700,
              timerProgressBar: true,
              titleText: '¡Ha ocurrido en error !',
              icon: 'error',
              background: '#ffffff'
            }).then(() => {
              // Acción luego de cerrarse el toast
            });
          }
          else if(data.message == "Exitoso"){
            this.detalles.reset();
            this._fetchData();
            Swal.fire({
              toast: true,
              position: 'top-end',
              title: 'Perfecto!',
              text: 'El insumo se agregó con éxito!',
              icon: 'success',
              showConfirmButton: false,
              timer: 1400,
              timerProgressBar: true
              }).then(() => {
               
                this.activeModal.dismissAll('');
            });
          }
        })
      }
   }

   GuardarConDescripcion(){
    const details: DonacionesDetalles = {
      dona_Id: this.donacionId,
      deto_Descripcion: this.detalles2.value.descripcion 
    }

    console.log(details);
    if(details.dona_Id == 0 || details.dona_Id == undefined )
    {
    Swal.fire({
      toast: true,
      position: 'top-end',
      title: 'Advertencia!',
      text: '¡Debes registrar una donación primero!',
      icon: 'warning',
      showConfirmButton: false,
      timer: 1400,
      timerProgressBar: true
      }).then(() => {

    });
    }
    else if(this.detalles2.invalid){
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1700,
        timerProgressBar: true,
        titleText: '¡Llene el campo!',
        icon: 'warning',
        background: '##ffffff'
      }).then(() => {
        // Acción luego de cerrarse el toast
      });
    }
    else{

      this.service.createDonacionDetailDesc(details)
      .subscribe((data: any) => {
        console.log("GUARDAAA");
        console.log(details, "nuevo model" );
        console.log(details);
  
       
        if(data.message == "ErrorInespero"){
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1700,
            timerProgressBar: true,
            titleText: '¡Ha ocurrido en error !',
            icon: 'error',
            background: '#ffffff'
          }).then(() => {
            // Acción luego de cerrarse el toast
          });
        }
        else if(data.message == "Exitoso"){
          this.detalles.reset();
          this._fetchData();
          Swal.fire({
            toast: true,
            position: 'top-end',
            title: 'Perfecto!',
            text: 'El insumo se agregó con éxito!',
            icon: 'success',
            showConfirmButton: false,
            timer: 1400,
            timerProgressBar: true
            }).then(() => {
             
              this.activeModal.dismissAll('');
          });
        }
      })

    }
   }

    /**
  * Match table data with search input
  * @param row Table row
  * @param term Search the value
  */
    matches(row: DonacionesComunes, term: string) {
      return (row.cado_Id?.toString().includes(term) ||
      row.doco_Nombre?.toLowerCase().includes(term));
    }

  /**
   * Search Method
  */
  searchData(searchTerm: string): void {
    if (searchTerm === '') {
      this._fetchData2();
    }
    else {
      let updatedData = this.Donaciones;
      //  filter
      updatedData = updatedData.filter(
        donacion=> 
        donacion.doco_Nombre?.toLowerCase().includes(searchTerm) ||
        donacion.cado_NombreCategoria?.toLowerCase().includes(searchTerm) 
        
        );
      this.Donaciones = updatedData;
    }

  }

    
  _fetchData(): void {
    console.log(this.donacionId, "esta llegando o no??");
    this.service.getDonacionId(this.donacionId)
  .subscribe((response: any)=>{
    this.donacionesDetails = response.data;
  });
  }


  initAdvancedTable2Data(): void {
    this.columns2 = [

      {
        name: 'deto_Id',
        label: 'ID',
        formatter: (donacion: DonacionesDetalles) => donacion.deto_Id
      },
      {
        name: 'doco_Id',
        label: 'Id insumo',
        formatter: (donacion: DonacionesDetalles) => donacion.doco_Id
      },
      {
        name: 'doco_Nombre',
        label: 'Insumo',
        formatter: (donacion: DonacionesDetalles) => donacion.doco_Nombre
      },
      {
        name: 'deto_Cantidad',
        label: 'Cantidad',
        formatter: (donacion: DonacionesDetalles) => donacion.deto_Cantidad
      },
      {
        name: 'Action',
        label: 'Eliminar',
        width: 82,
        formatter: this.detallesActionFormatter.bind(this),
        sort: false
      }]
  }

 

  handleTable2Load(event: any): void {
    document.querySelectorAll('.action-icon').forEach((button) => {
      button.addEventListener('click', () => {
        const detoId = Number(button.id);
        this.eliminarDetail(detoId);
      });
    });


    
  }
  
  
    // action de los botones iconos
    detallesActionFormatter(donacion: DonacionesDetalles): any {
      return this.sanitizer.bypassSecurityTrustHtml(
        `<a class="action-icon" id="${donacion.deto_Id}" role="button">
        <i class="bi bi-trash text-danger"></i></a>`
      );
    }
    


    eliminarDetail(detoId: number): void {
      this.service.deleteDonacionesDetails(detoId).subscribe(
        (response: any) => {
          console.log("Se pudo eliminar:", response);
          this._fetchData();
        },
        (error) => {
          console.log("No se pudo eliminar:", error);
        }
      );
    }
    
  
    matches2(row: DonacionesComunes, term: string) {
      return (row.cado_Id?.toString().includes(term) ||
              row.doco_Nombre?.toLowerCase().includes(term));
    }

  /**
   * Search Method
  */
  searchData2(searchTerm: string): void {
    if (searchTerm === '') {
      this._fetchData();
    }
    else {
      let updatedData = this.donacionesDetails;
      //  filter
      updatedData = updatedData.filter(
        donacion=> 
        donacion.doco_Nombre?.toLowerCase().includes(searchTerm) 
        );
      this.Donaciones = updatedData;
    }

  }





  validarYGuardar() {
    
    if (this.validationGroup1.invalid) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1700,
        timerProgressBar: true,
        titleText: '¡Llene todos los campos!',
        icon: 'warning',
        background: '##ffffff'
      }).then(() => {
        // Acción luego de cerrarse el toast
      });
      // El formulario tiene errores de validación, pues mostrar un mensaje de error o alguna cosa ombe... aquí
      Object.keys(this.validationGroup1.controls).forEach(field => {
        const control = this.validationGroup1.get(field);
        if (control?.invalid) {
          const errors = control.errors;
          console.log(`Error en el campo ${field}:`, errors);
        }
      });
    }


    else {

      const dona: Donaciones = {

        dona_NombreDonante: this.validationGroup1.value.Nombre,
        dona_Fecha: this.validationGroup1.value.Fecha,
        dona_QueEs: this.validationGroup1.value.Es,
        cent_Id: this.validationGroup1.value.cent_Id,
        dona_UsuCreacion: 1,

      };
      console.log( dona.cent_Id, "arreglo???");

      this.service.createDonacion(dona)
      .subscribe((data: any) => {
        console.log("GUARDAAA");
        console.log(dona, "nuevo model" );
        console.log(data);
       
        if(data.message == "ErrorInespero"){
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1700,
            timerProgressBar: true,
            titleText: '¡Ha ocurrido en error inesperado!',
            icon: 'error',
            background: '#ffffff'
          }).then(() => {
            // Acción luego de cerrarse el toast
          });
        }
        else if (data.message.includes("Exitoso")) {
          const parts = data.message.split("Exitoso");
          const numero = parseInt(parts[1]);
          this.donacionId = numero;
          console.log(this.donacionId, "Id Donacion");
          Swal.fire({
            toast: true,
            position: 'top-end',
            title: 'Perfecto!',
            text: 'El registro se guardó con éxito!',
            icon: 'success',
            showConfirmButton: false,
            timer: 1850,
            timerProgressBar: true
            }).then(() => {
              this.guardarDisabled = true; 
          });
         /* this.router.navigate([this.returnUrl]);*/
        }
      })
    }


    
  }







}



