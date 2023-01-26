package de.neuefische.backend.Book;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/books")
@RequiredArgsConstructor
public class BookController {
    private final BookService bookService;

    @GetMapping
    public List<Book> getAll() {
        return bookService.getAll();
    }

    @PostMapping
    public Book create (@RequestBody Book book) {
        return bookService.create(book);
    }

    @DeleteMapping("/{id}")
    public void deleteById (@PathVariable String id) {
        bookService.deleteById(id);
    }

    @PutMapping("/{id}")
    public Book update (@PathVariable String id, @RequestBody Book book) {
        book.setId(id);
        return bookService.update(book);
    }
}
