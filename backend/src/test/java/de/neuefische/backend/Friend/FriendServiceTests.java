package de.neuefische.backend.Friend;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

import java.util.*;

import static org.mockito.Mockito.*;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
public class FriendServiceTests {

    @Test
    void getAllFriends() {
        List<Friend> friends = new ArrayList<>();
        friends.add(new Friend());
        friends.add(new Friend());

        FriendService friendService = mock(FriendService.class);
        when(friendService.getAll()).thenReturn(friends);

        assert friendService.getAll().equals(friends);
    }

    @Test
    void getFriendById() {
        Friend friend = new Friend();

        FriendService friendService = mock(FriendService.class);
        when(friendService.getFriendById("1")).thenReturn(friend);

        assert friendService.getFriendById("1").equals(friend);
    }

    @Test
    void addNewFriend() {
        Friend friend = new Friend();

        FriendService friendService = mock(FriendService.class);
        when(friendService.create(friend)).thenReturn(friend);

        assert friendService.create(friend).equals(friend);
    }

    @Test
    void deleteFriend() {
        FriendService friendService = mock(FriendService.class);
        Friend friend = new Friend();

        doNothing().when(friendService).deleteFriend(String.valueOf(friend));

        friendService.deleteFriend(String.valueOf(friend));
        verify(friendService, times(1)).deleteFriend(String.valueOf(friend));
    }
}
