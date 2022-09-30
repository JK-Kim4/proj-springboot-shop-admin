package com.changbi.magazineadmin.controller.magazine;

import com.changbi.magazineadmin.controller.magazine.domain.Magazine;
import com.changbi.magazineadmin.service.MagazineService;
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
    @GetMapping("/update/{magazineSeq}")
    public String updatePage(@PathVariable("magazineSeq") int magazineSeq, Model model){
        model.addAttribute("magazineSeq", magazineSeq);
        return "/contents/magazine/update";
    }

    /*로직*/
    @GetMapping("/magazines")
    @ResponseBody
    public PageInfo<Magazine> selectMagazineAll(int pageNum, int pageSize){
        PageHelper.startPage(pageNum, pageSize);
        return PageInfo.of(magazineService.selectMagazineAll());
    }

    /*로직*/
    @PostMapping("/insert")
    @ResponseBody
    public int insertMethod(@RequestBody Magazine magazine){
        return magazineService.insertMagazine(magazine);
    }

    /*로직*/
    @PostMapping("/update/{magazineSeq}")
    @ResponseBody
    public int updateMethod(@PathVariable("magazineSeq") int magazineSeq,
                            @RequestBody Magazine magazine){
        return magazineService.updateMagazine(magazine, magazineSeq);
    }

    /*로직*/
    @GetMapping("/search/{searchKeyword}/{searchType}")
    @ResponseBody
    public PageInfo<Magazine> selectMagazineBySearch(@PathVariable("searchKeyword") String searchKeyword,
                                                     @PathVariable(value = "searchType", required = false) String searchType,
                                                     int pageNum, int pageSize){
        PageHelper.startPage(pageNum, pageSize);
        return PageInfo.of(magazineService.selectMagazineBySearch(searchKeyword, searchType));
    }
}
