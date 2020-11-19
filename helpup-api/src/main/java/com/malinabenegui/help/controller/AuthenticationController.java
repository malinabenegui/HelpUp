package com.malinabenegui.help.controller;

import com.malinabenegui.help.models.auth.AuthenticationRequest;
import com.malinabenegui.help.models.auth.AuthenticationResponse;
import com.malinabenegui.help.services.CustomUserDetailsService;
import com.malinabenegui.help.services.authentication.AuthenticationService;
import com.malinabenegui.help.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthenticationController {
    @Autowired
    private AuthenticationService authenticationService;

    @RequestMapping(value = "", method = RequestMethod.POST)
    private ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
        return ResponseEntity.ok(authenticationService.authentication(authenticationRequest));
    }
}
