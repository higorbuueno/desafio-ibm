import { Injectable } from '@angular/core';
import { Customer } from '../interface/customer';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private _customer!: Customer | null;
  private _refreshSearch = new BehaviorSubject<boolean>(false);

  get customer() {
    return this._customer
  }

  setCustomer(customer: Customer | null) {
    this._customer = customer;
  }

  refreshSearch() {
    this._refreshSearch.next(true);
  }

  get onRefreshSearch$() {
    return this._refreshSearch.asObservable();
  }
}
