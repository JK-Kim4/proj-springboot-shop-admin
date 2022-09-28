package com.changbi.magazineadmin.controller.weekly_comment;

import com.changbi.magazineadmin.controller.weekly_comment.domain.WeeklyComment;
import com.changbi.magazineadmin.service.WeeklyCommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/weeklyComment")
public class WeeklyCommentController {

    private final WeeklyCommentService weeklyCommentService;

    @GetMapping("/list")
    public String listPage(Model model){

        List<WeeklyComment> weeklyComments = weeklyCommentService.selectWCAll();
        if(weeklyComments != null && weeklyComments.size() > 0){
            model.addAttribute("weeklyComments", weeklyComments);
        }

        return "/contents/weekly-comment/list";
    }

    @GetMapping("/insert")
    public String insertPage(Model model){
        return "/contents/weekly-comment/insert";
    }
}
