package de.neuefische.backend.club_member;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ClubMemberRepository extends MongoRepository<ClubMember, String> {
    List<ClubMember> findAllByCreatedBy(String id);
}
