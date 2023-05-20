import { Component, OnInit } from '@angular/core';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { PRODUCTLIST } from '../../ecommerce/shared/data';
import { Product } from '../../ecommerce/shared/ecommerce.model';

@Component({
  selector: 'app-enfermedades-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  products: Product[] = [];
  searchTerm: string = '';
  page = 1;
  pageSize = 8;

  constructor () { }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Ecommerce', path: '/' }, { label: 'Products', path: '/', active: true }];
    this._fetchData();
  }

  /**
   * fetches product list
   */
  _fetchData(): void {
    this.products = PRODUCTLIST;
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


}
