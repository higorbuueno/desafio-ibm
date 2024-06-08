package com.ibm.java.controller;

import com.ibm.java.dto.CustomerDTO;
import com.ibm.java.model.projection.CustomerWithBalance;
import com.ibm.java.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/customers")
public class CustomerController {

    @Autowired
    private CustomerService service;

    @GetMapping()
    public ResponseEntity<List<CustomerDTO>> findAll() {
        return new ResponseEntity<>(this.service.findAll(), HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<CustomerDTO> findById(@PathVariable("id") Long id) {
        return new ResponseEntity<>(this.service.findById(id), HttpStatus.OK);
    }

    @GetMapping("with-balance/{id}")
    public ResponseEntity<CustomerWithBalance> getCustomerWithBalance(@PathVariable("id") Long id) {
        return new ResponseEntity<>(this.service.getCustomerWithBalance(id), HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<CustomerDTO> save(@RequestBody CustomerDTO customer) {
        return new ResponseEntity<>(this.service.create(customer), HttpStatus.CREATED);
    }

    @PutMapping("{id}")
    public ResponseEntity<CustomerDTO> update(@PathVariable("id") Long id, @RequestBody CustomerDTO customer) {
        return new ResponseEntity<>(this.service.update(id, customer), HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Boolean> delete(@PathVariable("id") Long id) {
        return new ResponseEntity<>(this.service.delete(id), HttpStatus.OK);
    }
}
