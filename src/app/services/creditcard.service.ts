import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class CreditCardService {
  apiUrl: string = 'https://localhost:44353/api/creditcards';
  constructor(private httpClient: HttpClient) {}

  getCreditCards(): Observable<ListResponseModel<CreditCard>> {
    const newpath: string = this.apiUrl + '/getall';

    return this.httpClient.get<ListResponseModel<CreditCard>>(newpath);
  }

  verifyCreditCard(creditCard: CreditCard): Observable<ResponseModel> {
    const newPath: string = this.apiUrl + '/verify';

    return this.httpClient.post<ResponseModel>(newPath, creditCard);
  }
}