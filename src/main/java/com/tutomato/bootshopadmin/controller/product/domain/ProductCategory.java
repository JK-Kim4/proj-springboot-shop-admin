package com.tutomato.bootshopadmin.controller.product.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductCategory {

    private int productCategorySeq;
    private String productCategoryValue;
    private boolean useYn;
}
