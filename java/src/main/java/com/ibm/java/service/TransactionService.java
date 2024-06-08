package com.ibm.java.service;

import com.ibm.java.dto.TransactionDTO;
import com.ibm.java.mapper.MapperCustom;
import com.ibm.java.model.Transaction;
import com.ibm.java.repository.TransactionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TransactionService {
    private final TransactionRepository repo;
    private final MapperCustom mapper;

    public TransactionService(TransactionRepository repo, MapperCustom mapper) {
        this.repo = repo;
        this.mapper = mapper;
    }

    /**
     * Método para buscar as transações pelo id do cliente;
     *
     * @param customerId
     * @return
     */
    public List<TransactionDTO> findAllByCustomerId(Long customerId) {
        return this.mapper.mapListAll(this.repo.findAllByCustomerIdOrderByDateDesc(customerId), TransactionDTO.class);
    }

    /**
     * Método para criar uma transação
     *
     * @param transactionDTO
     * @return transactionDTO
     */
    @Transactional
    public TransactionDTO create(TransactionDTO transactionDTO) {
        transactionDTO.setDate(LocalDateTime.now());
        return this.mapper.mapTo(this.repo.save(this.mapper.mapTo(transactionDTO, Transaction.class)), TransactionDTO.class);
    }

}
