package com.tutomato.bootshopadmin.controller.post.domain;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Post {

    private int postSeq;
    private int postCategorySeq;
    private String postTitle;
    private String postContent;
    private String postAttachmentUrl;
    private String postAttachmentName;
    private LocalDateTime appendDate;
    private LocalDateTime updateDate;
    private int appendUser;
    private int updateUser;
    private int viewCount;
    private boolean useYn;


}
