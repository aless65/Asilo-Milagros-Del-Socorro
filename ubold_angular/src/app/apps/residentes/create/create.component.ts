import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { Select2Data, Select2UpdateEvent } from 'ng-select2-component';
import { ServiceService } from '../../Service/service.service';
import { ServiceService as ResidenteService } from 'src/app/apps/residentes/Service/service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FullCalendarModule, FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarOptions, DateInput, EventClickArg, EventDropArg, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg, Draggable } from '@fullcalendar/interaction';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import {
  AgendaDetalle, Residente,
  Encargado, Expediente, Dieta,
  HistorialPago
} from '../../Models';
import { CalendarEventComponent } from '../eventos/evento.component';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { ListComponent } from '../../residentes/list/list.component';
import { invalid } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-residentes-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  returnUrl: string = '/';
  pageTitle: BreadcrumbItem[] = [];
  activeWizard1: number = 1;
  activeWizard2: number = 1;
  activeWizard3: number = 1;
  activeWizard4: number = 1;
  estadoCivil: Select2Data = [];
  tipoSangre: Select2Data = [];
  enfermedad: Select2Data = [];
  municipio: Select2Data = [];
  parentesco: Select2Data = [];
  centro: Select2Data = [];
  agenda: Select2Data = [];
  dieta: Select2Data = [];
  cuidado: Select2Data = [];
  cuidador: Select2Data = [];
  habitacion: Select2Data = [];
  metodopago: Select2Data = [];
  calendarOptions: CalendarOptions = {};
  calendarEventsData: EventInput[] = [];
  selectedDay: any = {};
  event: EventInput = {};
  isEditable: boolean = false;
  selectedValueAgenda: string = '';
  selectedValueDieta: string = '';
  goesBack: boolean = false;
  goesBackDieta: boolean = false;
  agendadetalle: AgendaDetalle[] = [];
  residente: Residente = {};
  encargado: Encargado = {};
  expediente: Expediente = {};
  dietaModel: Dieta = {};
  historialPago: HistorialPago = {};
  maxId: number = 0;
  isDatosPersonalesActive: boolean = true;
  isEncargadoActive: boolean = false;
  isExpedienteActive: boolean = false;
  isAdministracionActive: boolean = false;
  allValuesUndefinedOrNull!: boolean;
  allValuesUndefinedOrNullDieta: boolean = false;
  residentesFromList: Residente[] = [];

  @ViewChild('personalizarAgenda', { static: true }) personalizarAgenda: any;
  @ViewChild('personalizarDieta', { static: true }) personalizarDieta: any;
  @ViewChild('personalizarCuidado', { static: true }) personalizarCuidado: any;
  @ViewChild('eventModal', { static: true }) eventModal!: CalendarEventComponent;
  @ViewChild('residenteList', { static: true }) residenteList!: ListComponent;
  @ViewChild('confirmarCuidadoPersonalizado', { static: true }) confirmarCuidadoPersonalizado: any;
  @ViewChild('calendar')
  calendarComponent!: FullCalendarComponent;


  accountForm!: FormGroup;

  encargadoForm!: FormGroup;

  profileForm!: FormGroup;

  validationWizardForm!: FormGroup;

  cuidadoForm!: FormGroup;

  confirmarCuidadoForm!: FormGroup;

  dietaForm!: FormGroup;


  constructor(private fb: FormBuilder,
    private service: ServiceService,
    private modalService: NgbModal,
    private router: Router,
    private resiService: ResidenteService,
    private route: ActivatedRoute) { }

  selectedImage: string | ArrayBuffer | null = null;
  base64Image: any;

  // ngOnInit() {
  // }


  ngOnInit(): void {
    this.pageTitle = [{ label: 'Residentes', path: '/apps/residentes/list' }, { label: 'Nuevo', path: '/', active: true }];

    this.expediente.expe_FechaApertura = new Date().toISOString().substring(0, 10);
    this.historialPago.pago_Fecha = new Date().toISOString().substring(0, 10);

    FullCalendarModule.registerPlugins([ // register FullCalendar plugins
      dayGridPlugin,
      interactionPlugin,
      bootstrapPlugin,
      timeGridPlugin,
      listPlugin
    ]);

    this.eventModal.agendaDetalleSaved.subscribe((agendadetalle: AgendaDetalle) => {
      if (!this.isEditable) {
        agendadetalle.agendeta_Id = this.maxId + 1;
        this.agendadetalle.push(agendadetalle);
      } else {

        const eventIndex = this.agendadetalle.findIndex((detalle) => detalle.agendeta_Id === agendadetalle.agendeta_Id);

        this.agendadetalle[eventIndex].agendeta_HoraStart = agendadetalle.agendeta_HoraStart;
        this.agendadetalle[eventIndex].agendeta_HoraEnd = agendadetalle.agendeta_HoraEnd;
        this.agendadetalle[eventIndex].agendeta_Observaciones = agendadetalle.agendeta_Observaciones;
        this.agendadetalle[eventIndex].acti_Id = agendadetalle.acti_Id;
        this.agendadetalle[eventIndex].medi_Id = agendadetalle.medi_Id;
        this.agendadetalle[eventIndex].acti_Class = agendadetalle.acti_Class;

        this.isEditable = false;
      }
    });

    function maxDateValidator(minDate: Date) {
      return (control: any): { [key: string]: any } | null => {
        const selectedDate = new Date(control.value);
        if (selectedDate > minDate) {
          return { 'minDate': true };
        }
        return null;
      };
    }

    this.accountForm = this.fb.group({
      resi_Nombres: ['', Validators.required],
      resi_Apellidos: ['', Validators.required],
      resi_Identidad: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(13), Validators.minLength(13)]],
      resi_Nacimiento: ['', [Validators.required, maxDateValidator(new Date(1959, 0, 1))]],
      estacivi_Id: ['', Validators.required],
      resi_Sexo: ['', Validators.required],
    })

    this.encargadoForm = this.fb.group({
      enca_Nombres: ['', Validators.required],
      enca_Apellidos: ['', Validators.required],
      enca_Identidad: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(13), Validators.minLength(13)]],
      enca_Nacimiento: ['', [Validators.required, maxDateValidator(new Date(2006, 0, 1))]],
      enca_Sexo: ['', Validators.required],
      estacivi_Id: ['', Validators.required],
      muni_Id: ['', Validators.required],
      enca_Direccion: ['', Validators.required],
      enca_Telefono: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      pare_Id: ['', Validators.required],
    })

    this.profileForm = this.fb.group({
      tiposang_Id: ['', Validators.required],
      expe_FechaApertura: [this.expediente.expe_FechaApertura, Validators.required],
      enfe_Id: [''],
      expe_Fotografia: [''],
      expe_Enfermedades: [''],
    })

    this.validationWizardForm = this.fb.group({
      agen_Id: ['', Validators.required],
      cent_Id: ['', Validators.required],
      diet_Id: ['', Validators.required],
      empe_Id: ['', Validators.required],
      habi_Id: ['', Validators.required],
    });

    this.cuidadoForm = this.fb.group({
      empe_Id: ['', Validators.required],
    });

    this.confirmarCuidadoForm = this.fb.group({
      pago_Fecha: ['', Validators.required],
      meto_Id: ['', Validators.required],
    });

    this.dietaForm = this.fb.group({
      desayuno: [''],
      almuerzo: [''],
      cena: [''],
      merienda: [''],
      restricciones: [''],
      observaciones: [''],
    });

    this.service.getEstadosCiviles().subscribe((response: any) => {
      let options = response.data.map((item: any) => ({
        value: item.estacivi_Id,
        label: item.estacivi_Nombre
      }));

      this.estadoCivil = [{
        label: 'Escoja un estado',
        options: options
      },
      ];
    });


    this.service.getTiposSangre().subscribe((response: any) => {
      let options = response.data.map((item: any) => ({
        value: item.tiposang_Id,
        label: item.tiposang_Nombre
      }));

      this.tipoSangre = [{
        label: 'Escoja un tipo de sangre',
        options: options
      },
      ];
    });


    this.service.getEnfermedades().subscribe((response: any) => {
      let options = response.data.map((item: any) => ({
        value: item.enfe_Id,
        label: item.enfe_Nombre
      }));

      this.enfermedad = [{
        label: 'Escoja enfermedades',
        options: options
      },
      ];
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

    this.service.getParentescos().subscribe((response: any) => {
      let options = response.data.map((item: any) => ({
        value: item.pare_Id,
        label: item.pare_Nombre
      }));

      this.parentesco = [{
        label: 'Escoja un parentesco',
        options: options
      },
      ];
    });

    this.service.getCentros().subscribe((response: any) => {
      let options = response.data.map((item: any) => ({
        value: item.cent_Id,
        label: item.cent_Nombre
      }));

      this.centro = [{
        label: 'Escoja un centro',
        options: options
      },
      ];
    });


    this.service.getMetodosPago().subscribe((response: any) => {
      let options = response.data.map((item: any) => ({
        value: item.meto_Id,
        label: item.meto_Nombre
      }));

      this.metodopago = [{
        label: 'Escoja un método de pago',
        options: options
      },
      ];
    });

    this.agenda = [
      {
        label: 'Escoja un tipo de agenda',
        options: [
          { value: '1', label: 'Estándar' },
          { value: '2', label: 'Personalizada' },
        ],
      },
    ];

    this.dieta = [
      {
        label: 'Escoja un tipo de dieta',
        options: [
          { value: '1', label: 'Estándar' },
          { value: '2', label: 'Personalizada' },
        ],
      },
    ];

    this.cuidado = [
      {
        label: 'Escoja un tipo de cuidado',
        options: [
          { value: '1', label: 'Estándar' },
          { value: '2', label: 'Atención especial' },
        ],
      },
    ];

    this.resiService.getAgendaDetalles(1).subscribe((response: any) => {
      const currentDate = new Date();
      this.calendarEventsData = response.data.map((item: any) => ({
        id: item.agendeta_Id,
        title: item.acti_Nombre,
        start: new Date(currentDate.toDateString() + ' ' + item.agendeta_HoraStart),
        end: new Date(currentDate.toDateString() + ' ' + item.agendeta_HoraEnd),
        classNames: [item.acti_Class]
      }));

      this.agendadetalle = response.data;

      this.calendarOptions = {
        themeSystem: 'bootstrap',
        bootstrapFontAwesome: false,
        buttonText: {
          // today: 'Today',
          // month: 'Month',
          // week: 'Week',
          // day: 'Day',
          // list: 'List',
          // prev: 'Prev',
          // next: 'Next'
        },
        initialView: 'timeGridDay',
        handleWindowResize: true,
        headerToolbar: {
          left: '',
          center: '',
          right: ''
        },
        events: [...this.calendarEventsData],
        editable: true,
        droppable: true, // this allows things to be dropped onto the calendar 
        selectable: true,
        dateClick: this.handleDateClick.bind(this),
        eventClick: this.handleEventClick.bind(this),
        drop: this.onDrop.bind(this),
        eventDrop: this.onEventDrop.bind(this)
      }

    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/apps/residentes/list';
  }

  handleAceptarClick() {
    if (this.formCuidado.empe_Id.valid) {
      this.modalService.dismissAll('');
      this.openConfirmacion();
    }
  }

  submitResidente() {
    if (this.accountForm.invalid) {
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
      // El formulario tiene errores de validación, pues mostrar un mensaje de error o alguna cosa ombe... aquí

      // Object.keys(this.accountForm.controls).forEach(field => {
      //   const control = this.accountForm.get(field);
      //   if (control?.invalid) {
      //     const errors = control.errors;
      //     console.log(`Error en el campo ${field}:`, errors);
      //   }
      // })
    } else {

      

      this.resiService.getIdentidadResidenteExiste(this.residente.resi_Identidad || '').subscribe((response: any) => {

        console.log(response);

        if (response.code === 200) {

          // this.accountForm.get('resi_Identidad')?.reset();
          // this.residente.resi_Identidad = undefined;
  
          console.log("ps sí existe");
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1700,
            timerProgressBar: true,
            titleText: '¡Ya existe un residente con este número de identidad!',
            icon: 'warning',
            background: '#f6f6baf2'
          }).then(() => {
            // Action after the toast is closed
          });
        } else{
          this.activeWizard4 = 2
        }
      });

      // this.residenteList.residentesListado.subscribe((residentesListado: Residente[]) => {
      //   this.residentesFromList = residentesListado;

      //   console.log(residentesListado);

      //   const matchFound = this.residentesFromList.some(item => item.resi_Identidad === this.residente.resi_Identidad);

      //   if(matchFound){
      //     Swal.fire({
      //       toast: true,
      //       position: 'top-end',
      //       showConfirmButton: false,
      //       timer: 1700,
      //       timerProgressBar: true,
      //       titleText: '¡Ya existe un residente con este número de identidad!',
      //       icon: 'warning',
      //       background: '#f6f6baf2'
      //     }).then(() => {
      //       // Acción luego de cerrarse el toast
      //     });

      //     this.residente.resi_Identidad = '';
      //     this.form1.resi_Identidad.reset();
      //   }
      // })

      this.isDatosPersonalesActive = false;
    }
  }

  submitEncargado() {
    const formValues = this.encargadoForm.value;
    this.allValuesUndefinedOrNull = Object.values(formValues).every(value => value === undefined || value === null || value === '');

    if (this.allValuesUndefinedOrNull) {
      this.activeWizard4 = 3
      this.encargado.enca_Nombres = undefined;
      this.isEncargadoActive = false;
      return;
    } else {
      if (this.encargadoForm.invalid) {
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
          // Action after the toast is closed
        });

        // Object.keys(this.encargadoForm.controls).forEach(field => {
        //   const control = this.encargadoForm.get(field);
        //   if (control?.invalid) {
        //     const errors = control.errors;
        //     console.log(`Error en el campo ${field}:`, errors);
        //   }
        // });

        this.allValuesUndefinedOrNull = false;
      } else {

        this.resiService.getIdentidadEncargadoExiste(this.encargado.enca_Identidad || '').subscribe((response: any) => {
          // this.encargadoForm.get('enca_Identidad')?.reset();
          // this.encargado.enca_Identidad = '';

          if (response.code === 200) {
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1700,
              timerProgressBar: true,
              titleText: '¡Ya existe un encargado con este número de identidad!',
              icon: 'warning',
              background: '#f6f6baf2'
            }).then(() => {
              // Action after the toast is closed
            });
          } else {
            this.activeWizard4 = 3
          }
        });


        this.isEncargadoActive = false;
      }
    }


  }

  submitExpediente() {
    if (this.profileForm.invalid) {
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
      // El formulario tiene errores de validación, pues mostrar un mensaje de error o alguna cosa ombe... aquí

      // Object.keys(this.accountForm.controls).forEach(field => {
      //   const control = this.accountForm.get(field);
      //   if (control?.invalid) {
      //     const errors = control.errors;
      //     console.log(`Error en el campo ${field}:`, errors);
      //   }
      // })
    } else {
      console.log(this.expediente);
      console.log(this.profileForm.valid);
      // const expe_Fotografia = this.expediente.expe_Fotografia?.toString() ?? '';
      console.log(this.expediente.expe_Fotografia);
    }
  }

  functionInsert() {
    const combinedModels = {};

    // Merge the properties of each model into the combinedModels object
    Number(this.residente.agen_Id);
    Number(this.residente.diet_Id);
    this.residente.resi_UsuCreacion = 1;
    this.residente.agen_Detalles = this.agendadetalle;
    Object.assign(combinedModels, this.residente);
    Object.assign(combinedModels, this.dietaModel);
    Object.assign(combinedModels, this.encargado);
    Object.assign(combinedModels, this.expediente);
    Object.assign(combinedModels, this.historialPago);

    console.log(this.residente.agen_Detalles);

    console.log(combinedModels);

    this.resiService.addResidentes(combinedModels).subscribe((response: any) => {
      console.log(response);
      if (response.message === "Exitoso") {
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
        this.router.navigate([this.returnUrl]);
      } else {
        Swal.fire({
          toast: true,
          position: 'top-end',
          title: 'Perfecto!',
          text: response.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 1850,
          timerProgressBar: true
        }).then(() => {
        });
      }
    })

    this.isDatosPersonalesActive = false;
  }

  submitAdmin() {
    let canInsert = true;

    const agendaVaciaONull = this.agendadetalle;
    this.allValuesUndefinedOrNullDieta = Object.values(agendaVaciaONull).every(value => value === undefined || value === null);
    console.log(this.allValuesUndefinedOrNullDieta);

    if (this.allValuesUndefinedOrNullDieta) {
      const formValues = this.dietaForm.value;
      this.allValuesUndefinedOrNullDieta = Object.values(formValues).every(value => value === undefined || value === null || value === '');

      if (this.allValuesUndefinedOrNullDieta) {
        canInsert = false;
        console.log("es la agenda");

        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1700,
          timerProgressBar: true,
          titleText: '¡La agenda no puede estar vacía!',
          icon: 'warning',
          background: '#f6f6baf2'
        }).then(() => {
          // Acción luego de cerrarse el toast
        });
      }
    }

    if (this.residente.diet_Id?.toString() === "2") {
      const formValues = this.dietaForm.value;
      this.allValuesUndefinedOrNullDieta = Object.values(formValues).every(value => value === undefined || value === null || value === '');
      console.log("dieta");

      if (this.allValuesUndefinedOrNullDieta) {
        canInsert = false;

        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1700,
          timerProgressBar: true,
          titleText: '¡La dieta personalizada no puede estar vacía!',
          icon: 'warning',
          background: '#f6f6baf2'
        }).then(() => {
          // Acción luego de cerrarse el toast
        });
      }
    }

    if (this.form4.empe_Id.value === "2") {
      const formValues = this.confirmarCuidadoForm.value;
      let valuesConfirm = Object.values(formValues).every(value => value === undefined || value === null || value === '' || value === 0);

      console.log("cuidado");

      if ((this.residente.empe_Id === undefined || this.residente.empe_Id?.toString() === '') || valuesConfirm || this.historialPago.meto_Id === undefined || this.historialPago.meto_Id === null || this.historialPago.meto_Id === 0) {
        canInsert = false;

        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1700,
          timerProgressBar: true,
          titleText: '¡Debe completar todos los pasos de la atención especial!',
          icon: 'warning',
          background: '#f6f6baf2',

        }).then(() => {
          // Acción luego de cerrarse el toast
        });
      }
    } else {
      this.residente.empe_Id = undefined;
    }

    if (this.validationWizardForm.invalid) {
      canInsert = false;

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
      // El formulario tiene errores de validación, pues mostrar un mensaje de error o alguna cosa ombe... aquí

      // Object.keys(this.profileForm.controls).forEach(field => {
      //   const control = this.accountForm.get(field);
      //   if (control?.invalid) {
      //     const errors = control.errors;
      //     console.log(`Error en el campo ${field}:`, errors);
      //   }
      // })
    } else {

      if (canInsert) {

        this.resiService.getImageUpload(this.base64Image).subscribe((response: any) => {
          console.log(response.data.url);
          this.residente.expe_Fotografia = response.data.url.toString();

          // if(this.residente.expe_Fotografia === undefined){
          //   this.residente.expe_FechaApertura = 'https://i.ibb.co/Wn8HrLm/blank-profile-picture.jpg';
          // }

          this.functionInsert();
        },
          (error: any) => {
            this.residente.expe_Fotografia = 'https://i.ibb.co/Wn8HrLm/blank-profile-picture.jpg';
            this.functionInsert();
          }
        );

      }
    }
  }

  submitDieta() {
    const formValues = this.dietaForm.value;
    this.allValuesUndefinedOrNullDieta = Object.values(formValues).every(value => value === undefined || value === null || value === '');

    if (this.allValuesUndefinedOrNullDieta) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1700,
        timerProgressBar: true,
        titleText: '¡Debe llenar al menos un campo!',
        icon: 'warning',
        background: '#f6f6baf2'
      }).then(() => {
        // Acción luego de cerrarse el toast
      });
    } else {
      console.log(this.dietaModel);
      this.selectedValueDieta = 'papa';
      this.goesBackDieta = true;
    }
  }

  submitConfirmar() {
    console.log(this.historialPago);
    if (this.confirmarCuidadoForm.valid) {
      console.log(this.historialPago, "entró");
      this.modalService.dismissAll();
    }
  }

  openConfirmacion() {
    this.modalService.open(this.confirmarCuidadoPersonalizado, { centered: true });
  }

  populateCuidadoresDisponibles(selected: any) {
    if (selected) {
      this.service.getCuidadoresDisponibles(selected.value).subscribe((response: any) => {
        let options = response.data.map((item: any) => ({
          value: item.empe_Id,
          label: item.empe_NombreCompleto,
        }));

        this.cuidador = [{
          label: 'Escoja una opción',
          options: options
        },
        ];
      });

      this.service.getHabitacionesDisponibles(selected.value).subscribe((response: any) => {
        let cateLabels: string[] = [];
        let options: { [key: string]: any[] } = {};

        response.data.forEach((item: any) => {
          const cateNombre: string = item.cate_Nombre;
          const habiId: number = item.habi_Id;
          const habiNumbero: number = item.habi_Numero;

          if (!cateLabels.includes(cateNombre)) {
            cateLabels.push(cateNombre);
            options[cateNombre] = [];
          }

          options[cateNombre].push({
            value: habiId,
            label: habiNumbero.toString()
          });
        });

        this.habitacion = cateLabels.map((cateNombre: string) => ({
          label: cateNombre,
          options: options[cateNombre]
        }));
      });

    }
  }

  /**
   * Opens event modal
   * @param title title of modal
   * @param data data to be used in modal
   */
  openEventModal(title: string = "", data: any = {}): void {
    this.eventModal.openModal(title, data);
  }

  handleImageUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result;
        this.base64Image = (reader.result as string)?.split(',')[1];
      };
      reader.readAsDataURL(file);
    }
  }


  deleteImage() {
    this.selectedImage = ''; // Clear the selectedImage variable to remove the image
  }

  openModal(event: Select2UpdateEvent, modal: string) {
    const selectedValue = event.value;
    if (selectedValue === '2') {
      if (modal === 'diet_Id') {
        this.modalService.open(this.personalizarDieta, { centered: true });
      }

      if (modal === 'empe_Id') {
        this.modalService.open(this.personalizarCuidado, { centered: true });
      }
    }
  }

  openAgenda(event: Select2UpdateEvent, id: number) {
    this.residente.agen_Id = Number(this.event.value.toString());
    if (!this.goesBack) {
      this.selectedValueAgenda = event.value.toString();
    }
    this.goesBack = false;
    return this.selectedValueAgenda;
  }

  openDieta(event: Select2UpdateEvent, id: number) {
    this.residente.diet_Id = Number(this.event.value.toString());
    if (!this.goesBackDieta) {
      this.selectedValueDieta = event.value.toString();
    }
    this.goesBackDieta = false;
    return this.selectedValueDieta;
  }

  goBack() {
    this.selectedValueAgenda = 'papa';
    this.goesBack = true;
    this.selectedValueDieta = 'papa';
    this.goesBackDieta = true;
  }

  // goBackDieta() {
  //   this.selectedValueDieta = 'papa';
  //   this.goesBackDieta = true;
  //   return this.selectedValueDieta;
  // }

  handleButtonClick(modal: string) {
    if (modal === 'agen_Id') {
      this.selectedValueAgenda = '2';
    }

    if (modal === 'diet_Id') {
      this.selectedValueDieta = '2';
    }

    if (modal === 'empe_Id') {
      this.modalService.open(this.personalizarCuidado, { centered: true });
    }
  }

  /**
   * Handling date click on calendar
   * @param arg DateClickArg
   */
  handleDateClick(arg: DateClickArg): void {
    this.selectedDay = arg;
    this.event = { id: String(this.calendarEventsData.length + 1), title: '', classNames: '', category: 'bg-danger', start: this.selectedDay.date };
    this.isEditable = false;
    this.openEventModal('Agregar Evento', this.event);
  }


  /**
   * Handling click on event on calendar 
   * @param arg EventClickArg
   */
  handleEventClick(arg: EventClickArg): void {
    const event = arg.event;
    // const detalle = arg.event;
    this.event = { id: String(event.id), title: event.title, classNames: event.classNames, category: event.classNames[0] };
    this.isEditable = true;
    const index = this.calendarEventsData.findIndex(item => item.id?.toString() === this.event.id);
    console.log(this.event);
    this.agendadetalle[index].agendeta_HoraStart = arg.event.start?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    this.agendadetalle[index].agendeta_HoraEnd = arg.event.end?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    this.openEventModal('Editar Evento', this.agendadetalle[index]);
  }

  /**
   * adds external events by Drag n Drop
   * @param event dropped event
   */
  onDrop(event: any): void {
    const draggedEl = event.draggedEl;
    const newEvent = {
      id: String(this.calendarEventsData.length + 1),
      title: draggedEl.innerText,
      start: event.date,
      classNames: "bg-" + draggedEl.getAttribute('data-type')
    };
    // save new event
    this.calendarEventsData.push(newEvent);
    this.calendarOptions.events = [...this.calendarEventsData];
  }

  /**
   * on event drop between calendar
   */
  onEventDrop(arg: EventDropArg): void {
    console.log("jala");
    let modifiedEvents = [...this.calendarEventsData];
    const idx = modifiedEvents.findIndex((e: any) => e['id'].toString() === arg.event.id.toString());

    this.agendadetalle[idx].agendeta_HoraStart = arg.event.start?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    this.agendadetalle[idx].agendeta_HoraEnd = arg.event.end?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    modifiedEvents[idx]['title'] = arg.event.title;
    modifiedEvents[idx]['className'] = arg.event.classNames;
    modifiedEvents[idx]['start'] = arg.event.start as DateInput;
    modifiedEvents[idx]['end'] = arg.event.end as DateInput;
    this.calendarEventsData = modifiedEvents;
    this.isEditable = false;
  };

  createNewEvent(): void {
    this.event = { id: String(this.calendarEventsData.length + 1), title: '', classNames: '', category: 'bg-danger', start: new Date() };
    this.isEditable = false;
    this.openEventModal('Agregar Evento', this.event);
  }

  /**
   * Handle the event save
   * @param newEvent new event
   */
  //agregar en general(desde botón o desde calendario)
  handleEventSave(newEvent: EventInput): void {

    if (this.isEditable) {
      let modifiedEvents = [...this.calendarEventsData];
      const eventIndex = modifiedEvents.findIndex((event) => event.id?.toString() === newEvent.id?.toString());

      this.calendarEventsData[eventIndex].title = newEvent.title;
      this.calendarEventsData[eventIndex].classNames = newEvent.category;
      this.calendarEventsData[eventIndex].start = newEvent.start;
      this.calendarEventsData[eventIndex].end = newEvent.end;
      this.calendarEventsData[eventIndex].category = newEvent.category;

      this.calendarEventsData = modifiedEvents;
    } else {
      // Find the maximum id value in calendarEventsData
      this.maxId = Math.max(...this.calendarEventsData.map((event) => Number(event.id)));

      // Set newEvent.id to maxId + 1
      newEvent.id = String(this.maxId + 1);

      let nEvent = {
        id: newEvent.id,
        title: newEvent.title,
        start: newEvent.start,
        end: newEvent.end,
        classNames: newEvent.category
      };
      this.calendarEventsData.push(nEvent);
    }

    this.calendarOptions.events = [...this.calendarEventsData];
  }

  /**
  * Deletes calendar event
  * @param deleteEvent event to be deleted
  */
  //actualiza luego de delete
  handleEventDelete(deleteEvent: EventInput): void {
    console.log(deleteEvent.id);
    let modifiedEvents = [...this.calendarEventsData];
    const eventIndex = modifiedEvents.findIndex((event) => event.id?.toString() === deleteEvent.id);
    modifiedEvents.splice(eventIndex, 1);
    this.calendarEventsData = modifiedEvents;
    this.calendarOptions.events = [...this.calendarEventsData];

    let modifiedDetalles = [...this.agendadetalle];
    const detalleIndex = modifiedDetalles.findIndex((detalle) => detalle.agendeta_Id?.toString() === deleteEvent.id);
    modifiedDetalles.splice(detalleIndex, 1);
    this.agendadetalle = [...modifiedDetalles];
  }


  // convenience getter for easy access to form fields
  get form1() { return this.accountForm.controls; }
  get form2() { return this.encargadoForm.controls; }
  get form3() { return this.profileForm.controls; }
  get form4() { return this.validationWizardForm.controls; }
  get formCuidado() { return this.cuidadoForm.controls; }
  get formCuidadoConfirm() { return this.confirmarCuidadoForm.controls; }
  get formDieta() { return this.dietaForm.controls; }

  // goes to next wizard
  // gotoNext(): void {
  //   if (this.accountForm.valid) {
  //     if(this.encargadoForm.valid || this.allValuesUndefinedOrNull){

  //       if (this.profileForm.valid) {
  //         this.activeWizard4 = 4;
  //       } else{
  //         this.activeWizard4 = 3;
  //       }
  //     }

  //     else {
  //       this.activeWizard4 = 2;
  //     }
  //   }

  // }

}
