package de.neuefische.backend.Friend;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Friend {
    private String id;
    private String username;
    private String imageId;
    private String createdBy;
}
