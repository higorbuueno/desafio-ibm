import { Customer } from "./customer";
import { BankTransactionType } from "./enum/bank-transaction-type.enum";

export interface BankTransaction {
    id?: number;
    type: BankTransactionType;
    value: number;
    date: Date;
    customer: Customer;
}