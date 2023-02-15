package de.neuefische.backend.bookclubs;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookClubRepository extends MongoRepository<BookClub, String> {

    List<BookClub> findAllByCreatedBy(String createdBy);
}
