package com.tutomato.bootshopadmin.repository.mysql;

import com.tutomato.bootshopadmin.controller.product.domain.Product;
import com.tutomato.bootshopadmin.controller.product.domain.ProductCategory;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ProductRepository {

    int insertProduct(Product product);

    List<ProductCategory> selectProductCategoryAll();

}
