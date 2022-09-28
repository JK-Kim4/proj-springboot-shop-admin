package com.changbi.magazineadmin.service;

import com.changbi.magazineadmin.controller.author.domain.Author;
import com.changbi.magazineadmin.repository.mysql.AuthorRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthorService {

    private final AuthorRepository authorRepository;

    public List<Author> selectAuthorAll() {
        return authorRepository.selectAuthorAll();
    }

    public Author selectAuthorById(int authorId) {
        return authorRepository.selectAuthorById(authorId);
    }

    public int insertAuthor(Author author) {
        return authorRepository.insertAuthor(author);
    }

    public int updateAuthor(Author author) {
        return authorRepository.updateAuthor(author);
    }
}
