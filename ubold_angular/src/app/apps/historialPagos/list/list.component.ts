import { Component, OnInit } from '@angular/core';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { PRODUCTLIST } from 'src/app/apps/ecommerce/shared/data';
import { Product } from 'src/app/apps/ecommerce/shared/ecommerce.model';
import {ServiceServiceH} from '../service.service';
import {ServiceService} from 'src/app/apps/Service/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Residente } from '../Model';

@Component({
  selector: 'app-historialPagos-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  returnUrl: string = '/';
  pageTitle: BreadcrumbItem[] = [];
  products: Product[] = [];
  residentes: Residente[] = [];
  searchTerm: string = '';
  page = 1;
  pageSize = 8;

  constructor (
    private service: ServiceServiceH,
    private service2: ServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Ecommerce', path: '/' }, { label: 'Products', path: '/', active: true }];
    this._fetchData();

    this.cargarResidente();

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/apps/encargados/list';
  }



  cargarResidente() {
    this.service.getResidentes()
      .subscribe((data: any) => {
        console.log(data);
        this.residentes = data.data;
      });
  }

  /**
   * fetches product list
   */
  _fetchData(): void {
    this.products = PRODUCTLIST; //aqui le doy el valor al model de lo que me trae
  }



  /**
   * Search Method
  */
  searchData(searchTerm: string): void {
    if (searchTerm === '') {
      this._fetchData();
    }
    else {
      let updatedData = PRODUCTLIST;
      //  filter
      updatedData = updatedData.filter(product => product.name?.toLowerCase().includes(searchTerm));
      this.products = updatedData;
    }

  }

  searchData2(searchTerm: string): void {
    if (searchTerm === '') {
      this.cargarResidente();
    }
    else {
      let updatedData = this.residentes;
      //  filter
      updatedData = updatedData.filter(residente => residente.resi_NombreCompleto?.toLowerCase().includes(searchTerm));
      this.residentes = updatedData;
    }

  }


}
