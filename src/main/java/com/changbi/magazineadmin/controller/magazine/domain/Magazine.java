package com.changbi.magazineadmin.controller.magazine.domain;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

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

}
