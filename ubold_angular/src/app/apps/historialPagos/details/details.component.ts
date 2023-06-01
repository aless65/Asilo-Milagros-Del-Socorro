import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';

import { formatDate } from '@angular/common';
import {ServiceServiceH} from '../service.service';
import {ServiceService} from 'src/app/apps/Service/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Pagos, PagosPost } from '../Model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})


export class DetailsComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  timelineData: Pagos[] = [];
  searchTerm: string = '';
  Id: number = 0;


  constructor (
    private sanitizer: DomSanitizer,
    private service: ServiceServiceH,
    private service2: ServiceService,
    private route: ActivatedRoute,
    private router: Router ) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      const residenteId = params['id'];
      this.Id = residenteId;
      // aqui estoy utilizando el ID del residente 
      console.log(residenteId, "recibo el Id");
    });


   
    this.pageTitle = [{ label: 'Extra Pages', path: '/' }, { label: 'Timeline', path: '/', active: true }];
   
    this._fetchData();
   /* this.cargarHistorial();*/

  }

  /**
   * fetches timeline data
   */
  _fetchData(): void {
    const meses = [
      { numero: '01', nombre: 'enero' },
      { numero: '02', nombre: 'febrero' },
      { numero: '03', nombre: 'marzo' },
      { numero: '04', nombre: 'abril' },
      { numero: '05', nombre: 'mayo' },
      { numero: '06', nombre: 'junio' },
      { numero: '07', nombre: 'julio' },
      { numero: '08', nombre: 'agosto' },
      { numero: '09', nombre: 'septiembre' },
      { numero: '10', nombre: 'octubre' },
      { numero: '11', nombre: 'noviembre' },
      { numero: '12', nombre: 'diciembre' }
    ];
    
    this.service.getHistorial(this.Id)
      .subscribe((data: any) => {
        this.timelineData = data.data.map((item: PagosPost) => {
          const formattedDate = item.pago_Fecha ? formatDate(item.pago_Fecha, 'yyyy-MM-dd', 'en-US') : '';
  
          const parts = formattedDate.split('-');
          const mesNumero = parts[1];
          const dia = parts[2];
  
          const mesObj = meses.find(mes => mes.numero === mesNumero); 
          const mesNombre = mesObj ? mesObj.nombre : '';
          console.log(mesNumero, "el numero mas el mes:", mesNombre)
          return {
            id: 1,
            day: formattedDate,
            pago_Id: item.pago_Id,
            mes: mesNumero,
            dia: dia,
            mesNombre: mesNombre,
            pago_Fecha: formattedDate,
            meto_Nombre: item.meto_Nombre,
            content: item.resi_NombreCompleto,
          };
        });
  
        console.log(this.timelineData, "timelineData");
      });
  }
  
  
  
  

  /*cargarHistorial() {
    this.service.getHistorial(this.Id)
      .subscribe((data: any) => {
        console.log(data, "Le di el Id");
        this.historial = data.data;
      });
  }*/

  searchData2(searchTerm: string): void {
    if (searchTerm === '') {
      this._fetchData();
    } else {
      let updatedData = this.timelineData;
      // Filter by date or payment method
      updatedData = updatedData.filter(
        historial =>
          historial.pago_Fecha?.toString().toLowerCase().includes(searchTerm) ||
          historial.meto_Nombre?.toLowerCase().includes(searchTerm) ||
          historial.mesNombre?.toLowerCase().includes(searchTerm)
      );
      this.timelineData = updatedData;
    }
  }
  




  /**
 * returns the safe content which can be rendered
 * @param content content
 */
  getRenderedPostContent(content: string) {
    return this.sanitizer.sanitize(1, content);
  }




}
