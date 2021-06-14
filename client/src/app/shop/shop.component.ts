import { Component, OnInit } from '@angular/core';
import { IBrand } from '../shared/models/brands';
import { IProduct } from '../shared/models/product';
import { IProductType } from '../shared/models/productType';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  products: IProduct[];
  brands: IBrand[];
  productTypes: IProductType[];

  brandIdSelected: number;
  productTypeSelected: number;
  sortSelected = 'name';
  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to High', value: 'priceAsc'},
    {name: 'Price: High to Low', value: 'priceDesc'}
  ];

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.brandIdSelected = 0;
    this.productTypeSelected = 0;

    this.getProducts();
    this.getBrands();
    this.getProductTypes();
  }

  getProducts(): void {
    this.shopService.getProducts(this.brandIdSelected, this.productTypeSelected, this.sortSelected).subscribe(response => {
      this.products = response.data;
    }, error => {
      console.log(error);
    });
  }

  getBrands(): void {
    this.shopService.getBrands().subscribe(response => {
      this.brands = [{id: 0, name: 'All'}, ...response];
    }, error => {
      console.log(error);
    });
  }

  getProductTypes(): void {
    this.shopService.getTypes().subscribe(response => {
      this.productTypes = [{id: 0, name: 'All'}, ...response];
    }, error => {
      console.log(error);
    });
  }

  onBrandSelected(brandId: number) {
    this.brandIdSelected = brandId;
    this.getProducts();
  }

  onProductTypeSelected(productTypeId: number) {
    this.productTypeSelected = productTypeId;
    this.getProducts();
  }

  onSortSelected(sort: string) {
    this.sortSelected = sort;
    this.getProducts();
  }
}
