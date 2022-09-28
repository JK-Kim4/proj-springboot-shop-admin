package com.changbi.magazineadmin.repository.mysql;

import com.changbi.magazineadmin.controller.weekly_comment.domain.WeeklyComment;

import java.util.List;

public interface WeeklyCommentRepository {
    List<WeeklyComment> selectWCAll();

}
