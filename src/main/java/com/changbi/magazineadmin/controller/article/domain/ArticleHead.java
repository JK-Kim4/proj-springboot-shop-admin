package com.changbi.magazineadmin.controller.article.domain;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ArticleHead {

    private int articleHeadSeq;
    private int magazineSeq;
    private String articleHeadTitle;
    private int ordered;

    @Builder
    public ArticleHead(int magazineSeq, String articleHeadTitle, int ordered){
        this.magazineSeq = magazineSeq;
        this.articleHeadTitle = articleHeadTitle;
        this.ordered = ordered;
    }
}
