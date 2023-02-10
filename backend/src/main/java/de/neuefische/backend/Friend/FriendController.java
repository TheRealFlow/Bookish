package de.neuefische.backend.Friend;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/friends")
@RequiredArgsConstructor
public class FriendController {
    private final FriendService friendService;

    @GetMapping
    public List<Friend> getAll() {
        return friendService.getAll();
    }

    @GetMapping("/{id}")
    public Friend getFriendById (@PathVariable String id) {
        return friendService.getFriendById(id);
    }

    @PostMapping
    public Friend create (@RequestBody Friend friend) {
        return friendService.create(friend);
    }

    @DeleteMapping("/{id}")
    public void deleteFriend (@PathVariable String id) {
        friendService.deleteFriend(id);
    }
}
