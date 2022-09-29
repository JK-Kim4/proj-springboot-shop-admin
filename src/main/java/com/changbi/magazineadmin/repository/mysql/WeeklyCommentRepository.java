package com.changbi.magazineadmin.repository.mysql;

import com.changbi.magazineadmin.controller.weekly_comment.domain.WeeklyComment;
import com.changbi.magazineadmin.controller.weekly_comment.domain.WeeklyMeta;

import java.util.List;

public interface WeeklyCommentRepository {
    List<WeeklyComment> selectWCAll();

    int insertWeeklyComment(WeeklyComment weeklyComment);

    int insertWeeklyAuthor(List<WeeklyMeta> authList);

    List<WeeklyMeta> selectWeeklyCommentAuthor(int weeklySeq);

    WeeklyComment selectWeeklyCommentBySeq(int weeklySeq);
}
