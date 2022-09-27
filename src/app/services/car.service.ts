import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { HttpClient } from '@angular/common/http';
import { Car } from '../models/car';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl="https://localhost:44353/api/";
  constructor(private httpClient:HttpClient) {   }

  getCarsByColor(colorId:number):Observable<ListResponseModel<Car>>{
    let newUrl =this.apiUrl + "cars/getcardetailsbycolorid?colorId="+colorId
    return this.httpClient.get<ListResponseModel<Car>>(newUrl);    
    }
  
  getCarsByBrand(brandId:number):Observable<ListResponseModel<Car>>{
    let newUrl = this.apiUrl + "cars/getcardetailsbybrandid?brandId=" + brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newUrl);
    }
  getCarDetails():Observable<ListResponseModel<Car>>{
    let newUrl:string = this.apiUrl + "cars/getcardetails"
    return this.httpClient.get<ListResponseModel<Car>>(newUrl);
  }
  getCarById(id:number):Observable<ListResponseModel<Car>>{
    let newUrl = this.apiUrl + "cars/getcardetailsbyid?id=" + id
    return this.httpClient.get<ListResponseModel<Car>>(newUrl);
  }
  getImagesByCarId(id:number):Observable<ListResponseModel<Car>>{
    let newUrl = this.apiUrl + "CarImages/getbycarid?carId=" + id
    return this.httpClient.get<ListResponseModel<Car>>(newUrl);
  }
  addCar(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"cars/add",car)
  }
  updateCar(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"cars/update",car)
  }
}