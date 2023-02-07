package de.neuefische.backend.File;

import com.mongodb.BasicDBObjectBuilder;
import com.mongodb.client.gridfs.model.GridFSFile;
import de.neuefische.backend.User.AppUser;
import de.neuefische.backend.User.AppUserService;
import lombok.RequiredArgsConstructor;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsResource;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FileService {
    private final GridFsTemplate gridFsTemplate;
    private final AppUserService appUserService;

    public String saveFile (MultipartFile multipartFile) throws IOException {
        if (multipartFile.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "File is empty"
            );
        }

        AppUser appUser = appUserService.getAuthenticatedUser();

        ObjectId objectId = gridFsTemplate.store(
                multipartFile.getInputStream(),
                multipartFile.getOriginalFilename(),
                multipartFile.getContentType(),
                BasicDBObjectBuilder.start()
                        .add("createdBy", appUser.getUsername())
                        .get()
        );
        return objectId.toString();
    }

    public GridFsResource getResource(String id) {
        return gridFsTemplate.getResource(getFile(id));
    }

    public FileMetadata getFileMetadata(String id) {

        GridFSFile gridFSFile = getFile(id);
        Document metadata = Optional.ofNullable(
                        gridFSFile.getMetadata())
                .orElse(new Document(Map.of("_contentType", "", "createdBy", "")));

        return new FileMetadata(
                id,
                gridFSFile.getFilename(),
                metadata.getString("_contentType"),
                gridFSFile.getLength(),
                metadata.getString("createdBy")
        );
    }

    public GridFSFile getFile(String id) {
        return Optional.ofNullable(
                gridFsTemplate.findOne(
                        Query.query(Criteria.where("_id").is(id))
                )
        ).orElseThrow(
                () -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "File not found"
                )
        );
    }

    public void deleteById(String id) {
        gridFsTemplate.delete(new Query(Criteria.where("_id").is(id)));
    }
}
