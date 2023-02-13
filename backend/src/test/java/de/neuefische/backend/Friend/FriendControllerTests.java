package de.neuefische.backend.Friend;

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
class FriendControllerTests {

    @Autowired
    MockMvc mockMvc;

    @Test
    @WithMockUser(username = "user", password = "pwd", roles = "USER")
    void getAllFriends_whenUserIsLoggedIn_returnFriendsList() throws Exception {
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

        mockMvc.perform(MockMvcRequestBuilders.get("/api/friends"))
                .andExpectAll(
                        MockMvcResultMatchers.status().isOk());
    }

    @Test
    void getAllFriends_whenUserIsNotLoggedIn_return401() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/friends"))
                .andExpectAll(
                        MockMvcResultMatchers.status().isUnauthorized()
                );
    }

    @Test
    @WithMockUser(username = "user", password = "pwd", roles = "USER")
    void getFriendById_whenUserIsLoggedIn_returnFriend() throws Exception {
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

        String requestFriend = """
                {
                    "id": "1",
                    "username": "friend"
                }
                """;

        String expectedFriend = """
                {
                    "id": "1",
                    "username": "friend"
                }
                """;

        mockMvc.perform(MockMvcRequestBuilders.post("/api/friends")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestFriend))
                .andExpect(status().isOk())
                .andExpect(content().json(expectedFriend));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/friends/1"))
                .andExpectAll(
                        MockMvcResultMatchers.status().isOk());
    }

    @Test
    void getFriendById_whenUserIsNotLoggedIn_return401() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/friends/1"))
                .andExpectAll(
                        MockMvcResultMatchers.status().isUnauthorized()
                );
    }

    @Test
    @WithMockUser(username = "user", password = "pwd", roles = "USER")
    void addFriend_whenUserIsLoggedIn_returnFriend() throws Exception {
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

        String requestFriend = """
                {
                    "id": "1",
                    "username": "friend"
                }
                """;

        String expectedFriend = """
                {
                    "id": "1",
                    "username": "friend"
                }
                """;

        mockMvc.perform(MockMvcRequestBuilders.post("/api/friends")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestFriend))
                .andExpect(status().isOk())
                .andExpect(content().json(expectedFriend));
    }

    @Test
    void addFriend_whenUserIsNotLoggedIn_return401() throws Exception {
        String requestFriend = """
                {
                    "id": "1",
                    "username": "friend",
                }
                """;

        mockMvc.perform(MockMvcRequestBuilders.post("/api/friends")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestFriend))
                .andExpectAll(
                        MockMvcResultMatchers.status().isUnauthorized()
                );
    }

    @Test
    @WithMockUser(username = "user", password = "pwd", roles = "USER")
    void deleteFriend_whenUserIsLoggedIn_returnFriend() throws Exception {
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

        String requestFriend = """
                {
                    "id": "1",
                    "username": "friend"
                }
                """;

        String expectedFriend = """
                {
                    "id": "1",
                    "username": "friend"
                }
                """;

        mockMvc.perform(MockMvcRequestBuilders.post("/api/friends")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestFriend))
                .andExpect(status().isOk())
                .andExpect(content().json(expectedFriend));

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/friends/1"))
                .andExpect(status().isOk());
    }

    @Test
    void deleteFriend_whenUserIsNotLoggedIn_return401() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/friends/1"))
                .andExpectAll(
                        MockMvcResultMatchers.status().isUnauthorized()
                );
    }
}
