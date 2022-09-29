package com.changbi.magazineadmin.controller.weekly_comment;

import com.changbi.magazineadmin.controller.weekly_comment.domain.WeeklyComment;
import com.changbi.magazineadmin.service.WeeklyCommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/weeklyComment")
public class WeeklyCommentController {

    private final WeeklyCommentService weeklyCommentService;

    @GetMapping("/list")
    public String listPage(Model model){
        return "/contents/weekly-comment/list";
    }

    @GetMapping("/insert")
    public String insertPage(Model model){
        return "/contents/weekly-comment/insert";
    }

    @GetMapping("/update")
    public String updatePage() {
        return "/contents/weekly-comment/update";
    }

    @PostMapping("/insert")
    @ResponseBody
    public int insert(@RequestParam WeeklyComment weeklyComment){
        return weeklyCommentService.insertWeeklyComment(weeklyComment);
    }
}
