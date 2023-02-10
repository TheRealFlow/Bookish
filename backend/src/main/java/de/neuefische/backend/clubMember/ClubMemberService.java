package de.neuefische.backend.clubMember;

import de.neuefische.backend.user.AppUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class ClubMemberService {
    private final ClubMemberRepository clubMemberRepository;
    private final AppUserService appUserService;

    public ClubMember create(ClubMember clubMember) {
        clubMember.setCreatedBy(appUserService.getAuthenticatedUser().getId());
        return clubMemberRepository.save(clubMember);
    }

    public List<ClubMember> getAll() {
        return clubMemberRepository.findAllByCreatedBy(
                appUserService.getAuthenticatedUser().getId()
        );
    }

    public ClubMember getClubMemberById(String id) {
        return clubMemberRepository.findById(id).orElseThrow(
                () -> new NoSuchElementException("ClubMember with the ID: " + id + " not found")
        );
    }

    public void deleteClubMember(String id) {
        clubMemberRepository.deleteById(id);
    }
}
