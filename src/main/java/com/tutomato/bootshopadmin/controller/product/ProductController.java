package com.tutomato.bootshopadmin.controller.product;

import com.tutomato.bootshopadmin.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/magazine")
public class ProductController {

    private final ProductService productService;

    /*페이지*/
    @GetMapping("/list")
    public String listPage(){
        return "/contents/magazine/list";
    }

    /*페이지*/
    @GetMapping("/insert")
    public String insertPage(){
        return "/contents/magazine/insert";
    }

    /*페이지*/
    @GetMapping("/update/{productSeq}")
    public String updatePage(@PathVariable("productSeq") int productSeq, Model model){
        model.addAttribute("productSeq", productSeq);
        return "/contents/magazine/update";
    }


}
