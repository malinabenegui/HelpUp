package com.malinabenegui.help.controller;


import com.malinabenegui.help.models.httpResponseParsers.HttpSimpleStringResponse;
import com.malinabenegui.help.services.jwt.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/jwt")
@CrossOrigin
public class JwtController {
    @Autowired
    private JwtService service;

    @RequestMapping("/username")
    private ResponseEntity<HttpSimpleStringResponse> parseUsername(@RequestHeader("Authorization") String header) {
        return new ResponseEntity<>(service.parseUsernameFromJWT(header), HttpStatus.ACCEPTED);
    }
}
