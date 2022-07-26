package com.template.springmybatis.demo.service;

import com.template.springmybatis.demo.controller.model.Test;
import com.template.springmybatis.demo.repository.DemoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Slf4j
@Service
public class DemoService {

    private final DemoRepository demoRepository;

    public List<Test> findAll(){
        return demoRepository.findAll();
    }

    public Test findById(int id){
        return demoRepository.findById();
    }

    public int save(int id, String value){
        Test test = new Test(id,value);
        return demoRepository.save(test);
    }

    public int update(Test test){
        return demoRepository.update(test);
    }
}
