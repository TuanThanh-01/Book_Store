package com.PTIT.BookStore.repository;

import com.PTIT.BookStore.entities.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {

    Page<Book> findByTitleContaining(String title, Pageable pageable);

    Page<Book> findByTypeBook(String typeBook, Pageable pageable);

    Book findByTitle(String title);
}
