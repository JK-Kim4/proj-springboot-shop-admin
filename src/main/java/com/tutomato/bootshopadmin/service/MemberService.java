package com.tutomato.bootshopadmin.service;

import com.tutomato.bootshopadmin.controller.member.domain.Member;
import com.tutomato.bootshopadmin.repository.mysql.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberService {

    private final MemberRepository memberRepository;

    public List<Member> selectMemberAll(){
        return memberRepository.selectMemberAll();
    }

}
