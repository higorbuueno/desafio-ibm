import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CustomerService } from '../customer.service';
import { BankTransaction } from '../../interface/bank-transaction';
import { BankTransactionType } from '../../interface/enum/bank-transaction-type.enum';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { BankTransactionHttpService } from '../transaction-http.service';
import { CustomerHttpService } from '../customer-http.service';
import { Customer } from '../../interface/customer';

@Component({
  selector: 'app-customer-statment',
  templateUrl: './customer-statment.component.html',
  styleUrl: './customer-statment.component.scss'
})
export class CustomerStatmentComponent implements OnInit, OnDestroy {
  private _customerService = inject(CustomerService);
  private _activatedRoute = inject(ActivatedRoute);
  private _transactionHttpService = inject(BankTransactionHttpService);
  private _customerHttpService = inject(CustomerHttpService);

  // SUBJECTS
  private _unsubscribeAll = new Subject<any>();
  private _subscription!: Subscription;

  // ENUM
  bankTransactionType: any = BankTransactionType;

  // TRANSACTIONS
  transactions: BankTransaction[] = [];

  ngOnInit(): void {
    this.getCustomerFromResolver();
    this.subscribeCustomersChanges();
  }

  ngOnDestroy(): void {
    this._customerService.setCustomer(null);
    this._subscription ? this._subscription.unsubscribe() : null;
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  getCustomerFromResolver() {
    this._subscription = this._activatedRoute.data.subscribe(
      (result) => {
        this._customerService.setCustomer(result["customer"]);
        this.getTransactions();
      }
    )
  }

  getTransactions() {
    this._transactionHttpService
      .getAllByCustomerId(this._customerService.customer?.id as number)
      .subscribe({
        next: (result: BankTransaction[]) => {
          this.transactions = result;
        },
        error: (error: any) => {
        },
      })
  }


  getCustomer() {
    this._customerHttpService
      .getByIdWithBalance(this._customerService.customer?.id as number)
      .subscribe({
        next: (result: Customer) => {
          this._customerService.setCustomer(result);
        },
        error: (error: any) => {
        },
      })
  }

  subscribeCustomersChanges() {
    this._customerService.onRefreshSearch$.pipe(takeUntil(this._unsubscribeAll)).subscribe(() => {
      this.getTransactions();
      this.getCustomer();
    })
  }
}
