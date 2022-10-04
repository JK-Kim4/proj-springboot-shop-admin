package com.changbi.magazineadmin.repository.mysql;

import com.changbi.magazineadmin.controller.product.domain.Product;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ProductRepository {

    List<Product> selectProductAll();

    int insertProduct(Product product);

    Product selectProductBySeq(int productSeq);

    int deleteProduct(int productSeq);
}
