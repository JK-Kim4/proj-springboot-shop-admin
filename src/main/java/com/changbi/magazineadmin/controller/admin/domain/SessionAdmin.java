package com.changbi.magazineadmin.controller.admin.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Getter
@NoArgsConstructor
public class SessionAdmin implements Serializable {

    private int adminSeq;
    private String adminId;
    private String adminName;
    private String adminEmail;
    private String role;

    @Builder
    public SessionAdmin(Admin admin){
        this.adminSeq = admin.getAdminSeq();
        this.adminId = admin.getAdminId();
        this.adminName = admin.getAdminName();
        this.adminEmail = admin.getAdminEmail();
        this.role = admin.getAdminRule();
    }
}
