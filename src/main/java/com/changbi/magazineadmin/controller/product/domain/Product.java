package com.changbi.magazineadmin.controller.product.domain;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Product {

    private int productSeq;
    private int productType;
    private String productName;
    private String productContent;
    private int productPrice;
    private int productPeriod;
    private double discountRate;
    private String productImageFile;
    private String productImageFileName;
    private boolean useYn;
    private LocalDateTime appendDate;
    private LocalDateTime updateDate;

}
