package de.neuefische.backend.club_member;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class ClubMemberControllerTests {

    @Autowired
    MockMvc mockMvc;

    @Test
    @WithMockUser(username = "user", password = "pwd", roles = "USER")
    void getAllClubMembers_whenUserIsLoggedIn_returnClubMembersList() throws Exception {
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

        mockMvc.perform(MockMvcRequestBuilders.get("/api/club-member"))
                .andExpectAll(
                        status().isOk());
    }

    @Test
    void getAllClubMembers_whenUserIsNotLoggedIn_return401() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/club-member"))
                .andExpectAll(
                        status().isUnauthorized()
                );
    }

    @Test
    @WithMockUser(username = "user", password = "pwd", roles = "USER")
    void getClubMemberById_whenUserIsLoggedIn_returnClubMember() throws Exception {
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

        String requestClubMember = """
                {
                    "id": "1",
                    "username": "Member"
                }
                """;

        String expectedClubMember = """
                {
                    "id": "1",
                    "username": "Member"
                }
                """;

        mockMvc.perform(MockMvcRequestBuilders.post("/api/club-member")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestClubMember))
                .andExpect(status().isOk())
                .andExpect(content().json(expectedClubMember));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/club-member/1"))
                .andExpectAll(
                        status().isOk());
                        content().json(expectedClubMember);
    }

    @Test
    void getClubMemberById_whenUserIsNotLoggedIn_return401() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/club-member/1"))
                .andExpectAll(
                        status().isUnauthorized()
                );
    }

    @Test
    @WithMockUser(username = "user", password = "pwd", roles = "USER")
    void addNewClubMember_whenUserIsLoggedIn_returnClubMember() throws Exception {
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

        String requestClubMember = """
                {
                    "id": "1",
                    "username": "Member"
                }
                """;

        String expectedClubMember = """
                {
                    "id": "1",
                    "username": "Member"
                }
                """;

        mockMvc.perform(MockMvcRequestBuilders.post("/api/club-member")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestClubMember))
                .andExpectAll(
                        status().isOk(),
                        content().json(expectedClubMember)
                );
    }

    @Test
    void addNewClubMember_whenUserIsNotLoggedIn_return401() throws Exception {
        String requestClubMember = """
                {
                    "id": "1",
                    "username": "Member"
                }
                """;

        mockMvc.perform(MockMvcRequestBuilders.post("/api/club-member")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestClubMember))
                .andExpectAll(
                        status().isUnauthorized()
                );
    }

    @Test
    @WithMockUser(username = "user", password = "pwd", roles = "USER")
    void deleteClubMember_whenUserIsLoggedIn_returnClubMember() throws Exception {
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

        String requestClubMember = """
                {
                    "id": "1",
                    "username": "Member"
                }
                """;

        String expectedClubMember = """
                {
                    "id": "1",
                    "username": "Member"
                }
                """;

        mockMvc.perform(MockMvcRequestBuilders.post("/api/club-member")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestClubMember))
                .andExpect(status().isOk())
                .andExpect(content().json(expectedClubMember));

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/club-member/1"))
                .andExpectAll(
                        status().isOk()
                );
    }

    @Test
    void deleteClubMember_whenUserIsNotLoggedIn_return401() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/club-member/1"))
                .andExpectAll(
                        status().isUnauthorized()
                );
    }
}
