package com.changbi.magazineadmin.controller.article.domain;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ArticleHead {

    private int articleHeadSeq;
    private int magazineSeq;
    private String articleHeadTitle;
    private int ordered;

}
