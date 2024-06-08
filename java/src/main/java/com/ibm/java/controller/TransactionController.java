package com.ibm.java.controller;

import com.ibm.java.dto.TransactionDTO;
import com.ibm.java.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/transactions")
public class TransactionController {

    @Autowired
    private TransactionService service;


    @GetMapping("")
    public ResponseEntity<List<TransactionDTO>> findById(@RequestParam(defaultValue = "", required = false) Long customerId) {
        return new ResponseEntity<>(this.service.findAllByCustomerId(customerId), HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<TransactionDTO> save(@RequestBody TransactionDTO transactionDTO) {
        return new ResponseEntity<>(this.service.create(transactionDTO), HttpStatus.CREATED);
    }
}
