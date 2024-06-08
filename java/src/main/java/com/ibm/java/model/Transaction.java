package com.ibm.java.model;

import com.ibm.java.enums.BankTransactionType;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "transaction")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "transaction_value")
    private BigDecimal value;

    @Column(name = "date")
    private LocalDateTime date;

    @Column(name = "type")
    @Enumerated(EnumType.STRING)
    private BankTransactionType type;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;
}
