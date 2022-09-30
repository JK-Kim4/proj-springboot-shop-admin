package com.changbi.magazineadmin.service;

import com.changbi.magazineadmin.controller.magazine.domain.Magazine;
import com.changbi.magazineadmin.repository.mysql.MagazineRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class MagazineService {

    private final MagazineRepository magazineRepository;

    public List<Magazine> selectMagazineAll() {
        return magazineRepository.selectMagazineAll();
    }

    public int insertMagazine(Magazine magazine) {
        return magazineRepository.insertMagazine(magazine);
    }
}
