package com.changbi.magazineadmin.controller.product;

import com.changbi.magazineadmin.controller.product.domain.Product;
import com.changbi.magazineadmin.service.ProductService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/product")
public class ProductController {

    private final ProductService productService;

    /*페이지*/
    @GetMapping("/list")
    public String listPage(){
        return"/contents/product/list";
    }

    /*페이지*/
    @GetMapping("/update/{productSeq}")
    public String updatePage(@PathVariable(name = "productSeq")int productSeq, Model model){
        model.addAttribute("productSeq", productSeq);
        return "/contents/product/update";
    }

    @GetMapping("/insert")
    public String insertPage(){
        return "/contents/product/insert";
    }

    @GetMapping("/products")
    @ResponseBody
    public PageInfo<Product> selectProductAll(int pageNum, int pageSize){
        PageHelper.startPage(pageNum, pageSize);
        return PageInfo.of(productService.selectProductAll());
    }

}
