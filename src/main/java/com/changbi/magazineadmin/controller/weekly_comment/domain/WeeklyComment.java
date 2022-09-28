package com.changbi.magazineadmin.controller.weekly_comment.domain;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class WeeklyComment {

    private int weeklySeq;
    private int weeklyCategorySeq;
    private String weeklyTitle;
    private String weeklySubtitle;
    private int weeklyAuthor;
    private String weeklyContent;
    private String weeklyThumbnailImage;
    private LocalDateTime appendDate;
    private LocalDateTime updateDate;
    private int appendUser;
    private int updateUser;
    private int viewCount;
    private boolean useYn;
}
