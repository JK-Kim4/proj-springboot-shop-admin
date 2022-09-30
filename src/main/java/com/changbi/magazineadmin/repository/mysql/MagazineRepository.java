package com.changbi.magazineadmin.repository.mysql;

import com.changbi.magazineadmin.controller.magazine.domain.Magazine;
import com.changbi.magazineadmin.dto.SearchDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MagazineRepository {
    List<Magazine> selectMagazineAll();

    int insertMagazine(Magazine magazine);

    List<Magazine> selectMagazineBySearch(SearchDto dto);
}
