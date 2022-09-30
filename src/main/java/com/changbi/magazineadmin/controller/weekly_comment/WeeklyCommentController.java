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

    /*페이지*/
    @GetMapping("/list")
    public String listPage(Model model){
        return "/contents/weekly-comment/list";
    }

    /*페이지*/
    @GetMapping("/insert")
    public String insertPage(Model model){
        return "/contents/weekly-comment/insert";
    }

    /*페이지*/
    @GetMapping("/update/{weeklySeq}")
    public String updatePage(@PathVariable("weeklySeq") int weeklySeq, Model model) {
        model.addAttribute("weeklySeq", weeklySeq);
        return "/contents/weekly-comment/update";
    }

    /*로직*/
    @PostMapping("/insert")
    @ResponseBody
    public int insert(@RequestBody WeeklyComment weeklyComment){
        return weeklyCommentService.insertWeeklyComment(weeklyComment);
    }

    /*로직*/
    @PostMapping("/weeklyComments")
    @ResponseBody
    public PageInfo<WeeklyComment> weeklyCommentSelectAll(int pageNum, int pageSize){
        PageHelper.startPage(pageNum, pageSize);
        return PageInfo.of(weeklyCommentService.selectWCAll());
    }

    /*로직*/
    @GetMapping("/authorMeta/{weeklySeq}")
    @ResponseBody
    public List<WeeklyMeta> selectWeeklyCommentAuthor(@PathVariable("weeklySeq") int weeklySeq){
        return weeklyCommentService.selectWeeklyCommentAuthor(weeklySeq);
    }

    /*로직*/
    @GetMapping("/{weeklySeq}")
    @ResponseBody
    public WeeklyComment selectWeeklyCommentBySeq(@PathVariable("weeklySeq") int weeklySeq){
        return weeklyCommentService.selectWeeklyCommentBySeq(weeklySeq);
    }

    /*로직*/
    @PostMapping("/update/{weeklySeq}")
    @ResponseBody
    public int updateMethod(@PathVariable("weeklySeq") int weeklySeq,
                            @RequestBody WeeklyComment weeklyComment){
        return weeklyCommentService.updateWeeklyComment(weeklyComment, weeklySeq);
    }

    /*로직*/
    @PostMapping("/delete/{weeklySeq}")
    @ResponseBody
    public int deleteMethod(@PathVariable("weeklySeq") int weeklySeq){
        return weeklyCommentService.deleteWeeklyComment(weeklySeq);

    }
}
