

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { Donaciones, Centro } from '../Model';
import {ServiceD} from '../service.service';
import {ServiceService} from 'src/app/apps/Service/service.service';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  donacionId: number = 0;
  donacion: Donaciones = new Donaciones(); 
  centros: Centro[] = [];

  constructor (private route: ActivatedRoute,
    private service: ServiceD,
    private service2: ServiceService,) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.donacionId = params['id'];
      // Aquí hacer lo que necesite con el ID 
      console.log(this.donacionId, "llega????");
    });


    this.pageTitle = [{ label: 'Donaciones', path: '/' }, { label: 'Detalles', path: '/', active: true }];
    this.Editar();

    this.service.getDonacionCentros(this.donacionId)
    .subscribe((data: any)=>{
      this.centros = data.data;
    })
  }

  Editar() {
    const meses = [
      { numero: '01', nombre: 'Enero' },
      { numero: '02', nombre: 'Febrero' },
      { numero: '03', nombre: 'Marzo' },
      { numero: '04', nombre: 'Abril' },
      { numero: '05', nombre: 'Mayo' },
      { numero: '06', nombre: 'Junio' },
      { numero: '07', nombre: 'Julio' },
      { numero: '08', nombre: 'Agosto' },
      { numero: '09', nombre: 'Septiembre' },
      { numero: '10', nombre: 'Octubre' },
      { numero: '11', nombre: 'Noviembre' },
      { numero: '12', nombre: 'Diciembre' }
    ];
  
    this.service.findDonacionId(this.donacionId)
      .subscribe((data: any) => {
        console.log(data.data);
  
        this.donacion = data.data;
        const formattedDate = this.donacion.dona_Fecha ? formatDate(this.donacion.dona_Fecha, 'yyyy-MM-dd', 'en-US') : '';
  
        const fechaCrea = this.donacion.dona_FechaCreacion ? formatDate(this.donacion.dona_FechaCreacion, 'yyyy-MM-dd', 'en-US') : '';
        const fechaModif = this.donacion.dona_FechaModificacion ? formatDate(this.donacion.dona_FechaModificacion, 'yyyy-MM-dd', 'en-US') : '';

        const parts = formattedDate.split('-');
        const mesNumero = parts[1];
        const dia = parts[2];
        const año = parts[0]; // Obtener el año
  
        const mesObj = meses.find(mes => mes.numero === mesNumero); 
        const mesNombre = mesObj ? mesObj.nombre : '';
        console.log(mesNumero, "el numero mas el mes:", mesNombre)
  
        this.donacion.dona_Fecha = formattedDate;
        this.donacion.mes = mesNumero;
        this.donacion.dia = dia;
        this.donacion.mesNombre = mesNombre;
        this.donacion.ayo = año; 
        this.donacion.dona_FechaCreacion = fechaCrea;
        this.donacion.dona_FechaModificacion = fechaModif;
        console.log(mesNumero, mesNombre, dia, año);
        console.log(this.donacion, "timelineData");
      });
  }
  
  
  
 
}


