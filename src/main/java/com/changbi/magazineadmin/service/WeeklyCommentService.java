package com.changbi.magazineadmin.service;

import com.changbi.magazineadmin.controller.weekly_comment.domain.WeeklyComment;
import com.changbi.magazineadmin.controller.weekly_comment.domain.WeeklyMeta;
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

        int result = 0;

        try {
            result = weeklyCommentRepository.insertWeeklyComment(weeklyComment);
            int genWeeklySeq = weeklyComment.getWeeklySeq();

            List<WeeklyMeta> authList = setWeeklyAuthor(weeklyComment.getAuthArray(), genWeeklySeq);

            result = weeklyCommentRepository.insertWeeklyAuthor(authList);

            return result;
        }catch (Exception e){
            log.error("Weekly Comment insert error occur !!", e);
            result = 0;
            return result;
        }

    }

    public List<WeeklyMeta> setWeeklyAuthor(List<WeeklyMeta> param, int weeklyId){
        if(param != null && param.size() > 0){
            for(int i = 0; i < param.size(); i++){
                param.get(i).setWeeklySeq(weeklyId);
            }
            return param;
        }else{
            throw new NullPointerException();
        }

    }
}
