package com.tutomato.bootshopadmin.dto;

import lombok.*;

@Data
@NoArgsConstructor
@Getter
@Setter
public class SearchDto {

    private String searchKeyword;
    private String searchType;

    @Builder
    public SearchDto(String searchKeyword, String searchType){
        this.searchKeyword = searchKeyword;
        this.searchType = searchType;
    }
}
