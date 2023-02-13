package de.neuefische.backend.BookClub;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

import java.util.*;

import static org.mockito.Mockito.*;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class BookClubServiceTests {

    @Test
    void getAllBookClubs() {
        List<BookClub> bookClubs = new ArrayList<>();
        bookClubs.add(new BookClub());
        bookClubs.add(new BookClub());

        BookClubService bookClubService = mock(BookClubService.class);
        when(bookClubService.getAll()).thenReturn(bookClubs);

        assert bookClubService.getAll().equals(bookClubs);
    }

    @Test
    void getBookClubById() {
        BookClub bookClub = new BookClub();

        BookClubService bookClubService = mock(BookClubService.class);
        when(bookClubService.getBookClubById("1")).thenReturn(bookClub);

        assert bookClubService.getBookClubById("1").equals(bookClub);
    }

    @Test
    void addNewBookClub() {
        BookClub bookClub = new BookClub();

        BookClubService bookClubService = mock(BookClubService.class);
        when(bookClubService.create(bookClub)).thenReturn(bookClub);

        assert bookClubService.create(bookClub).equals(bookClub);
    }

    @Test
    void deleteBookClub() {
        BookClubService bookClubService = mock(BookClubService.class);
        BookClub bookClub = new BookClub();

        doNothing().when(bookClubService).deleteBookClub(String.valueOf(bookClub));

        bookClubService.deleteBookClub(String.valueOf(bookClub));
        verify(bookClubService, times(1)).deleteBookClub(String.valueOf(bookClub));
    }
}
