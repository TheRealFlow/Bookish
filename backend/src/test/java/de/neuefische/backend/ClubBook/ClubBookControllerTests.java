package de.neuefische.backend.ClubBook;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
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
class ClubBookControllerTests {

    @Autowired
    MockMvc mockMvc;

    @Test
    @WithMockUser(username = "user", password = "pwd", roles = "USER")
    void getAllClubBooks_whenUserIsLoggedIn_returnClubBooksList() throws Exception {
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
                        .contentType("application/json")
                        .content(requestUser))
                .andExpect(status().isOk())
                .andExpect(content().json(expectedUser));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/club-books"))
                .andExpectAll(
                        MockMvcResultMatchers.status().isOk());
    }

    @Test
    void getAllClubBooks_whenUserIsNotLoggedIn_return401() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/club-books"))
                .andExpectAll(
                        MockMvcResultMatchers.status().isUnauthorized()
                );
    }

    @Test
    @WithMockUser(username = "user", password = "pwd", roles = "USER")
    void getClubBookById_whenUserIsLoggedIn_returnClubBook() throws Exception {
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
                        .contentType("application/json")
                        .content(requestUser))
                .andExpect(status().isOk())
                .andExpect(content().json(expectedUser));

        String requestClubbook = """
                {
                    "id": "1",
                    "title": "The Lord of the Rings",
                    "author": "J.R.R. Tolkien"
                }
                """;

        String expectedClubbook = """
                {
                    "id": "1",
                    "title": "The Lord of the Rings",
                    "author": "J.R.R. Tolkien"
                }
                """;

        mockMvc.perform(MockMvcRequestBuilders.post("/api/club-books")
                        .contentType("application/json")
                        .content(requestClubbook))
                .andExpect(status().isOk())
                .andExpect(content().json(expectedClubbook));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/club-books/1"))
                .andExpectAll(
                        MockMvcResultMatchers.status().isOk());
    }

    @Test
    void getClubBookById_whenUserIsNotLoggedIn_return401() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/club-books/1"))
                .andExpectAll(
                        MockMvcResultMatchers.status().isUnauthorized()
                );
    }

    @Test
    @WithMockUser(username = "user", password = "pwd", roles = "USER")
    void addClubBook_whenUserIsLoggedIn_returnClubBook() throws Exception {
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
                        .contentType("application/json")
                        .content(requestUser))
                .andExpect(status().isOk())
                .andExpect(content().json(expectedUser));

        String requestClubbook = """
                {
                    "id": "1",
                    "title": "The Lord of the Rings",
                    "author": "J.R.R. Tolkien"
                }
                """;

        String expectedClubbook = """
                {
                    "id": "1",
                    "title": "The Lord of the Rings",
                    "author": "J.R.R. Tolkien"
                }
                """;

        mockMvc.perform(MockMvcRequestBuilders.post("/api/club-books")
                        .contentType("application/json")
                        .content(requestClubbook))
                .andExpect(status().isOk())
                .andExpect(content().json(expectedClubbook));
    }

    @Test
    void addClubBook_whenUserIsNotLoggedIn_return401() throws Exception {
        String requestClubbook = """
                {
                    "id": "1",
                    "title": "The Lord of the Rings",
                    "author": "J.R.R. Tolkien"
                }
                """;

        mockMvc.perform(MockMvcRequestBuilders.post("/api/club-books")
                        .contentType("application/json")
                        .content(requestClubbook))
                .andExpectAll(
                        MockMvcResultMatchers.status().isUnauthorized()
                );
    }

    @Test
    @WithMockUser(username = "user", password = "pwd", roles = "USER")
    void deleteClubBookById_whenUserIsLoggedIn_returnClubBook() throws Exception {
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
                        .contentType("application/json")
                        .content(requestUser))
                .andExpect(status().isOk())
                .andExpect(content().json(expectedUser));

        String requestClubbook = """
                {
                    "id": "1",
                    "title": "The Lord of the Rings",
                    "author": "J.R.R. Tolkien"
                }
                """;

        String expectedClubbook = """
                {
                    "id": "1",
                    "title": "The Lord of the Rings",
                    "author": "J.R.R. Tolkien"
                }
                """;

        mockMvc.perform(MockMvcRequestBuilders.post("/api/club-books")
                        .contentType("application/json")
                        .content(requestClubbook))
                .andExpect(status().isOk())
                .andExpect(content().json(expectedClubbook));

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/club-books/1"))
                .andExpectAll(
                        MockMvcResultMatchers.status().isOk());
    }

    @Test
    void deleteClubBookById_whenUserIsNotLoggedIn_return401() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/club-books/1"))
                .andExpectAll(
                        MockMvcResultMatchers.status().isUnauthorized()
                );
    }
}
