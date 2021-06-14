import { HttpClient, HttpParams } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IBrand } from '../shared/models/brands';
import { IPagination } from '../shared/models/pagination';
import { IProductType } from '../shared/models/productType';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) { }

  getProducts(brandId?: number, productTypeId?: number, sort?: string) {
    let params = new HttpParams();

    if (brandId) {
      params = params.append('brandId', brandId.toString());
    }

    if (productTypeId) {
      params = params.append('typeId', productTypeId.toString());
    }

    if (sort) {
      params = params.append('sort', sort);
    }

    return this.http.get<IPagination>(this.baseUrl + 'products?pageSize=50', {observe: 'response', params})
       .pipe(
         map(response => {
           return response.body;
         })
       );
  }

  getBrands(): Observable<IBrand[]> {
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands');
  }

  getTypes(): Observable<IProductType[]> {
    return this.http.get<IProductType[]>(this.baseUrl + 'products/types');
  }
}
