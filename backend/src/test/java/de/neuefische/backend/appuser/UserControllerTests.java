package de.neuefische.backend.appuser;

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

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class UserControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void SignUp_shouldCreateNewUser() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/user")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {
                            "id": "1",
                            "username": "user",
                            "password": "password",
                            "imageId": "imageId",
                            "role": "USER"
                        }
                        """)
        ).andExpectAll(
                MockMvcResultMatchers.status().isOk(),
                MockMvcResultMatchers.content().json("""
                                  {
                                    "id": "1",
                                    "username": "user",
                                    "password": "",
                                    "imageId": "imageId",
                                    "role": "USER"
                                }
                                """,
                        true
                ));
    }

    @Test
    void whenUserAlreadyExists_shouldReturnConflict() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/user")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {
                            "id": "1",
                            "username": "user",
                            "password": "password",
                            "imageId": "imageId",
                            "role": "USER"
                        }
                        """)).andExpectAll(
                MockMvcResultMatchers.status().isOk(),
                MockMvcResultMatchers.content().json("""
                                  {
                                    "id": "1",
                                    "username": "user",
                                    "password": "",
                                    "imageId": "imageId",
                                    "role": "USER"
                                }
                                """,
                        true
                )
        );
        mockMvc.perform(MockMvcRequestBuilders.post("/api/user")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {
                            "id": "1",
                            "username": "user",
                            "password": "password",
                            "imageId": "imageId",
                            "role": "USER"
                        }
                        """)).andExpectAll(
                MockMvcResultMatchers.status().isConflict());
    }

    @Test
    @WithMockUser(username = "user", roles = "BASIC")
    void login_whenUserExist_thenReturn200() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/user/login"))
                .andExpectAll(MockMvcResultMatchers.status().isOk());
    }

    @Test
    void me_whenUserNotLoggedIn_thenReturn401() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/user/me")).
                andExpectAll(MockMvcResultMatchers.status().isUnauthorized());
    }

    @Test
    @WithMockUser(username = "user", roles = "BASIC")
    void me_whenUserLoggedIn_thenReturn200() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/user/me")).
                andExpectAll(MockMvcResultMatchers.status().isOk());
    }

    @Test
    void logout_whenUserNotLoggedInAndLogsOut_shouldReturn401() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/user/logout"))
                .andExpectAll(MockMvcResultMatchers.status().isUnauthorized());
    }

    @Test
    @WithMockUser(username = "user", roles = "BASIC")
    void logout_whenUserLoggedInAndLogsOut_shouldReturn200() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/user/logout"))
                .andExpectAll(MockMvcResultMatchers.status().isOk());
    }

    @Test
    @WithMockUser(username = "user", roles = "BASIC")
    void getAllUsers_whenUserLoggedInAndCallsGetAllUsers_shouldReturn200() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/user"))
                .andExpectAll(MockMvcResultMatchers.status().isOk());
    }

    @Test
    void getAllUsers_whenUserNotLoggedInAndCallsGetAllUsers_shouldReturn401() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/user"))
                .andExpectAll(MockMvcResultMatchers.status().isUnauthorized());
    }

    @Test
    @WithMockUser(username = "user", roles = "BASIC")
    void getUserById_whenUserLoggedInAndCallsGetUserById_shouldReturn200() throws Exception {
        String requestUser = """
                {
                    "id": "1",
                    "username": "user",
                    "password": "password",
                    "imageId": "imageId",
                    "role": "USER"
                }
                """;
        String responseUser = """
                {
                    "id": "1",
                    "username": "user",
                    "password": "",
                    "imageId": "imageId",
                    "role": "USER"
                }
                """;
        mockMvc.perform(MockMvcRequestBuilders.post("/api/user")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestUser)
        ).andExpectAll(
                MockMvcResultMatchers.status().isOk(),
                MockMvcResultMatchers.content().json(responseUser,
                        true
                ));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/user/1"))
                .andExpectAll(MockMvcResultMatchers.status().isOk());
    }

    @Test
    void getUserById_whenUserNotLoggedInAndCallsGetUserById_shouldReturn401() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/user/1"))
                .andExpectAll(MockMvcResultMatchers.status().isUnauthorized());
    }



    }

