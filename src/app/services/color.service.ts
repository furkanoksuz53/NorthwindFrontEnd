import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { HttpClient } from '@angular/common/http';
import { Color } from '../models/color';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiUrl="https://localhost:44353/api/colors/";
  constructor(private httpClient:HttpClient) {   
  }
  getColors():Observable<ListResponseModel<Color>>{ 
    return this.httpClient.get<ListResponseModel<Color>>(this.apiUrl+"getall");    
    }
  addColor(color:Color):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"add",color)
  }
  updateColor(color:Color):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"update",color)
  }
}