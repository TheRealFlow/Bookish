package de.neuefische.backend.admin_books;

import de.neuefische.backend.books.Book;
import de.neuefische.backend.books.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class AdminBooksService {
    private final BookRepository bookRepository;

    public List<Book> getAll() {
        return bookRepository.findAll();
    }

    public Book getById(String id) {
        return bookRepository.findById(id).orElseThrow(
                () -> new NoSuchElementException("AdminBook with the ID: " + id + " not found")
        );
    }

    public void deleteById(String id) {
        bookRepository.deleteById(id);
    }
}
