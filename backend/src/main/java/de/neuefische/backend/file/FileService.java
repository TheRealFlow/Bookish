package de.neuefische.backend.file;

import com.mongodb.BasicDBObjectBuilder;
import com.mongodb.client.gridfs.model.GridFSFile;
import de.neuefische.backend.user.AppUser;
import de.neuefische.backend.user.AppUserService;
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
    private static final String Created_By = "createdBy";
    private final GridFsTemplate gridFsTemplate;
    private final AppUserService appUserService;

    public FileMetadata saveFile (MultipartFile multipartFile) throws IOException {
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
                        .add(Created_By, appUser.getUsername())
                        .get()
        );
        return getFileMetadata(objectId.toString());
    }

    public GridFsResource getResource(String id) {
        return gridFsTemplate.getResource(getFile(id));
    }

    public FileMetadata getFileMetadata(String id) {

        GridFSFile gridFSFile = getFile(id);
        Document metadata = Optional.ofNullable(
                        gridFSFile.getMetadata())
                .orElse(new Document(Map.of("_contentType", "", Created_By, "")));

        return new FileMetadata(
                id,
                gridFSFile.getFilename(),
                metadata.getString("_contentType"),
                gridFSFile.getLength(),
                metadata.getString(Created_By)
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
