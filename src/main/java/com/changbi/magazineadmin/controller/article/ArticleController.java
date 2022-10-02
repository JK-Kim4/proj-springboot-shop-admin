package com.changbi.magazineadmin.controller.article;

import com.changbi.magazineadmin.controller.article.domain.Article;
import com.changbi.magazineadmin.controller.article.domain.ArticleHead;
import com.changbi.magazineadmin.controller.magazine.domain.Magazine;
import com.changbi.magazineadmin.service.ArticleService;
import com.changbi.magazineadmin.service.MagazineService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/article")
public class ArticleController {

    private final ArticleService articleService;
    private final MagazineService magazineService;

    /*페이지*/
    @GetMapping("/list")
    public String listPage(){
        return "/contents/article/list";
    }

    /*페이지*/
    @GetMapping("/insert")
    public String insertPage(Model model){

        List<Magazine> magazines = magazineService.selectMagazineAll();
        model.addAttribute("magazines", magazines);

        return "/contents/article/insert";
    }

    /*페이지*/
    @GetMapping("/update/{artileSeq}")
    public String updatePage (@PathVariable(name = "articleSeq")int articleSeq, Model model){
        model.addAttribute("articleSeq", articleSeq);
        return "/contents/article/update";

    }

    /*로직*/
    @GetMapping("/articles")
    @ResponseBody
    public PageInfo<Article> selectArticleAll(int pageNum, int pageSize){
        PageHelper.startPage(pageNum, pageSize);
        return PageInfo.of(articleService.selectArticleAll());
    }

    /*로직*/
    @GetMapping("/{articleSeq}")
    @ResponseBody
    public Article selectArticleBySeq(@PathVariable(name = "articleSeq") int articleSeq){
        return articleService.selectArticleBySeq(articleSeq);
    }

    /*로직*/
    @PostMapping("/insert")
    @ResponseBody
    public int insertMethod(@RequestBody Article article){
        return articleService.insertArticle(article);
    }

    /*logic*/
    @PostMapping("/update/{articleSeq}")
    @ResponseBody
    public int updateMethod(@PathVariable(name = "articleSeq") int articleSeq, @RequestBody Article article){
        return articleService.updateArticle(article, articleSeq);

    }

    /*로직*/
    @GetMapping("/delete/{articleSeq}")
    @ResponseBody
    public int deleteMethod(@PathVariable(name = "articleSeq") int articleSeq){
        return articleService.deleteArticle(articleSeq);
    }

    /*로직*/
    @GetMapping("/head/{magazineSeq}")
    @ResponseBody
    public List<ArticleHead> selectArticleHeadsByMgSeq(@PathVariable(name = "magazineSeq") int magazineSeq){
        return articleService.selectArticleHeadByMgSeq(magazineSeq);
    }

}
