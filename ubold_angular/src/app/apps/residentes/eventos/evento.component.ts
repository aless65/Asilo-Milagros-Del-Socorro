import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { EventInput } from '@fullcalendar/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Select2Data, Select2 } from 'ng-select2-component';
import { ServiceService } from '../../Service/service.service';
import { AgendaDetalle, Actividad } from '../../Models';


@Component({
  selector: 'app-residente-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.scss']
})

export class CalendarEventComponent implements OnInit {

  modelTitle: string = "";
  event: EventInput = {};
  agendadetalle: AgendaDetalle = {};
  actividad: Select2Data = [];
  medicamento: Select2Data = [];
  actividadForClass: Actividad[] = [];

  @Output() eventSaved: EventEmitter<EventInput> = new EventEmitter();
  @Output() eventDeleted: EventEmitter<EventInput> = new EventEmitter();

  @ViewChild('content', { static: true }) content: any;
  constructor(public activeModal: NgbModal,
    private service: ServiceService,) { }


  ngOnInit(): void {
    this.service.getActividades().subscribe((response: any) => {
      this.actividadForClass = response.data;
      let options = response.data.map((item: any) => ({
        value: item.acti_Id,
        label: item.acti_Nombre
      }));

      this.actividad = [{
        label: 'Escoja una actividad',
        options: options
      },
      ];
    });

    this.service.getMedicamentos().subscribe((response: any) => {
      let options = response.data.map((item: any) => ({
        value: item.medi_Id,
        label: item.medi_Nombre
      }));

      this.medicamento = [{
        label: 'Escoja un medicamento',
        options: options
      },
      ];
    });
  }

  /**
   * opens modal
   * @param title title of modal 
   * @param data data to be used in modal
   */
  openModal(title: string, data: any): void {
    const currentDate = new Date();
    this.modelTitle = title;
    this.event = {
      id: data['id'], title: data['title'],
      start: data['start'], end: data['end'], classNames: data['classNames']
    };
    this.activeModal.open(this.content, { backdrop: "static" });
  }

  setEventTitle(selectRef: Select2) {
    this.agendadetalle.acti_Id = parseInt(selectRef.value.toString(), 10);
    const selectedOption = Array.isArray(selectRef.option)
      ? selectRef.option[0] // Assuming you want the first option in case of multiple selections
      : selectRef.option;

    if (selectedOption && 'label' in selectedOption) {
      this.agendadetalle.acti_Nombre = selectedOption.label;
      this.event.title = selectedOption.label;
    }

    const matchingActividad = (this.actividadForClass).find(
      (actividadForClass: Actividad) => actividadForClass.acti_Id === this.agendadetalle.acti_Id
    );
    if (matchingActividad) {
      this.event.category = matchingActividad.acti_Class?.toString();
    } else {
      // Set a default value or handle the case when there is no match
      this.event.category = ['default-class'];
    }
    console.log(this.actividadForClass);
    console.log(this.event);
    
  }



  /**
   * stores event in calendar events
   */
  saveEvent() {
    const currentDate = new Date();
    this.event.start = new Date(currentDate.toDateString() + ' ' + this.agendadetalle.agendeta_HoraStart);
    this.event.end = new Date(currentDate.toDateString() + ' ' + this.agendadetalle.agendeta_HoraEnd);
    console.log(this.event);
    this.eventSaved.emit(this.event);
    this.activeModal.dismissAll();
  }

  /**
   * deletes event from calendar events
   */
  deleteEvent() {
    this.eventDeleted.emit(this.event);
    this.activeModal.dismissAll();
  }


}
