import { Customer } from './../../interface/customer';
import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerHttpService } from '../customer-http.service';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrl: './customer-add.component.scss'
})
export class CustomerAddComponent implements OnInit {

  @Input() customer!: Customer;

  fb = inject(FormBuilder);
  _modal = inject(NgbActiveModal);
  _customerHttpService = inject(CustomerHttpService);

  form: FormGroup = this.fb.group({
    id: [null],
    name: [null],
    email: [null],
    age: [null, Validators.compose([Validators.min(0)])],
    accNumber: [null],
  });

  ngOnInit(): void {
    if (this.customer) {
      this.form.patchValue(this.customer)
    }
  }

  submit() {
    if (this.form.valid) {
      if (this.form.value.id) {
        this.update();
      } else {
        this.new();
      }
    }

  }

  new() {
    this._customerHttpService
      .create(this.form.value)
      .subscribe({
        next: (result) => {
          this.close(result)
          alert("Cliente cadastrado com sucesso!");
        },
        error: error => {
          alert("Erro ao cadastrar cliente");
        },
      })
  }

  update() {
    this._customerHttpService
      .create(this.form.value)
      .subscribe({
        next: (result) => {
          this.close(result)
          alert("Cliente atualizado com sucesso!");
        },
        error: error => {
          alert("Erro ao atualizar cliente");
        },
      })
  }

  close(customer: Customer) {
    this._modal.close(customer);
  }

  cancel() {
    this._modal.dismiss();
  }
}
