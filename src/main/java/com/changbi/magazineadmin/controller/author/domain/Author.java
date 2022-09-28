package com.changbi.magazineadmin.controller.author.domain;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Author {

    private int authorSeq;
    private int authorOrgSeq;
    private String authorKrName;
    private String authorContent;
    private String authorThumbnailImage;
    private LocalDateTime appendDate;
    private LocalDateTime updateDate;
    private int appendUser;
    private int updateUser;
    private boolean useYn;

}
