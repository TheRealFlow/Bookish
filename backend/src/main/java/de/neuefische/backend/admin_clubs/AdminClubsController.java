package de.neuefische.backend.admin_clubs;

import de.neuefische.backend.bookclubs.BookClub;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/clubs")
@RequiredArgsConstructor
public class AdminClubsController {
    private final AdminClubsService adminClubsService;

    @GetMapping
    public List<BookClub> getAll() {
        return adminClubsService.getAll();
    }

    @GetMapping("/{id}")
    public BookClub getById(@PathVariable String id) {
        return adminClubsService.getById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable String id) {
        adminClubsService.deleteById(id);
    }
}
