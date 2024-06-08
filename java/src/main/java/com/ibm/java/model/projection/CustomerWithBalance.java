package com.ibm.java.model.projection;

import java.math.BigDecimal;

public interface CustomerWithBalance {
    Long getId();
    String getName();
    String getEmail();
    String getAccNumber();
    BigDecimal getAccountBalance();
}