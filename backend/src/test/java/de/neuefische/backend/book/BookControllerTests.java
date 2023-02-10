package de.neuefische.backend.book;

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
class BookControllerTests {

    @Autowired
    MockMvc mockMvc;

    // GET ALL BOOKS

    @Test
    @WithMockUser(username = "user", password = "pwd", roles = "USER")
    void getAllBooks_whenUserIsLoggedIn_returnBooksList() throws Exception {
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

        mockMvc.perform(MockMvcRequestBuilders.get("/api/books"))
                .andExpectAll(
                        MockMvcResultMatchers.status().isOk());
    }

    @Test
    void getAllBooks_whenUserIsNotLoggedIn_return401() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/books"))
                .andExpectAll(
                        MockMvcResultMatchers.status().isUnauthorized()
                );
    }

    // GET BOOK BY ID

    @Test
    @WithMockUser(username = "user", password = "pwd", roles = "USER")
    void GetBookById_whenUserIsLoggedIn_getBookById() throws Exception {
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

        String requestBook = """  
                {
                     "id": "1",
                     "title": "Herr der Ringe",
                     "author": "J.R.R. Tolkien"
                 }
                """;

        String expectedBook = """  
                {
                     "id": "1",
                     "title": "Herr der Ringe",
                     "author": "J.R.R. Tolkien"
                }
                """;

        mockMvc.perform(MockMvcRequestBuilders.post("/api/books")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBook))
                .andExpect(status().isOk())
                .andExpect(content().json(expectedBook));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/books/1"))
                .andExpect(status().isOk())
                .andExpect(content().json(expectedBook));

    }

    @Test
    void getBookById_whenUserIsNotLoggedIn_Return401() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/books/1"))
                .andExpectAll(
                        MockMvcResultMatchers.status().isUnauthorized()
                );
    }

    // ADD BOOK

    @Test
    @WithMockUser(username = "user", password = "pwd", roles = "USER")
    void addBook_whenUserIsLoggedIn_addNewBook() throws Exception {
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

        String requestBook = """  
                {
                     "id": "2",
                     "title": "Das Lied von Eis und Feuer",
                     "author": "George R.R. Martin"
                 }
                """;

        String expectedBook = """  
                {
                     "id": "2",
                     "title": "Das Lied von Eis und Feuer",
                     "author": "George R.R. Martin"
                }
                """;

        mockMvc.perform(MockMvcRequestBuilders.post("/api/books")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBook))
                .andExpect(status().isOk())
                .andExpect(content().json(expectedBook));
    }

    @Test
    void addBook_whenUserIsNotLoggedIn_Return400() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/books"))
                .andExpectAll(
                        MockMvcResultMatchers.status().isBadRequest()
                );
    }

    // DELETE BOOK

    @Test
    @WithMockUser(username = "user", password = "pwd", roles = "USER")
    void deleteBook_whenUserIsLoggedIn_deleteBook() throws Exception {
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

        String requestBook = """  
                {
                     "id": "2",
                     "title": "Das Lied von Eis und Feuer",
                     "author": "George R.R. Martin"
                 }
                """;

        String expectedBook = """  
                {
                     "id": "2",
                     "title": "Das Lied von Eis und Feuer",
                     "author": "George R.R. Martin"
                }
                """;

        mockMvc.perform(MockMvcRequestBuilders.post("/api/books")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBook))
                .andExpect(status().isOk())
                .andExpect(content().json(expectedBook));

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/books/2"))
                .andExpect(status().isOk());
    }

    @Test
    void deleteBook_whenUserIsNotLoggedIn_Return401() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/books"))
                .andExpectAll(
                        MockMvcResultMatchers.status().isUnauthorized()
                );
    }

    // UPDATE BOOK

    @Test
    @WithMockUser(username = "user", password = "pwd", roles = "USER")
    void updateBook_whenUserIsLoggedIn_updateBook() throws Exception {
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

        String requestBook = """  
                {
                     "id": "2",
                     "title": "Herr der Ringe",
                     "author": "J.R.R. Tolkien"
                 }
                """;

        String expectedBook = """  
                {
                     "id": "2",
                     "title": "Herr der Ringe",
                     "author": "J.R.R. Tolkien"
                }
                """;

        mockMvc.perform(MockMvcRequestBuilders.put("/api/books/2")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBook))
                .andExpect(status().isOk())
                .andExpect(content().json(expectedBook));
    }

    @Test
    void updateBook_whenUserIsNotLoggedIn_Return401() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.put("/api/books"))
                .andExpectAll(
                        MockMvcResultMatchers.status().isUnauthorized()
                );
    }

}
