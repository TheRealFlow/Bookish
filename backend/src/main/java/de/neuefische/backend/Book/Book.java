package de.neuefische.backend.Book;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Book {
    private String id;
    private String title;
    private String author;
    private String description;
    private String imageUrl;
    private String isbn;
    private int pages;
    private int year;
    private String genre;
    private String createdBy;
}