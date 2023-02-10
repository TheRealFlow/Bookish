package de.neuefische.backend.Friend;

import de.neuefische.backend.User.AppUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class FriendService {
    private final FriendRepository friendRepository;
    private final AppUserService appUserService;

    public Friend create (Friend friend) {
        friend.setCreatedBy(appUserService.getAuthenticatedUser().getId());
        return friendRepository.save(friend);
    }

    public List<Friend> getAll() {
        return friendRepository.findAllByCreatedBy(
                appUserService.getAuthenticatedUser().getId()
        );
    }

    public Friend getFriendById(String id) {
        return friendRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Friend with the ID: " + id + " not found"));
    }

    public void deleteFriend(String id) {
        friendRepository.deleteById(id);
    }
}
