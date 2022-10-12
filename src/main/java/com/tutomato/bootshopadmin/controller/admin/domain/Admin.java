package com.tutomato.bootshopadmin.controller.admin.domain;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Collections;

@Data
@NoArgsConstructor
public class Admin implements UserDetails {

    private int adminSeq;
    private String adminId;
    private String adminPassword;
    private String adminName;
    private String adminEmail;
    private LocalDateTime appendDate;
    private LocalDateTime updateDate;
    private LocalDateTime passwordExpiredDate;
    private int loginFailCount;
    private boolean useYn;
    private String adminRule;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority(this.adminRule));
    }

    @Override
    public String getPassword() {
        return this.adminPassword;
    }

    @Override
    public String getUsername() {
        return this.adminId;
    }

    public String getUserNickName(){
        return this.adminName;
    }

    public String getUserEmail(){return this.adminEmail;}

    public boolean getUseYn(){return this.useYn;}

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }


}
