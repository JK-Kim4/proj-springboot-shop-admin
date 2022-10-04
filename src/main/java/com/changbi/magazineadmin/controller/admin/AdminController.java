package com.changbi.magazineadmin.controller.admin;

import com.changbi.magazineadmin.controller.admin.domain.Admin;
import com.changbi.magazineadmin.service.AdminService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@Controller
@RequiredArgsConstructor
@Slf4j
public class AdminController {

    private final AdminService adminService;
    private final HttpSession session;


    /*로그인 페이지*/
    @GetMapping(value = "/login")
    public String login(@RequestParam(value = "error", required = false)String error,
                        @RequestParam(value = "exception", required = false)String exception,
                        Model model){

        model.addAttribute("error", error);
        model.addAttribute("exception", exception);

        return "/contents/admin/login";
    }

    /*회원가입 페이지*/
    @GetMapping(value = "/signUp")
    public String signUp(){
        return "/contents/admin/sign-up";
    }


    /*회원가입*/
    @PostMapping("/signUp")
    @ResponseBody
    public int signUp(@RequestBody Admin admin) {
        return adminService.signUpAdmin(admin);
    }

    /*계정 사용 여부 확인*/
    @PostMapping("/admin/validate")
    @ResponseBody
    public boolean validation(@RequestBody String adminId){
        return adminService.validation(adminId);
    }
}
