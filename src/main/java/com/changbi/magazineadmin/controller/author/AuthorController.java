package com.changbi.magazineadmin.controller.author;

import com.changbi.magazineadmin.controller.author.domain.Author;
import com.changbi.magazineadmin.service.AuthorService;
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
@RequestMapping("/author")
public class AuthorController {

    private final AuthorService authorService;

    /*페이지*/
    @GetMapping("/list")
    public String listPage(Model model){
        return "/contents/author/list";
    }

    /*페이지*/
    @GetMapping("/insert")
    public String insertPage(){
        return "/contents/author/insert";
    }

    /*페이지*/
    @GetMapping("/update/{authorSeq}")
    public String updatePage(@PathVariable("authorSeq") int authorSeq, Model model){
        Author result = authorService.selectAuthorById(authorSeq);
        if(result != null){
            model.addAttribute("author", result);
        }
        return "/contents/author/update";
    }

    /*로직*/
    @PostMapping("/insert")
    @ResponseBody
    public int insertMethod(@RequestBody Author author){
        return authorService.insertAuthor(author);
    }

    /*로직*/
    @PostMapping("/update/{authorSeq}")
    @ResponseBody
    public int updateMethod(@PathVariable("authorSeq") int authorSeq, @RequestBody Author author){
        return authorService.updateAuthor(authorSeq, author);
    }

    /*로직*/
    @DeleteMapping("/delete/{authorSeq}")
    @ResponseBody
    public int deleteMethod(@PathVariable("authorSeq") int authorSeq){
        return authorService.deleteAuthor(authorSeq);
    }

    /*로직*/
    @PostMapping("/authors")
    @ResponseBody
    public PageInfo<Author> authorSelectAll(int pageNum, int pageSize){

        PageHelper.startPage(pageNum, pageSize);
        return PageInfo.of(authorService.selectAuthorAll());
    }

    /*로직*/
    @PostMapping("/search/{keyword}")
    @ResponseBody
    public PageInfo<Author> searchAuthor(@PathVariable("keyword") String keyword, int pageNum, int pageSize){

        PageHelper.startPage(pageNum, pageSize);
        return PageInfo.of(authorService.selectAuthorByKeyword(keyword));

    }

}
