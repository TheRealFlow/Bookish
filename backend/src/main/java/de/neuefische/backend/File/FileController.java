package de.neuefische.backend.File;

import de.neuefische.backend.User.AppUser;
import de.neuefische.backend.User.AppUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.mongodb.gridfs.GridFsResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/images")
@RequiredArgsConstructor
public class FileController {
    private final FileService fileService;
    private final AppUserService appUserService;

    @PostMapping
    public FileMetadata uploadFile (@RequestParam("file") MultipartFile file) throws IOException {
        String appUserId = appUserService.getAuthenticatedUser().getId();
        AppUser appUser = appUserService.findUserById(appUserId);

        FileMetadata metadata = fileService.saveFile(file);
        appUser.setImageId(metadata.getId());
        appUserService.update(appUser);

        return metadata;
    }

    @GetMapping("/{id}")
    public ResponseEntity<InputStreamResource> getFile (
            @PathVariable String id
    ) throws IOException {
        GridFsResource gridFsResource = this.fileService.getResource(id);

        return ResponseEntity.ok()
                .contentType(MediaType.valueOf(gridFsResource.getContentType()))
                .body(new InputStreamResource(gridFsResource.getInputStream()));
    }

    @GetMapping("/{id}/metadata")
    public FileMetadata getFileMetadata(@PathVariable String id) {
        return this.fileService.getFileMetadata(id);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable String id) {
        fileService.deleteById(id);
    }
}
