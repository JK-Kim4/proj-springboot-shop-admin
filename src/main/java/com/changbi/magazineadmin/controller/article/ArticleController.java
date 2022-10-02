package com.changbi.magazineadmin.controller.article;

import com.changbi.magazineadmin.controller.article.domain.ArticleHead;
import com.changbi.magazineadmin.service.ArticleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/article")
public class ArticleController {

    private final ArticleService articleService;

    /*로직*/
    @GetMapping("/head/{magazineSeq}")
    @ResponseBody
    public List<ArticleHead> selectArticleHeadsByMgSeq(@PathVariable(name = "magazineSeq") int magazineSeq){
        return articleService.selectArticleHeadByMgSeq(magazineSeq);
    }

}
