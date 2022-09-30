package com.changbi.magazineadmin.service;

import com.changbi.magazineadmin.controller.article.domain.ArticleHead;
import com.changbi.magazineadmin.controller.magazine.domain.Magazine;
import com.changbi.magazineadmin.repository.mysql.ArticleRepository;
import com.changbi.magazineadmin.repository.mysql.MagazineRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
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

    @Transactional
    public int insertMagazine(Magazine magazine) {
        int result = 0;
        try {
            result = magazineRepository.insertMagazine(magazine);
            if(result > 0){
                if(magazine.getArticleHeadArray() != null && magazine.getArticleHeadArray().size() > 0){
                    List<ArticleHead> articleHeads = magazine.getArticleHeadArray();
                    articleHeads = setMagazineSeq(articleHeads, magazine.getMagazineSeq());
                    result = articleRepository.insertArticleHead(articleHeads);
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

    public int updateMagazine(Magazine magazine) {
        return 0;
    }

    private List<ArticleHead> setMagazineSeq(List<ArticleHead> param, int magazineSeq){
        if(param != null && param.size() > 0){
            for(int i = 0; i < param.size(); i++){
                param.get(i).setMagazineSeq(magazineSeq);
            }
        }else{
            List<ArticleHead> emptyList = new ArrayList<>();
            ArticleHead noOne = ArticleHead.builder()
                    .magazineSeq(0)
                    .build();
            emptyList.add(noOne);
            param = emptyList;
        }
        return param;
    }
}
