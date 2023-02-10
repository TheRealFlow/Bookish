package de.neuefische.backend.ClubBooks;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/club-books")
@RequiredArgsConstructor
public class ClubBooksController {
    private final ClubBooksService clubBooksService;

    @GetMapping
    public List<ClubBooks> getAll() {
        return clubBooksService.getAll();
    }

    @GetMapping("/{id}")
    public ClubBooks getClubBookById (@PathVariable String id) {
        return clubBooksService.getClubBookById(id);
    }

    @PostMapping
    public ClubBooks create (@RequestBody ClubBooks clubBooks) {
        return clubBooksService.create(clubBooks);
    }

    @DeleteMapping("/{id}")
    public void deleteClubBook (@PathVariable String id) {
        clubBooksService.deleteClubBook(id);
    }
}
