package de.neuefische.backend.clubbooks;

import de.neuefische.backend.user.AppUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class ClubBooksService {
        private final ClubBooksRepository clubBooksRepository;
        private final AppUserService appUserService;

        public ClubBooks create(ClubBooks clubBooks) {
            clubBooks.setCreatedBy(appUserService.getAuthenticatedUser().getId());
            return clubBooksRepository.save(clubBooks);
        }

        public List<ClubBooks> getAll() {
            return clubBooksRepository.findAllByCreatedBy(
                    appUserService.getAuthenticatedUser().getId()
            );
        }

        public ClubBooks getClubBookById(String id) {
            return clubBooksRepository.findById(id).orElseThrow(
                    () -> new NoSuchElementException("ClubBook with the ID: " + id + " not found")
            );
        }

        public void deleteClubBook(String id) {
            clubBooksRepository.deleteById(id);
        }
}
