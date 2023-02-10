package de.neuefische.backend.bookclub;

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
    private String createdBy;
    private String[] members;
    private String[] books;
}

