package de.neuefische.backend.BookClub;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bookclubs")
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

    /*@PutMapping("/{id}")
    public BookClub updateBookClub (@PathVariable String id, @RequestBody BookClub bookClub) {
        return bookClubService.updateBookClub(id, bookClub);
    }

    @PutMapping("/{id}/members")
    public BookClub addMember (@PathVariable String id, @RequestBody String member) {
        return bookClubService.addMember(id, member);
    }

    @DeleteMapping("/{id}/members")
    public BookClub removeMember (@PathVariable String id, @RequestBody String member) {
        return bookClubService.removeMember(id, member);
    }

    @PutMapping("/{id}/books")
    public BookClub addBook (@PathVariable String id, @RequestBody String bookId) {
        return bookClubService.addBook(id, bookId);
    }

    @DeleteMapping("/{id}/books")
    public BookClub removeBook (@PathVariable String id, @RequestBody String bookId) {
        return bookClubService.removeBook(id, bookId);
    }*/
}
