package com.ibm.java.enums;

public enum BankTransactionType {

    DEBIT ("D"),
    CREDIT ("C");

    private final String bankTransactionType;

    BankTransactionType(String bankTransactionType) {
        this.bankTransactionType = bankTransactionType;
    }

    public String getBankTransactionType() {
        return bankTransactionType;
    }

    public String getValue() {
        return bankTransactionType;
    }

    public static BankTransactionType getByName(String name) {
        if (name != null) {
            for (BankTransactionType item : BankTransactionType.values()) {
                if (item.name().toUpperCase().contains(name.toUpperCase())) {
                    return item;
                }
            }
        }
        return null;
    }

}
