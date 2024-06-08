import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Customer } from '../interface/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerHttpService {

  _http = inject(HttpClient)

  getById(id: number) {
    return this._http.get<Customer>(`http://localhost:8080/customers/${id}`);
  }

  getByIdWithBalance(id: number) {
    return this._http.get<Customer>(`http://localhost:8080/customers/with-balance/${id}`);
  }

  getAll() {
    return this._http.get<Customer[]>(`http://localhost:8080/customers`);
  }

  create(customer: Customer) {
    return this._http.post<Customer>(`http://localhost:8080/customers`, customer);
  }

  update(customer: Customer) {
    return this._http.put<Customer>(`http://localhost:8080/customers/${customer.id}`, customer);
  }

  delete(customer: Customer) {
    return this._http.delete<boolean>(`http://localhost:8080/customers/${customer.id}`);
  }
}
