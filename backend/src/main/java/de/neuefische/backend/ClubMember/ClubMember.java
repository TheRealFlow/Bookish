package de.neuefische.backend.ClubMember;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClubMember {
    private String id;
    private String username;
    private String imageId;

    private String createdBy;
}
