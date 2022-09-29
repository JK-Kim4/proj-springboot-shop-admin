package com.changbi.magazineadmin.service;

import com.changbi.magazineadmin.controller.weekly_comment.domain.WeeklyComment;
import com.changbi.magazineadmin.repository.mysql.WeeklyCommentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class WeeklyCommentService {

    private final WeeklyCommentRepository weeklyCommentRepository;

    public List<WeeklyComment> selectWCAll() {

        return weeklyCommentRepository.selectWCAll();
    }

    public int insertWeeklyComment(WeeklyComment weeklyComment) {
        return 0;
    }
}
