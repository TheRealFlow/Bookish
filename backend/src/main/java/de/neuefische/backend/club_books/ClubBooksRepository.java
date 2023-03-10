package de.neuefische.backend.club_books;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClubBooksRepository extends MongoRepository<ClubBooks, String> {
    List<ClubBooks> findAllByCreatedBy(String id);
}
