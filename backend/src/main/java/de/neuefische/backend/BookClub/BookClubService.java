package de.neuefische.backend.BookClub;

import de.neuefische.backend.User.AppUserService;
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

        public void deleteBookClub(String id) {
            bookClubRepository.deleteById(id);
        }

        /*public BookClub updateBookClub(String id, BookClub bookClub) {
            BookClub bookClubToUpdate = bookClubRepository.findById(id).orElseThrow();
            bookClubToUpdate.setName(bookClub.getName());
            bookClubToUpdate.setDescription(bookClub.getDescription());
            bookClubToUpdate.setMembers(bookClub.getMembers());
            bookClubToUpdate.setBooks(bookClub.getBooks());
            return bookClubRepository.save(bookClubToUpdate);
        }

        public BookClub addMember(String id, String member) {
            BookClub bookClubToUpdate = bookClubRepository.findById(id).orElseThrow();
            bookClubToUpdate.addMember(member);
            return bookClubRepository.save(bookClubToUpdate);
        }

        public BookClub removeMember(String id, String member) {
            BookClub bookClubToUpdate = bookClubRepository.findById(id).orElseThrow();
            bookClubToUpdate.removeMember(member);
            return bookClubRepository.save(bookClubToUpdate);
        }

        public BookClub addBook(String id, String book) {
            BookClub bookClubToUpdate = bookClubRepository.findById(id).orElseThrow();
            bookClubToUpdate.addBook(book);
            return bookClubRepository.save(bookClubToUpdate);
        }

        public BookClub removeBook(String id, String book) {
            BookClub bookClubToUpdate = bookClubRepository.findById(id).orElseThrow();
            bookClubToUpdate.removeBook(book);
            return bookClubRepository.save(bookClubToUpdate);
        }*/
}
