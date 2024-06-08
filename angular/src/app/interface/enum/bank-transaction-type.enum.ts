export enum BankTransactionType {
    DEBIT = "débito",
    CREDIT = "crédito",
}

export type BankTransactionTypeEnumType = keyof typeof BankTransactionType;