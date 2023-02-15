package de.neuefische.backend.bookclubs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookClub {
    private String id;
    private String name;
    private String owner;
    private String description;
    private String image;
    private String genre;
    private String createdBy;
}

