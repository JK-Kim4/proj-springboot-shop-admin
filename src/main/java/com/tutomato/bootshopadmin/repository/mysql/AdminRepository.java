package com.tutomato.bootshopadmin.repository.mysql;

import com.tutomato.bootshopadmin.controller.admin.domain.Admin;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AdminRepository {
    int signUpAdmin(Admin admin);

    Admin getAdminAccount(String adminId);

    Admin validationAdmin(String adminId);

    int loginFailCountPlus(Admin admin);

    int clearFailCount(String loginId);

    int updateUseYn(String adminId);
}
