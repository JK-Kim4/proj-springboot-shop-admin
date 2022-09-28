package com.changbi.magazineadmin.service;

import com.changbi.magazineadmin.controller.member.domain.Member;
import com.changbi.magazineadmin.repository.oracle.MemberRepository;
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
