import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { HttpClient } from '@angular/common/http';
import { Rental } from '../models/rental';
import { Rentals } from '../models/rentals';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl="https://localhost:44353/api/rentals/getrentaldetails";
  constructor(private httpClient:HttpClient) {   
  }
  getRentals():Observable<ListResponseModel<Rental>>{

    return this.httpClient.get<ListResponseModel<Rental>>(this.apiUrl);    
    }
    

    list():Rental[]{
      return Rentals;
    }
}