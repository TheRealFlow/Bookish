package de.neuefische.backend.admin_clubs;

import de.neuefische.backend.bookclubs.BookClub;
import de.neuefische.backend.bookclubs.BookClubRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class AdminClubsService {
    private final BookClubRepository bookClubRepository;

    public List<BookClub> getAll() {
        return bookClubRepository.findAll();
    }

    public BookClub getById(String id) {
        return bookClubRepository.findById(id).orElseThrow(
                () -> new NoSuchElementException("AdminClub with the ID: " + id + " not found")
        );
    }

    public void deleteById(String id) {
        bookClubRepository.deleteById(id);
    }
}
