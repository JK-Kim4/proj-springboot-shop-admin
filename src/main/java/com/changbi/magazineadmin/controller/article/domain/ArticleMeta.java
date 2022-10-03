package com.changbi.magazineadmin.controller.article.domain;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ArticleMeta {

    private int articleSeq;
    private int authorSeq;

    @Builder
    public ArticleMeta(int authorSeq, int articleSeq){
        this.articleSeq = articleSeq;
        this.authorSeq = authorSeq;
    }

}
