package com.tutomato.bootshopadmin.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Controller
@RequiredArgsConstructor
@Slf4j
public class IndexController {

    @GetMapping(value = {"/", "/index", ""})
    public String index(){
        return "/index";
    }


    /*영문페이지 redirect test*/
    @GetMapping("/en/**")
    public void englishRedirect(HttpServletResponse response, HttpServletRequest request) throws IOException {
        String uri = request.getRequestURI();
        log.debug("request uri : {}", uri);
        response.sendRedirect("http://223.130.161.34/" + uri);
    }
}
