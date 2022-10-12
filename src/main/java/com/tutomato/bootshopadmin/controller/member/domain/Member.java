package com.tutomato.bootshopadmin.controller.member.domain;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Member {


    private int memberSeq;                      // 고유 번호
    private String memberId;                    // 회원 ID
    private String memberNickname;              // 회원 별명
    private String memberPassword;              // 회원 비밀번호
    private int memberType;                     // 회원 타입 (0: 일반회원 / 1: 판매자 인증 회원 / 99: 차단 회원)
    private String memberThumbnailImage;        // 회원 섬네일 이미지
    private String memberThumbnailImageName;    // 회원 섬네일 이미지 파일명
    private LocalDateTime appendDate;           // 등록일
    private LocalDateTime updateDate;           // 수정일
    private int appendUser;                     // 등록자
    private int updateUser;                     // 수정자
    private boolean useYn;                      // 사용 여부
    private int loginFailCount;                 // 로그인 실패 횟수
    private String memo;                        // 메모


}
