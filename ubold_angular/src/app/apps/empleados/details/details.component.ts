
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { Empleados } from '../Model';
import {ServiceServiceE} from '../service.service';
import {ServiceService} from 'src/app/apps/Service/service.service';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

export class DetailsComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  empleadoId: number = 0;
  empleado: Empleados = new Empleados(); 

  constructor (private route: ActivatedRoute,
    private service: ServiceServiceE,
    private service2: ServiceService,) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.empleadoId = params['id'];
      // Aquí hacer lo que necesite con el ID 
      console.log(this.empleadoId, "llega????");
    });


    this.pageTitle = [{ label: 'Empleados', path: '/' }, { label: 'Detalles', path: '/', active: true }];
    this.Editar();
   
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
  
    this.service.getEmpleadoId(this.empleadoId)
      .subscribe((data: any) => {
        console.log(data.data);
  
        this.empleado = data.data;
        const formattedDate = this.empleado.empe_Nacimiento ? formatDate(this.empleado.empe_Nacimiento, 'yyyy-MM-dd', 'en-US') : '';
  
        const fechaCrea = this.empleado.empe_FechaCreacion ? formatDate(this.empleado.empe_FechaCreacion, 'yyyy-MM-dd', 'en-US') : '';
        const fechaModif = this.empleado.empe_FechaModificacion ? formatDate(this.empleado.empe_FechaModificacion, 'yyyy-MM-dd', 'en-US') : '';

        const parts = formattedDate.split('-');
        const mesNumero = parts[1];
        const dia = parts[2];
        const año = parts[0]; // Obtener el año
  
        const mesObj = meses.find(mes => mes.numero === mesNumero); 
        const mesNombre = mesObj ? mesObj.nombre : '';
        console.log(mesNumero, "el numero mas el mes:", mesNombre)
  
        this.empleado.empe_Nacimiento = formattedDate;
        this.empleado.mes = mesNumero;
        this.empleado.dia = dia;
        this.empleado.mesNombre = mesNombre;
        this.empleado.ayo = año; 
        this.empleado.empe_FechaCreacion = fechaCrea;
        this.empleado.empe_FechaModificacion = fechaModif;
        console.log(mesNumero, mesNombre, dia, año);
        console.log(this.empleado, "timelineData");
      });
  }
  
  
  
 
}


