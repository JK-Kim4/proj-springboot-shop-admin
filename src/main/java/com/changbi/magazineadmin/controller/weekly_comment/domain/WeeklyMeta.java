package com.changbi.magazineadmin.controller.weekly_comment.domain;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor

public class WeeklyMeta {


    private int weeklySeq;
    private int authorSeq;
    private String authorKrName;

    @Builder
    public WeeklyMeta(int authorSeq, int weeklySeq, String authorKrName){
        this.weeklySeq = weeklySeq;
        this.authorKrName = authorKrName;
        this.authorSeq =   authorSeq;

    }
}
