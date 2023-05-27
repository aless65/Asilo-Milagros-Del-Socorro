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
  @Output() agendaDetalleSaved: EventEmitter<AgendaDetalle> = new EventEmitter();

  @ViewChild('content', { static: true }) content: any;
  constructor(public activeModal: NgbModal,
    private service: ServiceService,) { }


  ngOnInit(): void {
    window.addEventListener('DOMContentLoaded', function () {
      var requiredLabels = document.querySelectorAll('label[for][required]');
      requiredLabels.forEach(function (label) {
        label.innerHTML = label.innerHTML.replace('*', '');
      });
    });

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
    // const currentDate = new Date();
    console.log(data);
    this.modelTitle = title;
    this.agendadetalle = {
      agendeta_HoraStart: data['agendeta_HoraStart'], agendeta_HoraEnd: data['agendeta_HoraEnd'],
      acti_Id: data['acti_Id'], medi_Id: data['medi_Id'], agendeta_Observaciones: data['agendeta_Observaciones'], agendeta_Id: data['agendeta_Id']
    }
    this.event.id = this.agendadetalle.agendeta_Id?.toString();
    // this.event = {
    //   id: data['id'], title: data['title'],
    //   start: data['start'], end: data['end'], classNames: data['classNames']
    // };
    this.activeModal.open(this.content, { backdrop: "static" });
  }

  setEventTitle() {

    const matchingActividad = (this.actividadForClass).find(
      (actividadForClass: Actividad) => actividadForClass.acti_Id === this.agendadetalle.acti_Id
    );
    if (matchingActividad) {
      this.event.category = matchingActividad.acti_Class?.toString();
    } else {
      // Set a default value or handle the case when there is no match
      this.event.category = ['default-class'];
    }

    const matchingTitle = (this.actividadForClass).find(
      (actividadForClass: Actividad) => actividadForClass.acti_Id === this.agendadetalle.acti_Id
    );
    if (matchingActividad) {
      this.event.title = matchingActividad.acti_Nombre?.toString();
    } else {
      // Set a default value or handle the case when there is no match
      this.event.title = '';
    }

    if (this.event.title !== 'Medicación') {
      this.agendadetalle.medi_Id = 0;
    }

  }

  clearFields() {
    this.agendadetalle = {};
  }

  /**
   * stores event in calendar events
   */
  saveEvent() {
    const currentDate = new Date();
    this.event.start = new Date(currentDate.toDateString() + ' ' + this.agendadetalle.agendeta_HoraStart);
    this.event.end = new Date(currentDate.toDateString() + ' ' + this.agendadetalle.agendeta_HoraEnd);
    console.log('dio clikc al boton', this.event);
    this.eventSaved.emit(this.event);
    this.agendaDetalleSaved.emit(this.agendadetalle);
    this.activeModal.dismissAll();
    this.clearFields();
  }

  /**
   * deletes event from calendar events
   */
  deleteEvent() {
    this.eventDeleted.emit(this.event);
    this.activeModal.dismissAll();
    this.clearFields();
  }


}
