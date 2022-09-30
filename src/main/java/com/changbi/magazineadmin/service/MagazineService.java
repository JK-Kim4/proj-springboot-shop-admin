package com.changbi.magazineadmin.service;

import com.changbi.magazineadmin.controller.magazine.domain.Magazine;
import com.changbi.magazineadmin.repository.mysql.ArticleRepository;
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
    private final ArticleRepository articleRepository;

    public List<Magazine> selectMagazineAll() {
        return magazineRepository.selectMagazineAll();
    }

    public int insertMagazine(Magazine magazine) {
        int result = 0;
        try {
            result = magazineRepository.insertMagazine(magazine);
            int genMagazineSeq = magazine.getMagazineSeq();
            if(result > 0){
                if(magazine.getArticleHeadArray() != null && magazine.getArticleHeadArray().size() > 0){
                    result = articleRepository.insertArticleHead(magazine);
                }
            }else{
                throw new IllegalArgumentException("[error] 계간지 등록 실패");
            }

        }catch (Exception e){
            log.error("magazine insert error occur !!", e);
            result = 0;
        }

        return result;
    }
}
