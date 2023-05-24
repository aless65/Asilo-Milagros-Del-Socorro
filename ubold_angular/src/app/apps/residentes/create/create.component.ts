import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { Select2Data, Select2UpdateEvent  } from 'ng-select2-component';
import { ServiceService } from '../../Service/service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FullCalendarModule, FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarOptions, DateInput, EventClickArg, EventDropArg, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg, Draggable } from '@fullcalendar/interaction';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

@Component({
  selector: 'app-residentes-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

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
  calendarOptions: CalendarOptions = {};
  calendarEventsData: EventInput[] = [];
  selectedDay: any = {};
  event: EventInput = {};
  isEditable: boolean = false;

  @ViewChild('personalizarAgenda', { static: true }) personalizarAgenda: any;
  @ViewChild('personalizarDieta', { static: true }) personalizarDieta: any;
  @ViewChild('personalizarCuidado', { static: true }) personalizarCuidado: any;


  accountForm!: FormGroup;

  encargadoForm!: FormGroup;

  profileForm!: FormGroup;

  validationWizardForm!: FormGroup;


  constructor (private fb: FormBuilder, 
    private service: ServiceService,
    private modalService: NgbModal) { }

    selectedImage: string | ArrayBuffer | null = null;

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Residentes', path: '/' }, { label: 'Nuevo', path: '/', active: true }];

    FullCalendarModule.registerPlugins([ // register FullCalendar plugins
      dayGridPlugin,
      interactionPlugin,
      bootstrapPlugin,
      timeGridPlugin,
      listPlugin
    ]);


    this.accountForm = this.fb.group({
      resi_Nombres: ['', Validators.required],
      resi_Apellidos: ['', Validators.required],
      resi_Identidad: ['', Validators.required],
      resi_Nacimiento: ['', Validators.required],
      estacivi_Id: [0, Validators.required],
      resi_Sexo: ['', Validators.required],
    })
    
    this.encargadoForm = this.fb.group({
      enca_Nombres: ['', Validators.required],
      enca_Apellidos: ['', Validators.required],
      enca_Identidad: ['', Validators.required],
      enca_Nacimiento: ['', Validators.required],
      enca_Sexo: ['', Validators.required],
      estacivi_Id: [0, Validators.required],
      muni_Id: ['', Validators.required],
      enca_Direccion: ['', Validators.required],
      enca_Telefono: ['', Validators.required],
      pare_Id: [0, Validators.required],
    })

    this.profileForm = this.fb.group({
      tiposang_Id: [0, Validators.required],
      expe_FechaApertura: ['', Validators.required],
      enfe_Id: [0, [Validators.required, Validators.email]]
    })

    this.validationWizardForm = this.fb.group({
      agen_Id: [0, Validators.requiredTrue],
      cent_Id: [0, Validators.required],
      diet_Id: [0, Validators.required],
      empe_Id: [0, Validators.required],
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
  
    
  }

  handleImageUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  deleteImage(){
    this.selectedImage = ''; // Clear the selectedImage variable to remove the image
  }

  openModal(event: Select2UpdateEvent, modal: string) {
    const selectedValue = event.value;
    if (selectedValue === '2') {
      if(modal === 'agen_Id'){
        this.modalService.open(this.personalizarAgenda);
      }

      if(modal === 'diet_Id'){
        this.modalService.open(this.personalizarDieta);
      }

      if(modal === 'empe_Id'){
        this.modalService.open(this.personalizarCuidado);
      }
    }
  }

  handleButtonClick(modal: string) {
    if(modal === 'agen_Id'){
      this.modalService.open(this.personalizarAgenda);
    }

    if(modal === 'diet_Id'){
      this.modalService.open(this.personalizarDieta);
    }

    if(modal === 'empe_Id'){
      this.modalService.open(this.personalizarCuidado);
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
    // this.openEventModal('Add New Event', this.event);
  }


  /**
   * Handling click on event on calendar 
   * @param arg EventClickArg
   */
  handleEventClick(arg: EventClickArg): void {
    const event = arg.event;
    this.event = { id: String(event.id), title: event.title, classNames: event.classNames, category: event.classNames[0] };
    this.isEditable = true;
    console.log('aquí agrega uwu');
    // this.openEventModal('Edit Event', this.event);
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
    let modifiedEvents = [...this.calendarEventsData];
    const idx = modifiedEvents.findIndex((e: any) => e['id'] === arg.event.id);
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
    console.log('aquí agrega uwu');
  }

  // convenience getter for easy access to form fields
  get form1() { return this.accountForm.controls; }
  get form2() { return this.encargadoForm.controls; }
  get form3() { return this.profileForm.controls; }
  get form4() { return this.validationWizardForm.controls; }

  // goes to next wizard
  gotoNext(): void {
    if (this.accountForm.valid) {
      if (this.profileForm.valid) {
        this.activeWizard4 = 3;
      }
      else {
        this.activeWizard4 = 2;
      }
    }

  }
}
