package com.changbi.magazineadmin.controller.weekly_comment.domain;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class WeeklyComment {

    private int weeklySeq;
    private String weeklyTitle;
    private String weeklySubtitle;
    private String weeklyContent;
    private String weeklyThumbnailImage;
    private String weeklyThumbnailImageFileName;
    private LocalDateTime appendDate;
    private LocalDateTime updateDate;
    private int appendUser;
    private int updateUser;
    private int viewCount;
    private boolean useYn;

    private List<WeeklyMeta> authArray;
}
