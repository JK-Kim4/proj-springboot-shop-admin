package com.changbi.magazineadmin.repository.mysql;

import com.changbi.magazineadmin.controller.author.domain.Author;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AuthorRepository {
    List<Author> selectAuthorAll();

    Author selectAuthorById(int authorSeq);

    int insertAuthor(Author author);

    int updateAuthor(Author author);

    List<Author> selectAuthorByKeyword(String keyword);

    int deleteAuthor(int authorSeq);
}
