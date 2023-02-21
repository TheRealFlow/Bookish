package de.neuefische.backend.admin_clubs;

import de.neuefische.backend.bookclubs.BookClub;
import de.neuefische.backend.bookclubs.BookClubService;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class AdminClubsServiceTests {

    @Test
    void getAllBookClubs() {
        List<BookClub> bookClubs = new ArrayList<>();
        bookClubs.add(new BookClub());
        bookClubs.add(new BookClub());

        BookClubService bookClubService = mock(BookClubService.class);
        when(bookClubService.getAll()).thenReturn(bookClubs);

        assertEquals(bookClubs, bookClubService.getAll());
    }

    @Test
    void getBookClubById() {
        BookClub bookClub = new BookClub();

        BookClubService bookClubService = mock(BookClubService.class);
        when(bookClubService.getBookClubById("1")).thenReturn(bookClub);

        assertEquals(bookClub, bookClubService.getBookClubById("1"));
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
