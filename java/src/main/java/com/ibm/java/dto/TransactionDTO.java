package com.ibm.java.dto;

import com.ibm.java.enums.BankTransactionType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class TransactionDTO {
    private Long id;
    private BigDecimal value;
    private BankTransactionType type;
    private LocalDateTime date;
    private CustomerTransactionDTO customer;
}
