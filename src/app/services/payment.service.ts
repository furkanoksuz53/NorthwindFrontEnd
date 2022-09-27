import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';
import { ListResponseModel } from '../models/listResponseModel';
import { Payment } from '../models/payment';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  apiUrl: string = 'https://localhost:44353/api/payments';
  constructor(private httpClient: HttpClient) {}

  getPayments(): Observable<ListResponseModel<Payment>> {
    const newpath: string = this.apiUrl + '/getall';

    return this.httpClient.get<ListResponseModel<Payment>>(newpath);
  }

  addPayment(payment: Payment): Observable<ResponseModel> {
    const newpath: string = this.apiUrl + '/add';

    return this.httpClient.post<ResponseModel>(newpath, payment);
  }
}