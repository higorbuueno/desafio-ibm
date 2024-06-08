import { Component, Input, inject } from '@angular/core';
import { Customer } from '../../interface/customer';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BankTransactionHttpService } from '../transaction-http.service';
import { BankTransaction } from '../../interface/bank-transaction';
import { BankTransactionType } from '../../interface/enum/bank-transaction-type.enum';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-bank-transaction-add',
  templateUrl: './bank-transaction-add.component.html',
  styleUrl: './bank-transaction-add.component.scss'
})
export class BankTransactionAddComponent {

  fb = inject(FormBuilder);
  _modal = inject(NgbActiveModal);
  private _customerService = inject(CustomerService);
  _bankTransactionHttpService = inject(BankTransactionHttpService);

  // ENUM
  bankTransactionType = BankTransactionType;

  form: FormGroup = this.fb.group({
    value: [null],
    type: [null],
    customer: [this._customerService.customer],
  });

  submit() {
    if (this.form.valid) {
      this.new();
    }
  }

  new() {
    this._bankTransactionHttpService
      .create(this.form.value)
      .subscribe({
        next: (result) => {
          this.close(result)
          alert("Transação cadastrada com sucesso!");
        },
        error: error => {
          alert("Erro ao cadastrar transação");
        },
      })
  }


  close(bankTransaction: BankTransaction) {
    this._modal.close(bankTransaction);
  }

  cancel() {
    this._modal.dismiss();
  }

}
