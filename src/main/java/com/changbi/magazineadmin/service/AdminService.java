package com.changbi.magazineadmin.service;

import com.changbi.magazineadmin.controller.admin.domain.Admin;
import com.changbi.magazineadmin.repository.mysql.AdminRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class AdminService {

    private final AdminRepository adminRepository;

    public int signUpAdmin(Admin admin) {
        return adminRepository.signUpAdmin(admin);
    }
}
