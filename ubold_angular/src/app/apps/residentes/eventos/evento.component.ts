import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { EventInput } from '@fullcalendar/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Select2Data, Select2 } from 'ng-select2-component';
import { ServiceService } from '../../Service/service.service';
import { AgendaDetalle } from '../../Models';


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

  @Output() eventSaved: EventEmitter<EventInput> = new EventEmitter();
  @Output() eventDeleted: EventEmitter<EventInput> = new EventEmitter();

  @ViewChild('content', { static: true }) content: any;
  constructor (public activeModal: NgbModal,
               private service: ServiceService,) { }


  ngOnInit(): void {
    this.service.getActividades().subscribe((response: any) => {
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
        label: 'Escoja una actividad',
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
    this.event = { id: data['id'], title: data['title'], 
                   start: data['start'], end: data['end'], classNames: data['category'] };
    this.activeModal.open(this.content, { backdrop: "static" });
  }

  setEventTitle(selectRef: Select2) {
    const selectedOption = Array.isArray(selectRef.option)
      ? selectRef.option[0] // Assuming you want the first option in case of multiple selections
      : selectRef.option;
    
    if (selectedOption && 'label' in selectedOption) {
      this.event.title = selectedOption.label;
    }
  }
  
  

  /**
   * stores event in calendar events
   */
  saveEvent() {
    const currentDate = new Date();
    this.event.start = new Date(currentDate.toDateString() + ' ' + this.event.start);
    this.event.end = new Date(currentDate.toDateString() + ' ' + this.event.end);
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
