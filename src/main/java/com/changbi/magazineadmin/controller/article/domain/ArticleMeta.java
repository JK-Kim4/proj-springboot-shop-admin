package com.changbi.magazineadmin.controller.article.domain;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ArticleMeta {

    private int articleSeq;
    private int authorSeq;
    private String authorKrName;

    @Builder
    public ArticleMeta(int authorSeq, int articleSeq, String authorKrName){
        this.articleSeq = articleSeq;
        this.authorSeq = authorSeq;
        this.authorKrName = authorKrName;
    }

}
