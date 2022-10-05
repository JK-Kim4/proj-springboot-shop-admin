package com.changbi.magazineadmin.controller.article.domain;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class Article {

    private int articleSeq;
    private int magazineSeq;
    private String magazineVolume;
    private int articleHeadSeq;
    private String articleHeadTitle;
    private String articleTitle;
    private String articleContent;
    private String authorDirect;
    private int ebookPage;
    private int ordered;
    private int viewCount;
    private boolean useYn;
    private LocalDateTime appendDate;
    private LocalDateTime updateDate;

    private List<ArticleMeta> authArray;
}
