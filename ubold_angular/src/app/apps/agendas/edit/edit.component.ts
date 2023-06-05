import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Column } from 'src/app/shared/advanced-table/advanced-table.component';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { Agenda, AgendaDetalle } from '../../Models';
import { ServiceService } from '../service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarOptions, DateInput, EventClickArg, EventDropArg, EventInput } from '@fullcalendar/core';
import { FullCalendarModule, FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg, Draggable } from '@fullcalendar/interaction';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { CalendarEventComponent } from '../eventos/evento.component';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-agendas-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {

    returnUrl: string = '/';
    pageTitle: BreadcrumbItem[] = [];
    calendarOptions!: CalendarOptions;
    calendarEventsData: EventInput[] = [];
    selectedDay: any = {};
    event: EventInput = {};
    pageSizeOptions: number[] = [5, 10, 25, 50];
    agendaId!: number;
    calendarComponent!: FullCalendarComponent;
    isEditable: boolean = false;
    maxId: number = 0;
    agendadetalle: AgendaDetalle[] = [];
    originalAgenda: any;

    // @ViewChild('advancedTable') advancedTable: any;
    @ViewChild('eventModal', { static: true }) eventModal!: CalendarEventComponent;

    constructor(
        private sanitizer: DomSanitizer,
        public activeModal: NgbModal,
        private fb: FormBuilder,
        private service: ServiceService,
        private router: Router,
        private route: ActivatedRoute,
    ) { }

    ngOnInit(): void {

        FullCalendarModule.registerPlugins([ // register FullCalendar plugins
            dayGridPlugin,
            interactionPlugin,
            bootstrapPlugin,
            timeGridPlugin,
            listPlugin
        ]);

        this.pageTitle = [{ label: 'Agendas', path: '/' }, { label: 'Editar', path: '/', active: true }];

        this.route.paramMap.subscribe(params => {
            this.agendaId = Number(params.get('id'));
            // Use the id parameter as needed
        });

        this.eventModal.agendaDetalleSaved.subscribe((agendadetalle: AgendaDetalle) => {
          if (!this.isEditable) {
            agendadetalle.agendeta_Id = this.maxId + 1;
            agendadetalle.agen_Id = this.agendaId;
            agendadetalle.agendeta_UsuCreacion = 1;
            this.agendadetalle.push(agendadetalle);
          } else {
    
            const eventIndex = this.agendadetalle.findIndex((detalle) => detalle.agendeta_Id === agendadetalle.agendeta_Id);
    
            this.agendadetalle[eventIndex].agendeta_HoraStart = agendadetalle.agendeta_HoraStart;
            this.agendadetalle[eventIndex].agendeta_HoraEnd = agendadetalle.agendeta_HoraEnd;
            this.agendadetalle[eventIndex].agendeta_Observaciones = agendadetalle.agendeta_Observaciones;
            this.agendadetalle[eventIndex].acti_Id = agendadetalle.acti_Id;
            this.agendadetalle[eventIndex].medi_Id = agendadetalle.medi_Id;
            this.agendadetalle[eventIndex].acti_Class = agendadetalle.acti_Class;
            this.agendadetalle[eventIndex].agen_Id = this.agendaId;
    
            this.isEditable = false;
          }
        });

        this.service.getAgendaDetalles(this.agendaId).subscribe((response: any) => {
            const currentDate = new Date();
            this.calendarEventsData = response.data.map((item: any) => ({
                id: item.agendeta_Id,
                title: item.acti_Nombre,
                start: new Date(currentDate.toDateString() + ' ' + item.agendeta_HoraStart),
                end: new Date(currentDate.toDateString() + ' ' + item.agendeta_HoraEnd),
                classNames: [item.acti_Class]
            }));

            this.agendadetalle = response.data;
            this.originalAgenda =JSON.parse(JSON.stringify(response.data));

            console.log(this.agendadetalle);

            console.log('mete data');

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
                eventDrop: this.onEventDrop.bind(this),
                allDaySlot: false,
                dayHeaderContent: 'Agenda',
            }

        });

          this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/apps/agendas/list';
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
        console.log("bajó");
        const event = arg.event;
        // const detalle = arg.event;
        this.event = { id: String(event.id), title: event.title, classNames: event.classNames, category: event.classNames[0] };
        this.isEditable = true;
        const index = this.calendarEventsData.findIndex(item => item.id?.toString() === this.event.id);
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
        console.log("bajó");
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
            if(this.calendarEventsData.length === 0){
                newEvent.id = "1";
            } else{
                // Find the maximum id value in calendarEventsData
                this.maxId = Math.max(...this.calendarEventsData.map((event) => Number(event.id)));
    
                // Set newEvent.id to maxId + 1
                newEvent.id = String(this.maxId + 1);
            }

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

        /**
     * Opens event modal
     * @param title title of modal
     * @param data data to be used in modal
     */
    openEventModal(title: string = "", data: any = {}): void {
        this.eventModal.openModal(title, data);
    }

    createNewEvent(): void {
        this.event = { id: String(this.calendarEventsData.length + 1), title: '', classNames: '', category: 'bg-danger', start: new Date() };
        this.isEditable = false;
        this.openEventModal('Agregar Evento', this.event);
      }
    
    updateAgendaDetalles(): void {
        if(this.agendadetalle.length === 0){
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
        } else { 
            console.log(this.agendadetalle, 'agenda detalle');
            console.log(this.originalAgenda, 'original agenda');

            if(JSON.stringify(this.agendadetalle) === this.originalAgenda){
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    title: '¡Perfecto!',
                    text: 'La agenda ha sido actualizadaaaa',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1850,
                    timerProgressBar: true
                  }).then(() => {
                  });
                  this.router.navigate([this.returnUrl]);
            } else{

                this.service.addAgendaDetalles(this.agendadetalle).subscribe((response: any) => {
                    console.log(response);
                    console.log(this.agendadetalle);
                    if(response.code === 200){
                        Swal.fire({
                            toast: true,
                            position: 'top-end',
                            title: '¡Perfecto!',
                            text: 'La agenda ha sido actualizada',
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 1850,
                            timerProgressBar: true
                          }).then(() => {
                          });
                          this.router.navigate([this.returnUrl]);
                    } else{
                    }
                });
            }
        }
    }
}

