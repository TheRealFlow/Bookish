package de.neuefische.backend.ClubMember;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ClubMemberRepository extends MongoRepository<ClubMember, String> {
    List<ClubMember> findAllByCreatedBy(String id);
}
