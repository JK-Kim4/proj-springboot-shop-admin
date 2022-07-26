package com.template.springmybatis.demo.controller.model;

import lombok.*;

@Data
@NoArgsConstructor
public class Test {

    private int id;
    private String value;


    @Builder
    public Test(int id, String value){
        this.id = id;
        this.value = value;
    }
}
