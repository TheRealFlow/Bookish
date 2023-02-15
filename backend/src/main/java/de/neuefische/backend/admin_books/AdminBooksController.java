package de.neuefische.backend.admin_books;

import de.neuefische.backend.books.Book;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/books")
@RequiredArgsConstructor
public class AdminBooksController {
    private final AdminBooksService adminBooksService;

    @GetMapping
    public List<Book> getAll() {
        return adminBooksService.getAll();
    }

    @GetMapping("/{id}")
    public Book getById(@PathVariable String id) {
        return adminBooksService.getById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable String id) {
        adminBooksService.deleteById(id);
    }
}
