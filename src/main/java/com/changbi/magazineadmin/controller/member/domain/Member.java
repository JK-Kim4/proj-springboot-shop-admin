package com.changbi.magazineadmin.controller.member.domain;

import lombok.Data;

@Data
public class Member {


    private int customercode;

    private String customername;

    private int customerkind;

    private String email;

    private String webuserid;

    private String nickname;

    private String mobileno;

    private String joindate;

    private String updatedate;

    /*회원 타입 : [01:관리자 ,02:일반 회원 ,03:어린이 회원 ,04:어린이 회원(보호자 미동의) , 05:프로젝트 직원 ,06:미승인 회원]*/
    private String webusertype;

    private boolean webuserconfirmyn;

    private String POSTNO1;
    private String ADDRESS1_1;
    private String ADDRESS1_2;

    private String POSTNO2;
    private String ADDRESS2_1;
    private String ADDRESS2_2;

    private String POSTNO3;
    private String ADDRESS3_1;
    private String ADDRESS3_2;

    private String POSTNO1_NEW;
    private String ADDRESS1_1NEW;
    private String ADDRESS1_2_NEW;


    private String POSTNO2_NEW;
    private String ADDRESS2_1_NEW;
    private String ADDRESS2_2_NEW;

    private String POSTNO3_New;
    private String ADDRESS3_1_NEW;
    private String ADDRESS3_2_NEW;

}
