package com.changbi.magazineadmin.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ArticleListReponseDto {


    private int articleSeq;

    private int magazineSeq;
    private String magazineVolumn;

    private int articleHeadSeq;
    private String articleHeadTitle;

    private String articleTitle;
    private String articleContent;

    private int viewCount;

    private boolean useYn;



}
