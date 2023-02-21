package de.neuefische.backend.admin_books;

import de.neuefische.backend.books.Book;
import de.neuefische.backend.books.BookService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.*;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
public class AdminBooksServiceTests {

    @Test
    void getAllBooks() {
        List<Book> books = new ArrayList<>();
        books.add(new Book());
        books.add(new Book());

        BookService bookService = mock(BookService.class);
        when(bookService.getAll()).thenReturn(books);

        Assertions.assertEquals(books, bookService.getAll());
    }

    @Test
    void getBookById() {
        Book book = new Book();

        BookService bookService = mock(BookService.class);
        when(bookService.getBookById("1")).thenReturn(book);

        Assertions.assertEquals(book, bookService.getBookById("1"));
    }

    @Test
    void deleteBook() {
        BookService bookService = mock(BookService.class);
        Book book = new Book();

        doNothing().when(bookService).deleteBook(String.valueOf(book));

        bookService.deleteBook(String.valueOf(book));
        verify(bookService, times(1)).deleteBook(String.valueOf(book));
    }
}
