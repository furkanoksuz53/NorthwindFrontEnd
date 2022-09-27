import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { CarImage } from '../models/carImage';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  apiUrl="https://localhost:44353/api/carImages";
    constructor(private httpClient:HttpClient) {   
    }
    getImages():Observable<ListResponseModel<CarImage>>{  
      return this.httpClient.get<ListResponseModel<CarImage>>(this.apiUrl);    
    }

    getCarImageByCarId(carId:number):Observable<ListResponseModel<CarImage>>{
      return this.httpClient
      .get<ListResponseModel<CarImage>>(this.apiUrl + '/getbycarid?carId=' + carId)
    }
  
}