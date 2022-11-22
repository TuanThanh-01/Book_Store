package com.PTIT.BookStore.controller;

import com.PTIT.BookStore.entities.Role;
import com.PTIT.BookStore.entities.User;
import com.PTIT.BookStore.payload.request.LoginRequest;
import com.PTIT.BookStore.payload.request.SignupRequest;
import com.PTIT.BookStore.payload.response.LoginResponse;
import com.PTIT.BookStore.payload.response.MessageResponse;
import com.PTIT.BookStore.repository.RoleRepository;
import com.PTIT.BookStore.security.jwt.JwtUtils;
import com.PTIT.BookStore.security.services.CustomUserDetails;
import com.PTIT.BookStore.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/auth")
public class UserController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserService userService;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new LoginResponse(jwt, userDetails.getUsername(),
                userDetails.getFirstName(), userDetails.getLastName(), roles));

    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signupRequest) {
        if(userService.existsByEmail(signupRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already taken!"));
        }

        User user = new User(signupRequest.getFirstName(),
                signupRequest.getLastName(),
                signupRequest.getEmail(),
                passwordEncoder.encode(signupRequest.getPassword()));

        List<User> allUser = userService.findAllUser();
        if(allUser.size() == 0) {
            Role roleAdmin = roleRepository.findById(1).get();
            user.getRoles().add(roleAdmin);
        }
        else {
            Role roleUser = roleRepository.findById(2).get();
            user.getRoles().add(roleUser);
        }

        userService.saveUser(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }
}
