package com.changbi.magazineadmin.controller.weekly_comment;

import com.changbi.magazineadmin.controller.weekly_comment.domain.WeeklyComment;
import com.changbi.magazineadmin.controller.weekly_comment.domain.WeeklyMeta;
import com.changbi.magazineadmin.service.WeeklyCommentService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/update/{weeklySeq}")
    public String updatePage(@PathVariable("weeklySeq") int weeklySeq, Model model) {
        model.addAttribute("weeklySeq", weeklySeq);
        return "/contents/weekly-comment/update";
    }

    @PostMapping("/insert")
    @ResponseBody
    public int insert(@RequestBody WeeklyComment weeklyComment){
        return weeklyCommentService.insertWeeklyComment(weeklyComment);
    }

    @PostMapping("/weeklyComments")
    @ResponseBody
    public PageInfo<WeeklyComment> weeklyCommentSelectAll(int pageNum, int pageSize){
        PageHelper.startPage(pageNum, pageSize);
        return PageInfo.of(weeklyCommentService.selectWCAll());
    }

    @GetMapping("/authorMeta/{weeklySeq}")
    @ResponseBody
    public List<WeeklyMeta> selectWeeklyCommentAuthor(@PathVariable("weeklySeq") int weeklySeq){
        return weeklyCommentService.selectWeeklyCommentAuthor(weeklySeq);
    }

    @GetMapping("/{weeklySeq}")
    @ResponseBody
    public WeeklyComment selectWeeklyCommentBySeq(@PathVariable("weeklySeq") int weeklySeq){
        return weeklyCommentService.selectWeeklyCommentBySeq(weeklySeq);
    }
}
