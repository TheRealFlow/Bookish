package de.neuefische.backend.BookClub;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookclubs")
@RequiredArgsConstructor
public class BookClubController {
    private final BookClubService bookClubService;

    @PostMapping
    public BookClub create (@RequestBody BookClub bookClub) {
        return bookClubService.create(bookClub);
    }

    @GetMapping
    public List<BookClub> getAll() {
        return bookClubService.getAll();
    }

    @GetMapping("/{id}")
    public BookClub getBookClubById (@PathVariable String id) {
        return bookClubService.getBookClubById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteBookClub (@PathVariable String id) {
        bookClubService.deleteBookClub(id);
    }
}
