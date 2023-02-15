package de.neuefische.backend.club_member;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

import java.util.*;

import static org.mockito.Mockito.*;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class ClubMemberServiceTests {

    @Test
    void getAllClubMembers() {
        List<ClubMember> clubMembers = new ArrayList<>();
        clubMembers.add(new ClubMember());
        clubMembers.add(new ClubMember());

        ClubMemberService clubMemberService = mock(ClubMemberService.class);
        when(clubMemberService.getAll()).thenReturn(clubMembers);

        Assertions.assertEquals(clubMembers, clubMemberService.getAll());
    }

    @Test
    void getClubMemberById() {
        ClubMember clubMember = new ClubMember();

        ClubMemberService clubMemberService = mock(ClubMemberService.class);
        when(clubMemberService.getClubMemberById("1")).thenReturn(clubMember);

        Assertions.assertEquals(clubMember, clubMemberService.getClubMemberById("1"));
    }

    @Test
    void addNewClubMember() {
        ClubMember clubMember = new ClubMember();

        ClubMemberService clubMemberService = mock(ClubMemberService.class);
        when(clubMemberService.create(clubMember)).thenReturn(clubMember);

        Assertions.assertEquals(clubMember, clubMemberService.create(clubMember));
    }

    @Test
    void deleteClubMember() {
        ClubMemberService clubMemberService = mock(ClubMemberService.class);
        ClubMember clubMember = new ClubMember();

        doNothing().when(clubMemberService).deleteClubMember(String.valueOf(clubMember));

        clubMemberService.deleteClubMember(String.valueOf(clubMember));
        verify(clubMemberService, times(1)).deleteClubMember(String.valueOf(clubMember));
    }
}
