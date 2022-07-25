package com.template.springmybatis.demo.controller;

import com.template.springmybatis.demo.service.DemoService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequiredArgsConstructor
@Slf4j
public class DemoController {

    private final DemoService demoService;

    @GetMapping("/save")
    @ResponseBody
    public int save(@RequestParam("id") int id, @RequestParam("value") String value){
        return demoService.save(id, value);
    }

}
