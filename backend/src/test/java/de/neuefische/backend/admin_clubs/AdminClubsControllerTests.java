package de.neuefische.backend.admin_clubs;

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
class AdminClubsControllerTests {

    @Autowired
    MockMvc mockMvc;

    // GET ALL CLUBS

    @Test
    @WithMockUser(username = "admin", password = "pwd", roles = "ADMIN")
    void getAllBookClubs_whenAdminIsLoggedIn_returnBookClubsList() throws Exception {
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

        mockMvc.perform(MockMvcRequestBuilders.get("/api/admin/clubs"))
                .andExpectAll(
                        MockMvcResultMatchers.status().isOk());
    }

    @Test
    void getAllBookClubs_whenAdminIsNotLoggedIn_return401() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/admin/clubs"))
                .andExpectAll(
                        MockMvcResultMatchers.status().isUnauthorized()
                );
    }

    // GET CLUB BY ID

    @Test
    @WithMockUser(username = "admin", password = "pwd", roles = "ADMIN")
    void getBookClubById_whenAdminIsLoggedIn_returnBookClub() throws Exception {
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

        mockMvc.perform(MockMvcRequestBuilders.get("/api/admin/clubs/1"))
                .andExpectAll(
                        MockMvcResultMatchers.status().isOk(),
                        MockMvcResultMatchers.content().json(expectedBookClub)
                );
    }

    @Test
    void getBookClubById_whenAdminIsNotLoggedIn_return401() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/admin/clubs/1"))
                .andExpectAll(
                        MockMvcResultMatchers.status().isUnauthorized()
                );
    }

    // DELETE CLUB

    @Test
    @WithMockUser(username = "admin", password = "pwd", roles = "ADMIN")
    void deleteBookClub_whenAdminIsLoggedIn_returnBookClub() throws Exception {
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

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/admin/clubs/1"))
                .andExpectAll(
                        MockMvcResultMatchers.status().isOk()
                );
    }

    @Test
    void deleteBookClub_whenAdminIsNotLoggedIn_return401() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/admin/clubs/1"))
                .andExpectAll(
                        MockMvcResultMatchers.status().isUnauthorized()
                );
    }
}
