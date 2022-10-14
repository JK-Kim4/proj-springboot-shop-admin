package com.tutomato.bootshopadmin.service;

import com.tutomato.bootshopadmin.controller.product.domain.Product;
import com.tutomato.bootshopadmin.controller.product.domain.ProductCategory;
import com.tutomato.bootshopadmin.repository.mysql.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductService {

    private final ProductRepository productRepository;

    public int insertProduct(Product product) {
        return productRepository.insertProduct(product);
    }

    public List<ProductCategory> selectProductCategoryAll() {
        return productRepository.selectProductCategoryAll();
    }

    public List<Product> selectProductAll() {
        return productRepository.selectProductAll();
    }

    public Product selectProductBySeq(int productSeq) {
        return productRepository.selectProductBySeq(productSeq);
    }
}
