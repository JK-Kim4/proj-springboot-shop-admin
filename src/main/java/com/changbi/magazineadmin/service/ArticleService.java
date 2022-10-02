package com.changbi.magazineadmin.service;

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
}
