package com.changbi.magazineadmin.controller.author;

import com.changbi.magazineadmin.controller.author.domain.Author;
import com.changbi.magazineadmin.service.AuthorService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/author")
public class AuthorController {

    private final AuthorService authorService;

    /*페이지*/
    @GetMapping("/list")
    public String listPage(Model model){
        List<Author> authors = authorService.selectAuthorAll();
        if(authors != null && authors.size() > 0){
            model.addAttribute("authors", authors);
        }
        return "/contents/author/list";
    }

    /*페이지*/
    @GetMapping("/insert")
    public String insertPage(){
        return "/contents/author/insert";
    }

    /*페이지*/
    @GetMapping("/update/{authorId}")
    public String updatePage(@PathVariable("authorId") int authorId, Model model){
        Author result = authorService.selectAuthorById(authorId);
        if(result != null){
            model.addAttribute("author", authorId);
        }
        return "/contents/author/update";
    }

    /*로직*/
    @PostMapping("/insert")
    public int insertMethod(@RequestBody Author author){
        return authorService.insertAuthor(author);
    }

    /*로직*/
    @PostMapping("/update")
    public int updateMethod(@RequestBody Author author){
        return authorService.updateAuthor(author);
    }
}
