package com.ibm.java.service;

import com.ibm.java.dto.CustomerDTO;
import com.ibm.java.mapper.MapperCustom;
import com.ibm.java.model.Customer;
import com.ibm.java.model.projection.CustomerWithBalance;
import com.ibm.java.repository.CustomerRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CustomerService {
    private final CustomerRepository repo;
    private final MapperCustom mapper;

    public CustomerService(CustomerRepository repo, MapperCustom mapper) {
        this.repo = repo;
        this.mapper = mapper;
    }

    /**
     * Método para buscar um customer pelo id;
     *
     * @param id
     * @return
     */
    public List<CustomerDTO> findAll() {
        return this.mapper.mapListAll(this.repo.findAll(), CustomerDTO.class);
    }

    /**
     * Método para buscar um customer pelo id;
     *
     * @param id
     * @return
     */
    public CustomerDTO findById(Long id) {
        return this.mapper.mapTo(this.repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado")), CustomerDTO.class);
    }


    /**
     * Método para criar um customer
     *
     * @param customerDTO
     * @return customerDTO
     */
    @Transactional
    public CustomerDTO create(CustomerDTO customerDTO) {
        return this.mapper.mapTo(this.repo.save(this.mapper.mapTo(customerDTO, Customer.class)), CustomerDTO.class);
    }

    /**
     * Método para atualizar um customer pelo id;
     *
     * @param id
     * @param customerDTO
     * @return customerDTO
     */
    @Transactional
    public CustomerDTO update(Long id, CustomerDTO customerDTO) {

        if (!id.equals(customerDTO.getId())) {
            throw new RuntimeException("Ids enviados são diferentes");
        }

        Customer customer = this.repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        customer.setName(customerDTO.getName());
        customer.setAge(customerDTO.getAge());
        customer.setEmail(customerDTO.getEmail());
        customer.setAccNumber(customerDTO.getAccNumber());
        return this.mapper.mapTo(this.repo.save(customer), CustomerDTO.class);
    }

    /**
     * Método para deletar um customer pelo id;
     *
     * @param id
     * @return boolean
     */
    public Boolean delete(Long id) {
        Customer customer = this.repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
        this.repo.delete(customer);
        return true;
    }


    /**
     * Método para atualizar um customer pelo id;
     *
     * @param customerId
     * @return customerDTO
     */
    @Transactional
    public CustomerWithBalance getCustomerWithBalance(Long customerId) {
        Customer customer = this.repo.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
        return this.repo.findCustomerWithBalance(customer).orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
    }

}
