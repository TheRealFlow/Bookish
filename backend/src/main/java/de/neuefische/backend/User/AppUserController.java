package de.neuefische.backend.User;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class AppUserController {
    private final AppUserService appUserService;

    @PostMapping
    public AppUser create (@RequestBody AppUser appUser) {
        return appUserService.create(appUser);
    }

    @PostMapping("/login")
    public Optional<AppUser> login() {
        return appUserService.findByUsernameWithoutPassword(
                SecurityContextHolder.getContext().getAuthentication().getName()
        );
    }

    @GetMapping("/me")
    public Optional<AppUser> me() {
        return appUserService.findByUsernameWithoutPassword(
                SecurityContextHolder.getContext().getAuthentication().getName()
        );
    }

    @GetMapping()
    public List<AppUser> getAll() {
        return appUserService.getAll();
    }

    @GetMapping("/{id}")
    public AppUser getUserById(@PathVariable String id) {
        return appUserService.getUserById(id);
    }

    @GetMapping("/logout")
    public void logout(HttpSession httpSession) {
        httpSession.invalidate();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        appUserService.delete(id);
    }
}
