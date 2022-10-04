package com.changbi.magazineadmin.service;

import com.changbi.magazineadmin.controller.product.domain.Product;
import com.changbi.magazineadmin.repository.mysql.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductService {

    private final ProductRepository productRepository;

    public List<Product> selectProductAll() {
        return productRepository.selectProductAll();
    }
}
