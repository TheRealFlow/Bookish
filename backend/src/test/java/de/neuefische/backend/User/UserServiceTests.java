package de.neuefische.backend.User;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@SpringBootTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class UserServiceTests {

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Test
    void getAll_shouldReturnListOfAllUsers() {
        List<AppUser> users = new ArrayList<>();
        users.add(new AppUser());
        users.add(new AppUser());

        AppUserRepository repository = Mockito.mock(AppUserRepository.class);
        AppUserService appUserService = new AppUserService(repository, passwordEncoder);
        Mockito.when(repository.findAll()).thenReturn(users);

        List<AppUser> actual = appUserService.getAll();

        Assertions.assertEquals(actual, users);
    }

    @Test
    void getUserById_shouldReturnUser() {
        AppUser user = new AppUser();

        AppUserRepository repository = Mockito.mock(AppUserRepository.class);
        AppUserService appUserService = new AppUserService(repository, passwordEncoder);
        Mockito.when(repository.findById("1")).thenReturn(Optional.of(user));

        AppUser actual = appUserService.getUserById("1");

        Assertions.assertEquals(actual, user);
    }

    @Test
    void create_whenValidInput_thenReturnNewUser() {

        AppUser userInput = new AppUser("1", "user", "password", "USER", "imageId");
        AppUser createdUser = new AppUser("1", "user", "", "USER", "imageId");
        AppUserRepository repository = Mockito.mock(AppUserRepository.class);

        AppUserService appUserService = new AppUserService(repository, passwordEncoder);
        Mockito.when(repository.findByUsername(userInput.getUsername())).thenReturn(Optional.empty());

        AppUser actual = appUserService.create(userInput);

        Assertions.assertEquals(actual, createdUser);
    }

    @Test
    void create_whenUserAlreadyExists_thenReturnException() {

        AppUser userInput = new AppUser("1", "user", "password", "USER", "imageId");
        AppUser createdUser = new AppUser("1", "user", "", "USER", "imageId");
        AppUserRepository repository = Mockito.mock(AppUserRepository.class);

        AppUserService appUserService = new AppUserService(repository, passwordEncoder);
        Mockito.when(repository.findByUsername(userInput.getUsername())).thenReturn(Optional.of(createdUser));

        try {
            appUserService.create(userInput);
            Assertions.fail();
        } catch (ResponseStatusException e) {
            Assertions.assertEquals(HttpStatus.CONFLICT, e.getStatus());
        }
    }

    @Test
    void findByUsername_whenUserExists_thenReturnUser() {

        AppUser user = new AppUser("1", "user", "password", "USER", "imageId");
        AppUserRepository repository = Mockito.mock(AppUserRepository.class);

        AppUserService appUserService = new AppUserService(repository, passwordEncoder);
        Mockito.when(repository.findByUsername(user.getUsername())).thenReturn(Optional.of(user));

        Optional<AppUser> actual = appUserService.findByUsernameWithoutPassword(user.getUsername());

        Assertions.assertEquals(actual, Optional.of(user));
    }

    @Test
    void findByUsername_whenUserDoesNotExists_thenReturnNull() {

        AppUserRepository repository = Mockito.mock(AppUserRepository.class);

        AppUserService appUserService = new AppUserService(repository, passwordEncoder);
        Mockito.when(repository.findByUsername("Username")).thenReturn(Optional.empty());

        Optional<AppUser> actual = appUserService.findByUsernameWithoutPassword("Username");

        Assertions.assertEquals(actual, Optional.empty());
    }

    @Test
    void findByUsernameWithoutPassword_whenUserExists_thenReturnUser() {

        AppUser user = new AppUser("1", "user", "password", "USER", "imageId");
        AppUser userWithoutPassword = new AppUser("1", "user", "", "USER", "imageId");
        AppUserRepository repository = Mockito.mock(AppUserRepository.class);

        AppUserService appUserService = new AppUserService(repository, passwordEncoder);
        Mockito.when(repository.findByUsername(user.getUsername())).thenReturn(Optional.of(user));

        Optional<AppUser> actual = appUserService.findByUsernameWithoutPassword(user.getUsername());

        Assertions.assertEquals(actual, Optional.of(userWithoutPassword));
        Mockito.verify(repository).findByUsername(user.getUsername());
    }

    @Test
    void findByUsernameWithoutPassword_whenUserDoesNotExists_thenReturnNull() {

        AppUserRepository repository = Mockito.mock(AppUserRepository.class);

        AppUserService appUserService = new AppUserService(repository, passwordEncoder);
        Mockito.when(repository.findByUsername("Username")).thenReturn(Optional.empty());

        Optional<AppUser> actual = appUserService.findByUsernameWithoutPassword("Username");

        Assertions.assertEquals(actual, Optional.empty());
        Mockito.verify(repository).findByUsername("Username");
    }

}
