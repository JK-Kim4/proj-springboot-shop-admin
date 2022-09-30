package com.changbi.magazineadmin.dto;

import lombok.*;

@Data
@NoArgsConstructor
@Getter
@Setter
public class SearchDto {

    private String keyword;
    private String category;

    @Builder
    public SearchDto(String keyword, String category){
        this.keyword = keyword;
        this.category = category;
    }
}
