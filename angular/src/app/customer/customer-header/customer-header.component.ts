import { Component, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerAddComponent } from '../customer-add/customer-add.component';
import { CustomerService } from '../customer.service';
import { Location } from '@angular/common';
import { BankTransactionAddComponent } from '../bank-transaction-add/bank-transaction-add.component';

@Component({
  selector: 'app-customer-header',
  templateUrl: './customer-header.component.html',
  styleUrl: './customer-header.component.scss'
})
export class CustomerHeaderComponent {
  private _modalService = inject(NgbModal);
  private _customerService = inject(CustomerService);
  private _location = inject(Location)

  newCustomer() {
    const modalRef = this._modalService.open(CustomerAddComponent, { centered: true });
    modalRef.result.then(result => {
      if (result) {
        this._customerService.refreshSearch();
      }
    })
  }

  newTransaction() {
    const modalRef = this._modalService.open(BankTransactionAddComponent, { centered: true });
    modalRef.result.then(result => {
      if (result) {
        this._customerService.refreshSearch();
      }
    })
  }

  back() {
    this._location.back();
  }

  get customer() {
    return this._customerService.customer
  }
}
