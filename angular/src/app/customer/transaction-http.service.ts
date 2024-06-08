import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Customer } from '../interface/customer';
import { BankTransaction } from '../interface/bank-transaction';

@Injectable({
  providedIn: 'root'
})
export class BankTransactionHttpService {

  _http = inject(HttpClient)

  getAllByCustomerId(customerId: number) {
    const params = {
      customerId: customerId
    }
    return this._http.get<BankTransaction[]>(`http://localhost:8080/transactions`, { params });
  }

  create(bankTransaction: BankTransaction) {
    return this._http.post<BankTransaction>(`http://localhost:8080/transactions`, bankTransaction);
  }
}
