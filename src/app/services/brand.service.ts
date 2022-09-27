import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Brand } from '../models/brand';
import { ResponseModel } from '../models/responseModel';


@Injectable({
    providedIn:'root'
})
export class BrandService{
    apiUrl="https://localhost:44353/api/brands/";
    constructor(private httpClient:HttpClient) {   
    }
    getBrands():Observable<ListResponseModel<Brand>>{
  
      return this.httpClient.get<ListResponseModel<Brand>>(this.apiUrl+"getall");    
      }
    addBrand(brand:Brand):Observable<ResponseModel>{
      return this.httpClient.post<ResponseModel>(this.apiUrl+"add",brand)
    }
    updateBrand(brand:Brand):Observable<ResponseModel>{
      return this.httpClient.post<ResponseModel>(this.apiUrl+"update",brand)
    }
}
  
