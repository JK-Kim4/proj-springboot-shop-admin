package com.tutomato.bootshopadmin.repository.mysql;

import com.tutomato.bootshopadmin.controller.member.domain.Member;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MemberRepository {

    List<Member> selectMemberAll();

}
