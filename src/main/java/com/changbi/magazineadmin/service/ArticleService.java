package com.changbi.magazineadmin.service;

import com.changbi.magazineadmin.controller.article.domain.Article;
import com.changbi.magazineadmin.controller.article.domain.ArticleHead;
import com.changbi.magazineadmin.repository.mysql.ArticleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ArticleService {

    private final ArticleRepository articleRepository;

    public List<ArticleHead> selectArticleHeadByMgSeq(int magazineSeq){
        return articleRepository.selectArticleHeadByMgSeq(magazineSeq);
    }

    public List<Article> selectArticleAll() {
        return articleRepository.selectArticleAll();
    }

    public Article selectArticleBySeq(int articleSeq) {
        return articleRepository.selectArticleBySeq(articleSeq);
    }

    public int deleteArticle(int articleSeq) {
        return articleRepository.deleteArticle(articleSeq);
    }

    public int insertArticle(Article article) {
        return articleRepository.insertArticle(article);
    }

    public int updateArticle(Article article, int articleSeq) {
        article.setArticleSeq(articleSeq);
        return articleRepository.updateArticle(article);
    }
}
