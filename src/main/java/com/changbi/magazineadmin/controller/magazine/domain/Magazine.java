package com.changbi.magazineadmin.controller.magazine.domain;

import com.changbi.magazineadmin.controller.article.domain.ArticleHead;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class Magazine {

    private int magazineSeq;
    private int magazineCategorySeq;
    private String magazineTitle;
    private String magazineContent;
    private String magazineVolume;
    private String magazineYear;
    private String magazineSeason;
    private String magazineThumbnailImage;
    private String magazineThumbnailFileName;
    private LocalDateTime appendDate;
    private LocalDateTime updateDate;
    private int appendUser;
    private int updateUser;
    private boolean useYn;
    private LocalDateTime startDate;
    private LocalDateTime endDate;

    private List<ArticleHead> articleHeadArray = new ArrayList<>();
}
