package com.changbi.magazineadmin.service;

import com.changbi.magazineadmin.controller.admin.domain.Admin;
import com.changbi.magazineadmin.controller.admin.domain.SessionAdmin;
import com.changbi.magazineadmin.repository.mysql.AdminRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;

@Service
@RequiredArgsConstructor
@Slf4j
public class AdminService implements UserDetailsService {

    private final AdminRepository adminRepository;
    private final HttpSession session;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public int signUpAdmin(Admin admin) {
        admin.setAdminPassword(passwordEncoder.encode(admin.getAdminPassword()));
        return adminRepository.signUpAdmin(admin);
    }

    @Override
    public UserDetails loadUserByUsername(String adminId) throws UsernameNotFoundException {
        Admin loginAdmin = adminRepository.getAdminAccount(adminId);
        SessionAdmin sessionAdmin = null;

        if(loginAdmin != null){
            sessionAdmin = new SessionAdmin(loginAdmin);
            session.setAttribute("admin", sessionAdmin);

        }else {
            throw new UsernameNotFoundException("회원이 존재하지 않습니다.");
        }

        return loginAdmin;
    }

    public int loginFailCountPlus(String adminId) {

        int result = 0;
        Admin admin = adminRepository.validationAdmin(adminId);
        if(admin != null){
            result = adminRepository.loginFailCountPlus(admin);
            admin = adminRepository.validationAdmin(adminId);
            if(admin.getLoginFailCount() > 5){
                adminRepository.updateUseYn(adminId);
            }
        }else {
            throw new NullPointerException("사용자가 존재하지 않습니다.");
        }

        return result;
    }

    public int clearFailCount(String loginId) {
        int result = 0;

        result = adminRepository.clearFailCount(loginId);

        return result;
    }

    public boolean validation(String adminId) {
        Admin admin = adminRepository.validationAdmin(adminId);
        if(admin.getUseYn() == true){
            return true;
        }else{
            return false;
        }
    }
}
