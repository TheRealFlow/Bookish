package de.neuefische.backend.ClubBook;

import de.neuefische.backend.ClubBooks.ClubBooks;
import de.neuefische.backend.ClubBooks.ClubBooksService;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class ClubBookServiceTests {

    @Test
    void getAllClubBooks() {
        List<ClubBooks> clubBooks = new ArrayList<>();
        clubBooks.add(new ClubBooks());
        clubBooks.add(new ClubBooks());

        ClubBooksService clubBookService = mock(ClubBooksService.class);
        when(clubBookService.getAll()).thenReturn(clubBooks);

        assertEquals(clubBooks, clubBookService.getAll());
    }

    @Test
    void getClubBookById() {
        ClubBooks clubBook = new ClubBooks();

        ClubBooksService clubBookService = mock(ClubBooksService.class);
        when(clubBookService.getClubBookById("1")).thenReturn(clubBook);

        assertEquals(clubBook, clubBookService.getClubBookById("1"));
    }

    @Test
    void addNewClubBook() {
        ClubBooks clubBook = new ClubBooks();

        ClubBooksService clubBookService = mock(ClubBooksService.class);
        when(clubBookService.create(clubBook)).thenReturn(clubBook);

        assertEquals(clubBook, clubBookService.create(clubBook));
    }

    @Test
    void deleteClubBook() {
        ClubBooksService clubBookService = mock(ClubBooksService.class);
        ClubBooks clubBook = new ClubBooks();

        doNothing().when(clubBookService).deleteClubBook(String.valueOf(clubBook));

        clubBookService.deleteClubBook(String.valueOf(clubBook));
        verify(clubBookService, times(1)).deleteClubBook(String.valueOf(clubBook));
    }
}
