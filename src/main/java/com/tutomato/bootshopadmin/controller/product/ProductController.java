package com.tutomato.bootshopadmin.controller.product;

import com.tutomato.bootshopadmin.controller.product.domain.Product;
import com.tutomato.bootshopadmin.controller.product.domain.ProductCategory;
import com.tutomato.bootshopadmin.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/product")
public class ProductController {

    private final ProductService productService;

    /*페이지*/
    @GetMapping("/list")
    public String listPage(){
        return "contents/product/list";
    }

    /*페이지*/
    @GetMapping("/insert")
    public String insertPage(Model model){

        List<ProductCategory> categoryList = productService.selectProductCategoryAll();
        model.addAttribute("categories", categoryList);

        return "contents/product/insert";
    }

    /*페이지*/
    @GetMapping("/update/{productSeq}")
    public String updatePage(@PathVariable("productSeq") int productSeq, Model model){
        model.addAttribute("productSeq", productSeq);
        return "contents/product/update";
    }

    /*insert*/
    @PostMapping("/insert")
    @ResponseBody
    public int insertMethod(@RequestBody Product product){
        if(product != null){
            return productService.insertProduct(product);
        }else {
            throw new NullPointerException("필수 파라미터가 존재하지 않습니다.");
        }
    }


}
