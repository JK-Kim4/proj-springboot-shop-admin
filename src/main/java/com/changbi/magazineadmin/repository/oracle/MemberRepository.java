package com.changbi.magazineadmin.repository.oracle;

import com.changbi.magazineadmin.controller.member.domain.Member;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MemberRepository {

    List<Member> selectMemberAll();

}