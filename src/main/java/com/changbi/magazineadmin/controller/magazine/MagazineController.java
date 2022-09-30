package com.changbi.magazineadmin.controller.magazine;

import com.changbi.magazineadmin.controller.magazine.domain.Magazine;
import com.changbi.magazineadmin.service.MagazineService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/magazine")
public class MagazineController {

    private final MagazineService magazineService;

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
    @GetMapping("/update")
    public String updatePage(){
        return "/contents/magazine/update";
    }

    /*로직*/
    @GetMapping("/magazines")
    @ResponseBody
    public PageInfo<Magazine> selectMagazineAll(int pageNum, int pageSize){
        PageHelper.startPage(pageNum, pageSize);
        return PageInfo.of(magazineService.selectMagazineAll());
    }
}
