package com.changbi.magazineadmin.repository.mysql;

import com.changbi.magazineadmin.controller.article.domain.ArticleHead;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ArticleRepository {

    int insertArticleHead(List<ArticleHead> articleHeads);

    List<ArticleHead> selectArticleHeadByMgSeq(int magazineSeq);
}
