package com.tutomato.bootshopadmin.controller.product.domain;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class Product {

    private int productSeq;
    private int productCategorySeq;
    private String productTitle;
    private String productContent;
    private int productPrice;
    private LocalDateTime productReleaseDate;
    private int productStock;
    private String productThumbnailImage;
    private String productThumbnailImageName;
    private LocalDateTime appendDate;
    private LocalDateTime updateDate;
    private int appendUser;
    private int updateUser;
    private boolean useYn;
    private LocalDateTime startDate;
    private LocalDateTime endDate;

}
