package com.template.springmybatis.demo.repository;

import com.template.springmybatis.demo.controller.model.Test;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface DemoRepository {

    List<Test> findAll();

    Test findById();

    int save(Test test);

    int update(Test test);
}
