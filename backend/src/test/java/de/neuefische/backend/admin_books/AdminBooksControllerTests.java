package de.neuefische.backend.admin_books;

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
class AdminBooksControllerTests {

    @Autowired
    MockMvc mockMvc;

    // GET ALL BOOKS

    @Test
    @WithMockUser(username = "admin", password = "pwd", roles = "ADMIN")
    void getAllBooks_whenAdminIsLoggedIn_returnBooksList() throws Exception {
        String requestUser = """
                {
                    "username":"admin",
                    "password":"pwd"
                }
                """;

        String expectedUser = """
                {
                    "username": "admin",
                    "password": ""
                }
                """;

        mockMvc.perform(MockMvcRequestBuilders.post("/api/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestUser))
                .andExpect(status().isOk())
                .andExpect(content().json(expectedUser));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/admin/books"))
                .andExpectAll(
                        MockMvcResultMatchers.status().isOk());
    }

    @Test
    void getAllBooks_whenAdminIsNotLoggedIn_return401() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/admin/books"))
                .andExpectAll(
                        MockMvcResultMatchers.status().isUnauthorized()
                );
    }

    // GET BOOK BY ID

    @Test
    @WithMockUser(username = "admin", password = "pwd", roles = "ADMIN")
    void GetBookById_whenAdminIsLoggedIn_getBookById() throws Exception {
        String requestUser = """
                {
                    "username":"admin",
                    "password":"pwd"
                }
                """;

        String expectedUser = """
                {
                    "username": "admin",
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
                     "title": "Das Lied von Eis und Feuer",
                     "author": "George R.R. Martin"
                 }
                """;

        String expectedBook = """  
                {
                     "id": "1",
                     "title": "Das Lied von Eis und Feuer",
                     "author": "George R.R. Martin"
                }
                """;

        mockMvc.perform(MockMvcRequestBuilders.post("/api/books")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBook))
                .andExpect(status().isOk())
                .andExpect(content().json(expectedBook));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/admin/books/1"))
                .andExpectAll(
                        MockMvcResultMatchers.status().isOk());

    }

    @Test
    void getBookById_whenAdminIsNotLoggedIn_Return401() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/admin/books/1"))
                .andExpectAll(
                        MockMvcResultMatchers.status().isUnauthorized()
                );
    }

    // DELETE BOOK

    @Test
    @WithMockUser(username = "admin", password = "pwd", roles = "ADMIN")
    void deleteBook_whenAdminIsLoggedIn_deleteBook() throws Exception {
        String requestUser = """
                {
                    "username":"admin",
                    "password":"pwd"
                }
                """;

        String expectedUser = """
                {
                    "username": "admin",
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

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/admin/books/2"))
                .andExpect(status().isOk());
    }

    @Test
    void deleteBook_whenAdminIsNotLoggedIn_Return401() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/admin/books"))
                .andExpectAll(
                        MockMvcResultMatchers.status().isUnauthorized()
                );
    }

}
