package de.neuefische.backend.bookclubs;

import de.neuefische.backend.appuser.AppUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class BookClubService {
        private final BookClubRepository bookClubRepository;
        private final AppUserService appUserService;

        public BookClub create(BookClub bookClub) {
            bookClub.setCreatedBy(appUserService.getAuthenticatedUser().getId());
            return bookClubRepository.save(bookClub);
        }

        public List<BookClub> getAll() {
            return bookClubRepository.findAllByCreatedBy(
                    appUserService.getAuthenticatedUser().getId()
            );
        }

        public BookClub getBookClubById(String id) {
            return bookClubRepository.findById(id)
                    .orElseThrow(() -> new NoSuchElementException("BookClub with the ID: " + id + " not found"));
        }

        public BookClub updateBookClub(BookClub bookClub) {
            return bookClubRepository.save(bookClub);
        }

        public void deleteBookClub(String id) {
            bookClubRepository.deleteById(id);
        }
}
