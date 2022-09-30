package com.changbi.magazineadmin.repository.mysql;

import com.changbi.magazineadmin.controller.magazine.domain.Magazine;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ArticleRepository {
    int insertArticleHead(Magazine magazine);
}
