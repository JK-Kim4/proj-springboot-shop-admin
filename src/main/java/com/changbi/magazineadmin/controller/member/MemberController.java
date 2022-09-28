package com.changbi.magazineadmin.controller.member;


import com.changbi.magazineadmin.controller.member.domain.Member;
import com.changbi.magazineadmin.service.MemberService;
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
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/list")
    public String index(Model model){
        List<Member> members = memberService.selectMemberAll();
        model.addAttribute("members", members);

        return "/contents/member/list";
    }
}
