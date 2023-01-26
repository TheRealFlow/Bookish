package de.neuefische.backend.Book;

import de.neuefische.backend.User.AppUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public void deleteById(String id) {
        bookRepository.deleteById(id);
    }

    public Book update(Book book) {
        return bookRepository.save(book);
    }
}
