package de.neuefische.backend.User;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AppUserService {
    private final AppUserRepository appUserRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public AppUser create (AppUser appUser) {
        Optional<AppUser> existingAppUser = appUserRepository.findByUsername(
                appUser.getUsername()
        );

        if (existingAppUser.isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT);
        }

        appUser.setPassword(passwordEncoder.encode(appUser.getPassword()));

        if (
                SecurityContextHolder.getContext().getAuthentication() == null || !SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .isAuthenticated() ||
                        SecurityContextHolder
                                .getContext()
                                .getAuthentication()
                                .getAuthorities()
                                .stream()
                                .noneMatch(ga -> ga.getAuthority().equals("ROLE_ADMIN"))
        ) {
            appUser.setRole("USER");
        }

        appUserRepository.save(appUser);
        appUser.setPassword("");

        return appUser;
    }

    public Optional<AppUser> findByUsername(String username) {
        return appUserRepository.findByUsername(username);
    }

    public Optional<AppUser> findByUsernameWithoutPassword (String username) {
        Optional<AppUser> appUser = appUserRepository.findByUsername(username);
        appUser.ifPresent(user -> user.setPassword(""));
        return appUser;
    }

    public AppUser findUserById (String id) {
        Optional<AppUser> appUser = appUserRepository.findAppUserById(id);
        if (appUser.isPresent()) {
            return appUser.get();
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    public AppUser update (AppUser appUser) {
        return appUserRepository.save(appUser);
    }

    public AppUser getAuthenticatedUser () {
        return findByUsernameWithoutPassword(
                SecurityContextHolder.getContext().getAuthentication().getName()
        ).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.FORBIDDEN)
        );
    }

    public List<AppUser> getAll() {
        return appUserRepository.findAll();
    }

    public AppUser getUserById(String id) {
        return appUserRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("User with the ID: " + id + " not found"));
    }

}
