package com.changbi.magazineadmin.controller.post;

import com.changbi.magazineadmin.service.PostService;
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
@RequestMapping("/post")
public class PostController {

    private final PostService postService;

    /*페이지*/
    @GetMapping("/list")
    public String listPage(Model model){
        return "contents/post/list";
    }

    /*페이지*/
    @GetMapping("/insert")
    public String insertPage(Model model){
        return "contents/post/insert";
    }

    /*페이지*/
    @GetMapping("/update/{postSeq}")
    public String updatePage(@PathVariable("postSeq") int postSeq, Model model) {
        model.addAttribute("postSeq", postSeq);
        return "contents/post/update";
    }

}
