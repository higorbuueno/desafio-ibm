import { Component, OnInit, inject } from '@angular/core';
import { Customer } from '../../interface/customer';
import { CustomerAddComponent } from '../customer-add/customer-add.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription, take, takeUntil } from 'rxjs';
import { CustomerHttpService } from '../customer-http.service';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss'
})
export class CustomerListComponent implements OnInit {
  private _modalService = inject(NgbModal);
  private _activatedRoute = inject(ActivatedRoute);
  private _customerHttpService = inject(CustomerHttpService);
  private _customerService = inject(CustomerService);

  private _unsubscribeAll = new Subject<any>();
  private _subscription!: Subscription;


  customers: Customer[] = [];

  ngOnInit(): void {
    this.getCustomers();
    this.subscribeCustomersChanges();
  }

  ngOnDestroy(): void {
    this._subscription ? this._subscription.unsubscribe() : null;
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  getCustomers() {
    this._subscription = this._activatedRoute.data.subscribe(
      (result) => {
        this.customers = result["customers"];
      }
    )
  }

  subscribeCustomersChanges() {
    this._customerService.onRefreshSearch$.pipe(takeUntil(this._unsubscribeAll)).subscribe(() => {
      this.getAllCustomers();
    })
  }

  getAllCustomers() {
    this._customerHttpService
      .getAll()
      .subscribe({
        next: (result) => {
          this.customers = result;
        },
        error: error => {
        },
      })
  }

  updateCustomer(customer: Customer) {
    const modalRef = this._modalService.open(CustomerAddComponent, { centered: true });
    modalRef.componentInstance.customer = customer;
    modalRef.result.then(result => {
      if (result) {
        this._customerService.refreshSearch();
      }
    })
  }
}
