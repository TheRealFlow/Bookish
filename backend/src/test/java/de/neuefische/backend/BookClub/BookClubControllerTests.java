package de.neuefische.backend.BookClub;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
public class BookClubControllerTests {

    @Autowired
    MockMvc mockMvc;

    @Test
    @WithMockUser(username = "user", password = "pwd", roles = "USER")
    void getAllBookClubs_whenUserIsLoggedIn_returnBookClubsList() throws Exception {
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

        mockMvc.perform(MockMvcRequestBuilders.get("/api/bookclubs"))
                .andExpectAll(
                        MockMvcResultMatchers.status().isOk());
    }

    @Test
    void getAllBookClubs_whenUserIsNotLoggedIn_return401() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/bookclubs"))
                .andExpectAll(
                        MockMvcResultMatchers.status().isUnauthorized()
                );
    }

    @Test
    @WithMockUser(username = "user", password = "pwd", roles = "USER")
    void getBookClubById_whenUserIsLoggedIn_returnBookClub() throws Exception {
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

        String requestBookClub = """
                {
                    "id": "1",
                    "name": "BookClub1",
                    "description": "BookClub1Description"
                }
                """;
        String expectedBookClub = """
                {
                    "id": "1",
                    "name": "BookClub1",
                    "description": "BookClub1Description"
                }
                """;

        mockMvc.perform(MockMvcRequestBuilders.post("/api/bookclubs")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBookClub))
                .andExpect(status().isOk())
                .andExpect(content().json(expectedBookClub));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/bookclubs/1"))
                .andExpectAll(
                        MockMvcResultMatchers.status().isOk(),
                        MockMvcResultMatchers.content().json(expectedBookClub)
                );
    }

    @Test
    void getBookClubById_whenUserIsNotLoggedIn_return401() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/bookclubs/1"))
                .andExpectAll(
                        MockMvcResultMatchers.status().isUnauthorized()
                );
    }

    @Test
    @WithMockUser(username = "user", password = "pwd", roles = "USER")
    void createBookClub_whenUserIsLoggedIn_returnBookClub() throws Exception {
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

        String requestBookClub = """
                {
                    "id": "1",
                    "name": "BookClub1",
                    "description": "BookClub1Description"
                }
                """;
        String expectedBookClub = """
                {
                    "id": "1",
                    "name": "BookClub1",
                    "description": "BookClub1Description"
                }
                """;

        mockMvc.perform(MockMvcRequestBuilders.post("/api/bookclubs")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBookClub))
                .andExpectAll(
                        MockMvcResultMatchers.status().isOk(),
                        MockMvcResultMatchers.content().json(expectedBookClub)
                );
    }

    @Test
    void createBookClub_whenUserIsNotLoggedIn_return401() throws Exception {
        String requestBookClub = """
                {
                    "id": "1",
                    "name": "BookClub1",
                    "description": "BookClub1Description"
                }
                """;

        mockMvc.perform(MockMvcRequestBuilders.post("/api/bookclubs")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBookClub))
                .andExpectAll(
                        MockMvcResultMatchers.status().isUnauthorized()
                );
    }


    @Test
    @WithMockUser(username = "user", password = "pwd", roles = "USER")
    void deleteBookClub_whenUserIsLoggedIn_returnBookClub() throws Exception {
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

        String requestBookClub = """
                {
                    "id": "1",
                    "name": "BookClub1",
                    "description": "BookClub1Description"
                }
                """;
        String expectedBookClub = """
                {
                    "id": "1",
                    "name": "BookClub1",
                    "description": "BookClub1Description"
                }
                """;

        mockMvc.perform(MockMvcRequestBuilders.post("/api/bookclubs")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBookClub))
                .andExpect(status().isOk())
                .andExpect(content().json(expectedBookClub));

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/bookclubs/1"))
                .andExpectAll(
                        MockMvcResultMatchers.status().isOk()
                );
    }

    @Test
    void deleteBookClub_whenUserIsNotLoggedIn_return401() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/bookclubs/1"))
                .andExpectAll(
                        MockMvcResultMatchers.status().isUnauthorized()
                );
    }
}
