package com.ibm.java.repository;

import com.ibm.java.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findAllByCustomerIdOrderByDateDesc(Long customerId);
}
