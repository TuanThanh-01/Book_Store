package com.PTIT.BookStore.service;

import com.PTIT.BookStore.entities.Book;
import com.PTIT.BookStore.entities.Image;
import com.PTIT.BookStore.exception.BookNotFoundException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface BookService {

    List<Image> saveImage(String title, MultipartFile[] images) throws IOException;

    List<Image> updateImage(String newTitle, String oldTitle, MultipartFile[] images) throws IOException;

    void deleteImage(String title) throws IOException;

    Map<String, Object> fetchAllBook(String title, int page, int size);

    Map<String, Object> fetchAllBookByTypeBook(String typeBook, int page, int size);

    Book fetchBookById(int id) throws BookNotFoundException;

    Book saveBook(Book book);

    Book updateBook(int bookId, Book book) throws BookNotFoundException;

    void deleteBookById(int bookId) throws BookNotFoundException;

    boolean isTitleUnique(String title);
}
