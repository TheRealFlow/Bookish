package de.neuefische.backend.book;

import de.neuefische.backend.user.AppUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class BookService {
    private final BookRepository bookRepository;
    private final AppUserService appUserService;

    public Book create (Book book) {
        book.setCreatedBy(appUserService.getAuthenticatedUser().getId());
        return bookRepository.save(book);
    }

    public List<Book> getAll() {
        return bookRepository.findAllByCreatedBy(
                appUserService.getAuthenticatedUser().getId()
        );
    }

    public Book getBookById(String id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Book with the ID: " + id + " not found"));
    }

    public void deleteBook(String id) {
        bookRepository.deleteById(id);
    }

    public Book update(Book book) {
        return bookRepository.save(book);
    }

}
