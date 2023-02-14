package de.neuefische.backend.file;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.HashMap;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class FileControllerTests {

    @Autowired
    MockMvc mockMvc;

    @Test
    @WithMockUser(username = "user", password = "pwd", roles = "USER")
    void uploadFile_whenUserIsLoggedIn_returnFile() throws Exception {
        String requestUser = """
                {
                    "username":"user",
                    "password":"pwd"
                }
                """;

        String expectedUser = """
                {
                    "username": "user",
                    "password": ""
                }
                """;

        mockMvc.perform(MockMvcRequestBuilders.post("/api/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestUser))
                .andExpect(status().isOk())
                .andExpect(content().json(expectedUser));

        MockMultipartFile file = new MockMultipartFile("file", "test.txt", "text/plain", "test data".getBytes());

        String expectedFile = """
                {
                    "name": "test.txt",
                    "contentType": "text/plain",
                    "size": 9
                }
                """;

        this.mockMvc.perform(multipart("/api/images").file(file))
                .andExpect(status().isOk())
                .andExpect(content().json(expectedFile));
    }

    @Test
    void uploadFile_whenUserIsNotLoggedIn_return401() throws Exception {
        MockMultipartFile file = new MockMultipartFile("file", "test.txt", "text/plain", "test data".getBytes());

        this.mockMvc.perform(multipart("/api/images").file(file))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(username = "user", password = "pwd", roles = "USER")
    void getFileById_whenUserIsLoggedIn_returnFile() throws Exception {
        String requestUser = """
                {
                    "username":"user",
                    "password":"pwd"
                }
                """;

        String expectedUser = """
                {
                    "username": "user",
                    "password": ""
                }
                """;

        mockMvc.perform(MockMvcRequestBuilders.post("/api/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestUser))
                .andExpect(status().isOk())
                .andExpect(content().json(expectedUser));

        MockMultipartFile file = new MockMultipartFile("file", "test.txt", "text/plain", "test data".getBytes());

        String expectedFile = """
                {
                    "name": "test.txt",
                    "contentType": "text/plain",
                    "size": 9
                }
                """;

        String response = this.mockMvc.perform(multipart("/api/images").file(file))
                .andExpect(status().isOk())
                .andExpect(content().json(expectedFile))
                .andReturn().getResponse().getContentAsString();

        HashMap<String, String> responseMap = new ObjectMapper().readValue(response, HashMap.class);
        String fileId = responseMap.get("id");

        this.mockMvc.perform(get("/api/images/" + fileId))
                .andExpect(status().isOk())
                .andExpect(content().string("test data"));
    }

    @Test
    void getFileById_whenUserIsNotLoggedIn_return401() throws Exception {
        this.mockMvc.perform(get("/api/images/1"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(username = "user", password = "pwd", roles = "USER")
    void deleteFileById_whenUserIsLoggedIn_deleteFile() throws Exception {
        String requestUser = """
                {
                    "username":"user",
                    "password":"pwd"
                }
                """;

        String expectedUser = """
                {
                    "username": "user",
                    "password": ""
                }
                """;

        mockMvc.perform(MockMvcRequestBuilders.post("/api/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestUser))
                .andExpect(status().isOk())
                .andExpect(content().json(expectedUser));

        MockMultipartFile file = new MockMultipartFile("file", "test.txt", "text/plain", "test data".getBytes());

        String expectedFile = """
                {
                    "name": "test.txt",
                    "contentType": "text/plain",
                    "size": 9
                }
                """;

        String response = this.mockMvc.perform(multipart("/api/images").file(file))
                .andExpect(status().isOk())
                .andExpect(content().json(expectedFile))
                .andReturn().getResponse().getContentAsString();

        HashMap<String, String> responseMap = new ObjectMapper().readValue(response, HashMap.class);
        String fileId = responseMap.get("id");

        this.mockMvc.perform(MockMvcRequestBuilders.delete("/api/images/" + fileId))
                .andExpect(status().isOk());
    }

    @Test
    void deleteFileById_whenUserIsNotLoggedIn_return401() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders.delete("/api/images/1"))
                .andExpect(status().isUnauthorized());
    }


}
