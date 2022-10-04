package com.changbi.magazineadmin.service;

import com.changbi.magazineadmin.controller.article.domain.Article;
import com.changbi.magazineadmin.controller.article.domain.ArticleHead;
import com.changbi.magazineadmin.controller.article.domain.ArticleMeta;
import com.changbi.magazineadmin.repository.mysql.ArticleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
        articleRepository.deleteArticleAuthor(articleSeq);
        return articleRepository.deleteArticle(articleSeq);
    }

    public int insertArticle(Article article) {

        int result = 0;

        try {
            result = articleRepository.insertArticle(article);
            int genArticleSeq = article.getArticleSeq();

            List<ArticleMeta> authList = setArticleAuthor(article.getAuthArray(), genArticleSeq);
            result = articleRepository.insertArticleAuthor(authList);

            return result;
        }catch (Exception e){
            log.error("Article insert error occur !!", e);
            result = 0;
            return result;
        }

    }

    private List<ArticleMeta> setArticleAuthor(List<ArticleMeta> param, int genArticleSeq) {
        if(param != null && param.size() > 0){
            for(int i = 0; i < param.size(); i++){
                param.get(i).setArticleSeq(genArticleSeq);
            }
        }else{
            List<ArticleMeta> emptyList = new ArrayList<>();
            ArticleMeta temp = ArticleMeta
                    .builder()
                    .articleSeq(0)
                    .authorSeq(0)
                    .authorKrName("없음")
            .build();
            emptyList.add(temp);
            param = emptyList;
        }
        return param;
    }

    public int updateArticle(Article article, int articleSeq) {
        int result = 0;
        article.setArticleSeq(articleSeq);
        try {
            List<ArticleMeta> authList = setArticleAuthor(article.getAuthArray(), articleSeq);
            articleRepository.updateArticle(article);
            articleRepository.deleteArticleAuthor(articleSeq);
            result = articleRepository.insertArticleAuthor(authList);
            return result;
        }catch (Exception e){
            log.error("Article update error occur !!", e);
            result = 0;
            return result;
        }
    }

    public List<ArticleMeta> selectArticleAuthor(int articleSeq) {
        return articleRepository.selectArticleAuthor(articleSeq);
    }
}
