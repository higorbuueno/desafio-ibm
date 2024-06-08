package com.ibm.java.repository;

import com.ibm.java.model.Customer;
import com.ibm.java.model.projection.CustomerWithBalance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    @Query("SELECT c.id AS id, c.name AS name, c.email AS email, c.accNumber AS accNumber, " +
            "SUM(CASE WHEN t.type = 'CREDIT' THEN t.value ELSE -t.value END) AS accountBalance " +
            "FROM Customer c LEFT JOIN c.transactions t " +
            "WHERE c = :customer GROUP BY c.id")
    Optional<CustomerWithBalance> findCustomerWithBalance(Customer customer);
}
