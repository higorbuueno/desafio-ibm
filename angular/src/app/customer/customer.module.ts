import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer.component';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { CustomerHeaderComponent } from './customer-header/customer-header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomerStatmentComponent } from './customer-statment/customer-statment.component';
import { CustomerStatmentResolver } from './guards/customer.statment.resolver';
import { CustomerResolver } from './guards/customer.resolver';
import { BankTransactionAddComponent } from './bank-transaction-add/bank-transaction-add.component';

const routes: Routes = [
  { path: '', redirectTo: 'customers', pathMatch: 'full' },
  {
    path: '', component: CustomerComponent,
    children: [
      {
        path: '',
        component: CustomerListComponent,
        pathMatch: 'full',
        resolve: { customers: CustomerResolver }
      },
      {
        path: 'statment/:id',
        component: CustomerStatmentComponent,
        pathMatch: 'full',
        resolve: { customer: CustomerStatmentResolver }
      }
    ]
  },

];

@NgModule({
  declarations: [
    CustomerComponent,
    CustomerListComponent,
    CustomerAddComponent,
    CustomerStatmentComponent,
    CustomerHeaderComponent,
    BankTransactionAddComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    NgbToastModule
  ],
  providers: [CustomerStatmentResolver, CustomerResolver]
})
export class CustomerModule { }
