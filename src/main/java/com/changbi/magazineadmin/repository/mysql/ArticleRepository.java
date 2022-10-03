package com.changbi.magazineadmin.repository.mysql;

import com.changbi.magazineadmin.controller.article.domain.Article;
import com.changbi.magazineadmin.controller.article.domain.ArticleHead;
import com.changbi.magazineadmin.controller.article.domain.ArticleMeta;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ArticleRepository {

    int insertArticleHead(List<ArticleHead> articleHeads);

    List<ArticleHead> selectArticleHeadByMgSeq(int magazineSeq);

    int deleteArticleHead(int magazineSeq);

    List<Article> selectArticleAll();

    Article selectArticleBySeq(int articleSeq);

    int deleteArticle(int articleSeq);

    int deleteArticlesByMgSeq(int magazineSeq);

    int insertArticle(Article article);

    int updateArticle(Article article);

    int insertArticleAuthor(List<ArticleMeta> authList);

    List<ArticleMeta> selectArticleAuthor(int articleSeq);

    int deleteArticleAuthor(int articleSeq);
}
