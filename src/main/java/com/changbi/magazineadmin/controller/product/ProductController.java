package com.changbi.magazineadmin.controller.product;

import com.changbi.magazineadmin.controller.product.domain.Product;
import com.changbi.magazineadmin.service.ProductService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

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

    /*페이지*/
    @GetMapping("/insert")
    public String insertPage(){
        return "/contents/product/insert";
    }

    /*로직*/
    @GetMapping("/products")
    @ResponseBody
    public PageInfo<Product> selectProductAll(int pageNum, int pageSize){
        PageHelper.startPage(pageNum, pageSize);
        return PageInfo.of(productService.selectProductAll());
    }

    /*로직*/
    @PostMapping("/insert")
    @ResponseBody
    public int insertMethod(@RequestBody Product product){

        log.debug("request body start date : {}", product.getStartDate());
        log.debug("request body end date : {}", product.getEndDate());


        return productService.insertProduct(product);
    }

    /*로직*/
    @GetMapping("/{productSeq}")
    @ResponseBody
    public Product selectProductBySeq(@PathVariable(name = "productSeq") int productSeq){
        return productService.selectProductBySeq(productSeq);
    }

    /*로직*/
    @DeleteMapping("/delete/{productSeq}")
    @ResponseBody
    public int deleteProduct(@PathVariable(name = "productSeq") int productSeq){
        return productService.deleteProduct(productSeq);
    }

    /*로직*/
    @PostMapping("/update/{productSeq}")
    @ResponseBody
    public int updateMethod(@PathVariable(name = "productSeq") int productSeq, @RequestBody Product product){
        product.setProductSeq(productSeq);
        return productService.updateProduct(product);
    }
}
