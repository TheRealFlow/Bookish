package de.neuefische.backend.ClubMember;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/clubmember")
@RequiredArgsConstructor
public class ClubMemberController {
    private final ClubMemberService clubMemberService;

    @GetMapping
    public List<ClubMember> getAll() {
        return clubMemberService.getAll();
    }

    @GetMapping("/{id}")
    public ClubMember getClubMemberById (@PathVariable String id) {
        return clubMemberService.getClubMemberById(id);
    }

    @PostMapping
    public ClubMember create (@RequestBody ClubMember clubMember) {
        return clubMemberService.create(clubMember);
    }

    @DeleteMapping("/{id}")
    public void deleteClubMember (@PathVariable String id) {
        clubMemberService.deleteClubMember(id);
    }

}
