package com.changbi.magazineadmin.controller.product.domain;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ProductMeta {

    private int productMdSeq;
    private int productSeq;
    private String productMdTitle;
    private String productMdContent;
    private int productMdType;
    private boolean useYn;

}
